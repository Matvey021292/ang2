import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {EventService} from "../shared/services/event.service";
import {Observable} from "rxjs/Observable";
import {PSEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'ps-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})

export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoryService: CategoryService,
                private eventsService: EventService) {
    }
    s1: Subscription;
    isLoaded = false;

    chartData = [];

    categories: Category[] = [];
    events: PSEvent[] = [];

    ngOnInit() {
        this.s1 = Observable.combineLatest(
            this.categoryService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe((data: [Category[], PSEvent[]]) =>{
            this.categories = data[0];
            this.events = data[1];

            this.calculateChartData();

            this.isLoaded = true;
        })
    }
    calculateChartData():void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.chartData.push({
                name: cat.name,
                value: catEvent.reduce((total,e) => {
                    total += e.amount;
                    return total;
                },0)
            });
        });
    }
    ngOnDestroy(){
        if(this.s1){
            this.s1.unsubscribe();
        }
    }

}
