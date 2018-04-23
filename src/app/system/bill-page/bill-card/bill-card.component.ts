  import { Component, OnInit, OnDestroy } from '@angular/core';
  import {BillService} from "../../shared/services/bill.service";
  import {observable} from "rxjs/symbol/observable";
  import {Bill} from "../../shared/models/bill.model";
  import {Observable} from "rxjs/Observable";
  import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ps-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor( private billService: BillService) { }

  ngOnInit() {
     this.subscription =  Observable.combineLatest(
          this.billService.getBill(),
          this.billService.getCurrency(),
      ).subscribe((data: [Bill,any])=>{
    console.log(data);
      })
  }

  ngOnDestroy(){
     this.subscription.unsubscribe();
  }

}
