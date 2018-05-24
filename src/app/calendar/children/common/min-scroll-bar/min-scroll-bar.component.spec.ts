/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinScrollBarComponent } from './min-scroll-bar.component';

describe('MinScrollBarComponent', () => {
  let component: MinScrollBarComponent;
  let fixture: ComponentFixture<MinScrollBarComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
