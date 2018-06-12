/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input } from '@angular/core';

import { DropdownComponent } from './dropdown.component';
import { ListData } from '../../../calendar.type';

@Component({
  selector: 'app-min-scroll-bar',
  template: '<ng-content></ng-content>'
})
class MinScrollBarComponent {
  @Input() maxHeight;
  setDefaultScrollLocation: (value: number) => {};
}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
        MinScrollBarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hav div with class "dropdown-wrapper" and set style when Input property is passed otherwise set default value', () => {
    const dropdownWrapperDiv = debugElement.query(By.css('.dropdown-wrapper'));
    expect(dropdownWrapperDiv).toBeTruthy();
    expect((dropdownWrapperDiv.nativeElement as HTMLElement).style.width).toBe('80px');
    expect((dropdownWrapperDiv.nativeElement as HTMLElement).style.display).toBe('inline-block');
    component.width = 200;
    component.display = 'block';
    fixture.detectChanges();
    expect((dropdownWrapperDiv.nativeElement as HTMLElement).style.width).toBe('200px');
    expect((dropdownWrapperDiv.nativeElement as HTMLElement).style.display).toBe('block');
  });

  it('should has span with class "value" and show "selectValue" in it, should has span with calss "dropdown-btn" and one icon', () => {
    const valueSpan = debugElement.query(By.css('.value'));
    const dropdownBtnSpan = debugElement.query(By.css('.dropdown-btn'));
    const iconI = dropdownBtnSpan.query(By.css('.icon-down'));
    expect(valueSpan).toBeTruthy();
    expect(dropdownBtnSpan).toBeTruthy();
    expect(iconI).toBeTruthy();
    expect((valueSpan.nativeElement as HTMLElement).innerText.trim()).toBe('');
    component.selectValue = 'testing';
    fixture.detectChanges();
    expect((valueSpan.nativeElement as HTMLElement).innerText.trim()).toBe('testing');
  });

  it('should has div with class "dropdown-list",show it when the length of "dropdownListShow" do not equal 0', () => {
    const dropdownListDiv = debugElement.query(By.css('.dropdown-list'));
    expect(dropdownListDiv).toBeTruthy();
    expect(dropdownListDiv.properties.hidden).toBe(true);
    let listAllLi = dropdownListDiv.queryAll(By.css('li'));
    expect(listAllLi).toBeTruthy();
    expect(listAllLi.length).toBe(1);
    const emptyLi = listAllLi[0];
    expect((emptyLi.nativeElement as HTMLElement).classList.contains('disabled')).toBe(true);
    expect((emptyLi.nativeElement as HTMLElement).innerText.trim()).toBe('没有选项');
    component.dropdownListShow = true;
    const listData = [
      {
        label: 'test0',
        value: 'test0'
      },
      {
        label: 'test1',
        value: 'test1'
      }
    ];
    component.listData = listData;
    fixture.detectChanges();
    listAllLi = dropdownListDiv.queryAll(By.css('li'));
    expect(dropdownListDiv.properties.hidden).toBe(false);
    expect(listAllLi.length).toBe(2);
    for (let i = 0; i < listAllLi.length; i++) {
      const currentLis = listAllLi[i];
      expect((currentLis.nativeElement as HTMLElement).innerText.trim()).toBe(listData[i].label);
    }
  });

  it('should triggle "dropdownListShow" when click the ".value" span or "dropdown-btn"', () => {
    const dropdownListDiv = debugElement.query(By.css('.dropdown-list'));
    const valueSpan = debugElement.query(By.css('.value'));
    const dropdownBtnSpan = debugElement.query(By.css('.dropdown-btn'));
    expect(component.dropdownListShow).toBe(false);
    expect(dropdownListDiv.properties.hidden).toBe(true);

    valueSpan.triggerEventHandler('click', { stopPropagation: () => {} });
    fixture.detectChanges();
    expect(component.dropdownListShow).toBe(true);
    expect(dropdownListDiv.properties.hidden).toBe(false);

    dropdownBtnSpan.triggerEventHandler('click', { stopPropagation: () => {} });
    fixture.detectChanges();
    expect(component.dropdownListShow).toBe(false);
    expect(dropdownListDiv.properties.hidden).toBe(true);
  });

  it('should can hidden "dropdown-list" when click document and "globalClickClose" is true', () => {
    const dropdownListDiv = debugElement.query(By.css('.dropdown-list'));
    component.dropdownListShow = true;
    fixture.detectChanges();
    expect(dropdownListDiv.properties.hidden).toBe(false);
    document.dispatchEvent(new MouseEvent('mousedown'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    fixture.detectChanges();
    expect(dropdownListDiv.properties.hidden).toBe(true);

    component.dropdownListShow = true;
    component.globalClickClose = false;
    fixture.detectChanges();
    expect(dropdownListDiv.properties.hidden).toBe(false);
    document.dispatchEvent(new MouseEvent('mousedown'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    fixture.detectChanges();
    expect(dropdownListDiv.properties.hidden).toBe(false);
  });

  it('should update selectValue when click dropdown list li', () => {
    const listData: ListData[] = [
      {
        value: 'test0',
        label: 'test0'
      },
      {
        value: 'test1',
        label: 'test1'
      }
    ];
    let expectValue = '';
    component.listData = listData;
    component.dropdownListShow = true;
    component.selectValueChange.subscribe(res => {
      expect(res).toBe(expectValue);
    });
    fixture.detectChanges();
    expectValue = listData[1].value as string;
    const dropdownListLi = debugElement.queryAll(By.css('.dropdown-list li'));
    dropdownListLi[1].triggerEventHandler('click', { stopPropagation: () => {} });
  });
});


