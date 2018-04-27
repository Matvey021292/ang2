import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';

import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base.api';


@Injectable()
export class BillService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }
    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }
    getCurrency(base: string = 'UAH'): Observable<any> {
        return this.http.get(`http://data.fixer.io/api/latest?access_key=d108b50e13972eb46c646cdb5c124535&%20base%20=${base}`)
        .map((response: Response) => response.json());
    }
}