import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'common-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}
  @Input() email: any = '';
  @Input() first_name: any = '';
  @Input() last_name: any = '';
  @Input() avatar: any = '';

  ngOnInit(): void {}
}
