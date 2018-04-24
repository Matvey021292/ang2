import {Bill} from "../../shared/models/bill.model";
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ps-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input () bill: Bill;
  @Input () currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
      this.dollar = (rates['USD']/rates['EUR']) * this.bill.value/rates['EUR'];
      this.euro = (rates['EUR']/rates['EUR']) * this.bill.value/rates['EUR'];

  }
}
