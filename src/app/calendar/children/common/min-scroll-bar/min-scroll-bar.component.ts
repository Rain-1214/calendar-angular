import { Component, OnInit, ViewChildren, ElementRef, AfterContentInit, ContentChild, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-min-scroll-bar',
  templateUrl: './min-scroll-bar.component.html',
  styleUrls: ['./min-scroll-bar.component.scss']
})
export class MinScrollBarComponent implements OnInit, AfterContentInit, AfterViewInit {

  @ViewChild('ul') children;

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.children);
  }

}
