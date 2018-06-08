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

  it('should have div with class ".min-scroll-bar-wrapper"', () => {
    const minScrollBarWrapperDiv = debugElement.query(By.css('.min-scroll-bar-wrapper'));
    expect(minScrollBarWrapperDiv).toBeTruthy();
    expect(component.showScroll).toBe(false);
    expect(component.maxHeight).toBeUndefined();
    expect(minScrollBarWrapperDiv.styles.maxHeight).toBeNull();
    expect(minScrollBarWrapperDiv.classes.hasScroll).toBe(false);
    component.showScroll = true;
    component.maxHeight = 200;
    fixture.detectChanges();
    expect(component.showScroll).toBe(true);
    expect(minScrollBarWrapperDiv.classes.hasScroll).toBe(true);
    expect(minScrollBarWrapperDiv.styles.maxHeight).toBe('200px');
  });
});
