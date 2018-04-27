import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

import {BaseApi} from '../../../shared/core/base.api';
import {PSEvent} from '../models/event.model';


@Injectable()
export class EventsService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addEvent(event: PSEvent): Observable<PSEvent> {
        return this.post('events', event);
    }

    getEvents(): Observable<PSEvent[]> {
        return this.get('events');
    }

    getEventById(id: string): Observable<PSEvent> {
        return this.get(`events/${id}`);
    }
}