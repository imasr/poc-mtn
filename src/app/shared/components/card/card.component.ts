import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'common-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}
  @Input() email = '';
  @Input() first_name = '';
  @Input() last_name = '';
  @Input() avatar = '';

  ngOnInit(): void {}
}
