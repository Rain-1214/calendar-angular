import { Component, OnInit, Input } from '@angular/core';
import { ListData } from '../../../calendar.type';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss', '../../../assets/sass/common.scss']
})
export class DropdownComponent implements OnInit {

  @Input() width = 80;
  @Input() listData: ListData[] = [
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
    {
      label: '一月',
      value: 1
    },
    {
      label: '二月',
      value: 2
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
