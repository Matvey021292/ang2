import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'ps-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    sub1: Subscription;
    sub2: Subscription;

    currency: any;
    bill: Bill;

    isLoaded = false;

    constructor(private billService: BillService,
                private title: Title,
                private meta: Meta) {
        title.setTitle('Cчет');
        meta.addTags([
            {name: 'keywords', content: 'регистрация счет система'},
            {name: 'description', content: 'Страница Cчет'},
        ]);
    }

    ngOnInit() {
        this.sub1 = Observable.combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency(),
        ).subscribe((data: [Bill, any]) => {
            this.bill = data[0];
            this.currency = data[1];
            this.isLoaded = true;
        });
    }

    onRefresh() {
        this.isLoaded = false;
        this.sub2 = this.billService.getCurrency()
            .delay(2000)
            .subscribe((currency: any) => {
                this.currency = currency;
                this.isLoaded = true;
            });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }

}
