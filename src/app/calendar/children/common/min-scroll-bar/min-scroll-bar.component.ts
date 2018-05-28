import { Component, ViewChildren, ViewChild, AfterViewInit, Input,
  ElementRef, AfterContentChecked, Output, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-min-scroll-bar',
  templateUrl: './min-scroll-bar.component.html',
  styleUrls: ['./min-scroll-bar.component.scss']
})
export class MinScrollBarComponent implements AfterViewInit, AfterContentChecked, AfterViewChecked {

  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>; // 指向包裹元素
  @Input() maxHeight; // 设定的最大高度
  showScroll = false; // 是否显示滚动条
  sourceHeight = 0; // 要滚动的元素自身高度
  scrollBarScrollTop = 0; // 滚动条中的小滑块滚动的位置
  scrollBarHeight = 30; // 滚动条中的小滑块高度
  scrollStep = 50; // 每次滚动移动的距离
  scrollElement: HTMLElement = null; // 要滚动的元素
  maxScrollDistance: number; // 最大滚动距离
  childElementCount: number; // 子元素数量, 用于监听添加或删除新元素重新计算滚动位置

  private defaultScrollLocation = 0; // 默认的滚动位置
  private _scrollTop = 0;
  // 元素滚动的位置
  set scrollTop (value: number) {
    this._scrollTop = value;
    this.scrollElement.style.top = -this.scrollTop + 'px';
  }

  get scrollTop () {
    return this._scrollTop;
  }

  constructor() { }

  /**
   * 初始化一系列参数，
   * 判断需要滚动的元素的高度是否超出最大高度限制以判断是否需要显示滚动条，
   * 记录需要滚动的元素和元素自身高度
   * 计算最大可滚动距离
   */
  initData (): void {
    this.sourceHeight = this.scrollElement.clientHeight;
    this.childElementCount = this.scrollElement.childElementCount;
    setTimeout(() => {
      this.showScroll = this.sourceHeight > this.maxHeight;
      this.maxScrollDistance = this.showScroll ? this.sourceHeight - this.maxHeight : 0;
      if (this.defaultScrollLocation !== 0) {
        this.setScrollTop(this.defaultScrollLocation);
      }
    }, 0);
  }

  /**
   * view初始化之后获取元素
   */
  ngAfterViewInit(): void {
    this.scrollElement = this.wrapper.nativeElement.children[0] as HTMLElement;
    if (this.scrollElement.style.position === '') {
      this.scrollElement.style.position = 'relative';
    }
  }

  /**
   * 元素变更检测是否需要重新计算数据
   */
  ngAfterViewChecked(): void {
    if (this.scrollElement.clientHeight !== this.sourceHeight) {
      this.initData();
    }
  }

  /**
   * 发生元素变更之后重新计算位置
   */
  ngAfterContentChecked(): void {
    if (this.scrollElement && this.scrollElement.childElementCount !== this.childElementCount) {
      this.initData();
      setTimeout(() => {
        this.setScrollTop(this.scrollTop);
      }, 0);
    }
  }


  /**
   * 鼠标滚轮事件，触发后进行滚动计算并判断边界值
   * @param event 事件对象
   */
  onMouseWheel(event: WheelEvent): void {
    const tempScrollTop = this.scrollTop + (event.deltaY > 0 ? this.scrollStep : -this.scrollStep);
    this.setScrollTop(tempScrollTop);
  }

  /**
   * 鼠标点击滚动条时触发,触发后进行滚动计算并判断边界值
   * @param event 事件对象
   */
  scrollBarClick(event: MouseEvent): void {
    event.stopPropagation();
    const tempScrollTop = event.offsetY - this.scrollBarHeight / 2;
    this.setScrollBarScrollTop(tempScrollTop);
  }

  /**
   * 设置元素滚动的位置，并同步更新滚动条的位置
   * @param value 滚动的位置
   */
  setScrollTop (value: number) {
    let tempValue = value;
    tempValue = tempValue > this.maxScrollDistance ? this.maxScrollDistance : tempValue < 0 ? 0 : tempValue;
    this.scrollTop = tempValue;
    const scrollDistancePercent = this.scrollTop / (this.maxScrollDistance +
                                                   (this.maxScrollDistance *
                                                   (this.scrollBarHeight / (this.maxHeight - this.scrollBarHeight))));
    this.scrollBarScrollTop = scrollDistancePercent * this.maxHeight;
  }

  /**
   * 设置滚动条滚动的位置，并同步更新元素滚动的位置
   * @param value 滚动的位置
   */
  setScrollBarScrollTop (value: number) {
    let tempValue = value;
    tempValue = tempValue > (this.maxHeight - this.scrollBarHeight) ? (this.maxHeight - this.scrollBarHeight)
                                                                    : tempValue < 0 ? 0 : tempValue;
    this.scrollBarScrollTop = tempValue;
    const scrollDistancePercent = this.scrollBarScrollTop / (this.maxHeight - this.scrollBarHeight +
                                                            (this.maxHeight - this.scrollBarHeight) *
                                                            (this.maxHeight / this.maxScrollDistance));
    this.scrollTop = scrollDistancePercent * this.sourceHeight;
  }

  setDefaultScrollLocation (value: number) {
    this.defaultScrollLocation = value;
  }
}
