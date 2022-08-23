import { Component, Input, OnInit } from '@angular/core';

interface Column {
  field: string;
  displayName?: string;
  type?: string;
}

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
