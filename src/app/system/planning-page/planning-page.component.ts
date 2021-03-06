import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { PSEvent } from '../shared/models/event.model';
import { Subscription } from 'rxjs/Subscription';
import {Meta, Title} from '@angular/platform-browser';



@Component({
    selector: 'ps-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

    isLoaded = false;
    s1: Subscription;


    bill: Bill;
    categories: Category[] = [];
    events: PSEvent[] = [];


    constructor(private  billService: BillService,
                private categoryService: CategoriesService,
                private eventService: EventsService,
                private title: Title,
                private meta: Meta) {
        title.setTitle('Планирование');
        meta.addTags([
            {name: 'keywords', content: 'регистрация Планирование система'},
            {name: 'description', content: 'Страница Планирование'},
        ]);
    }

    ngOnInit() {
        this.s1 = Observable.combineLatest(
            this.billService.getBill(),
            this.categoryService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: [Bill, Category[], PSEvent[]]) => {
            this.bill = data[0];
            this.categories = data[1];
            this.events = data[2];
            this.isLoaded = true;
        });
    }

    getCategoryCost(cat: Category): number {
        const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
        return catEvents.reduce((total, e) => {
            total += e.amount;
            return total;
        }, 0);

    }
    private getPercent(cat: Category): number {
            const percent = (100 * this.getCategoryCost(cat)) / +cat.capacity;
            return percent > 100 ? 100 : percent;
    }
    getCatPercent(cat: Category): string {
        return this.getPercent(cat) + '%';
    }

    getCatColorClass(cat: Category): string {
        const percent = this.getPercent(cat);
        return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
    }
    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }
}
