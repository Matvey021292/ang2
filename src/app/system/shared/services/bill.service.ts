import {Injectable} from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BaseApi} from "../../../shared/core/base.api";
import {ClientResponse} from "http";

@Injectable()
export class BillService extends BaseApi {
    constructor( public http: HttpClient) {
        super(http);
    }

    // getBill(): Observable<any> {
    //     return this.http.get('http://localhost:3000/bill')
    // }
    getBill(): Observable<any> {
       return this.get('bill');
    }
    getCurrency(base: string = 'UAH'): Observable<any> {
        return this.http.get(`http://data.fixer.io/api/latest?access_key=d108b50e13972eb46c646cdb5c124535&%20base%20=%20UAH&symbols = GBP,JPY,EUR`)


}
}