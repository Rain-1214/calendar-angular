import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ListData } from '../../../calendar.type';
import { MinScrollBarComponent } from '../min-scroll-bar/min-scroll-bar.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss', '../../../assets/sass/common.scss']
})
export class DropdownComponent implements OnInit {

  @Input() width = 80; // 默认宽度
  @Input() display = 'inline-block'; // 元素display值
  @Input() listData: ListData[]; // 选项数据数组
  @Input() maxHeight: number; // 下拉最大高度
  @ViewChild(MinScrollBarComponent) minScrollBarComponent: MinScrollBarComponent; // 指向滚动条组件

  private _selectValue; // 选择的值
  @Input()
  set selectValue (value: string) {
    this._selectValue = value;
    this.selectValueChange.emit(value);
  }
  get selectValue () {
    return this._selectValue;
  }

  @Output() selectValueChange = new EventEmitter<string>();

  dropdownListShow = false; // 是否显示下拉菜单

  private liHeight = 24;

  constructor() { }

  /**
   * 定义全局关闭下拉菜单事件
   */
  ngOnInit() {
    document.addEventListener('click', (event: MouseEvent) => {
      this.dropdownListShow = false;
    });
  }

  /**
   * 提交选择的选项
   * @param value 选择选项事件
   */
  valueChange(value): void {
    this.selectValueChange.emit(value);
    this.dropdownListShow = false;
  }

  /**
   * 显示下拉选项
   * @param event 事件对象
   */
  showDropdownList(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownListShow = !this.dropdownListShow;
    if (this.dropdownListShow) {
      let tempScrollTop = 0;
      this.listData.forEach((e, i) => {
        if (e.value === this.selectValue) {
          tempScrollTop = i * this.liHeight;
        }
      });
      this.minScrollBarComponent.setDefaultScrollLocation(tempScrollTop);
    }
  }

}
