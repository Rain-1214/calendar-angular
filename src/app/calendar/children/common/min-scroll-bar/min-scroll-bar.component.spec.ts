/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinScrollBarComponent } from './min-scroll-bar.component';

describe('MinScrollBarComponent', () => {
  let component: MinScrollBarComponent;
  let fixture: ComponentFixture<MinScrollBarComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinScrollBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinScrollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div with class ".min-scroll-bar-wrapper" and triggle class "hasScroll"', async(() => {
    const minScrollBarWrapperDiv = debugElement.query(By.css('.min-scroll-bar-wrapper'));
    expect(minScrollBarWrapperDiv).toBeTruthy();
    expect(component.showScroll).toBe(false);
    expect(component.maxHeight).toBeUndefined();
    expect(minScrollBarWrapperDiv.styles.maxHeight).toBeNull();
    expect(minScrollBarWrapperDiv.classes.hasScroll).toBe(false);
    component.scrollElement.style.height = '500px';
    component.maxHeight = 200;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.showScroll).toBe(true);
      fixture.detectChanges();
      expect(minScrollBarWrapperDiv.classes.hasScroll).toBe(true);
      expect(minScrollBarWrapperDiv.styles.maxHeight).toBe('200px');
    });
  }));

  it('should has div with class ".scroll-bar" when "showScroll" equal "true"', async(() => {
    let scrollBarElement = debugElement.query(By.css('.scroll-bar'));
    expect(scrollBarElement).toBeNull();
    component.scrollElement.style.height = '500px';
    component.maxHeight = 200;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.showScroll).toBe(true);
      fixture.detectChanges();
      scrollBarElement = debugElement.query(By.css('.scroll-bar'));
      expect(scrollBarElement).toBeTruthy();
      const barDiv = scrollBarElement.query(By.css('.bar'));
      expect(barDiv).toBeTruthy();
      expect((barDiv.nativeElement as HTMLElement).style.top).toBe('0px');
    });
  }));

  it('should scrolled "bar" and "scroll-wrapper" when trigger "mousewheel" event', async(() => {
    const sourceHeight = 500;
    component.scrollElement.style.height = sourceHeight + 'px';
    component.maxHeight = 200;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const parentElement = debugElement.query(By.css('.min-scroll-bar-wrapper'));
      parentElement.triggerEventHandler('mousewheel', { deltaY: 1 });
      fixture.detectChanges();
      const scrollWrapper = debugElement.query(By.css('.scroll-wrapper'));
      const scrollBar = debugElement.query(By.css('.scroll-bar .bar'));
      expect((scrollWrapper.nativeElement as HTMLElement).style.top).toBe(-component.scrollStep + 'px');
      expect(Number.parseInt((scrollBar.nativeElement as HTMLElement).style.top)).toBe(
        Math.floor((component.scrollStep / 300) * (200 - component.scrollBarHeight))
      );

      parentElement.triggerEventHandler('mousewheel', { deltaY: -1 });
      fixture.detectChanges();
      expect((scrollWrapper.nativeElement as HTMLElement).style.top).toBe(0 + 'px');
      expect((scrollBar.nativeElement as HTMLElement).style.top).toBe(0 + 'px');

      parentElement.triggerEventHandler('mousewheel', { deltaY: -1 });
      fixture.detectChanges();
      expect((scrollWrapper.nativeElement as HTMLElement).style.top).toBe(0 + 'px');
      expect((scrollBar.nativeElement as HTMLElement).style.top).toBe(0 + 'px');

      for (let i = 0; i <= 4; i++) {
        parentElement.triggerEventHandler('mousewheel', { deltaY: 1 });
      }
      fixture.detectChanges();
      expect((scrollWrapper.nativeElement as HTMLElement).style.top).toBe(-(component.scrollStep * 5) + 'px');
      expect(Number.parseInt((scrollBar.nativeElement as HTMLElement).style.top)).toBe(
        Math.floor((component.scrollStep * 5 / 300) * (200 - component.scrollBarHeight))
      );

      for (let i = 0; i <= (sourceHeight / component.scrollStep + 5); i++) {
        parentElement.triggerEventHandler('mousewheel', { deltaY: 1 });
      }
      fixture.detectChanges();
      expect((scrollWrapper.nativeElement as HTMLElement).style.top).toBe(-(sourceHeight - component.maxHeight) + 'px');
      expect(Number.parseInt((scrollBar.nativeElement as HTMLElement).style.top)).toBe(component.maxHeight - component.scrollBarHeight);
    });
  }));

  it('should scroll "bar" and "scroll-wrapper" when click the wrapper of scroll-bar', async(() => {
    const sourceHeight = 500;
    component.scrollElement.style.height = sourceHeight + 'px';
    component.maxHeight = 200;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const scrollWrapper = debugElement.query(By.css('.scroll-wrapper'));
      const scrollBar = debugElement.query(By.css('.scroll-bar .bar'));
      scrollWrapper.triggerEventHandler('mouseup', { offsetY: 100 });
      fixture.detectChanges();
      expect((scrollBar.nativeElement as HTMLElement).style.top).toBe((100 - component.scrollBarHeight / 2) + 'px');
    });
  }));
});
