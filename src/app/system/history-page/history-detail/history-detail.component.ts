import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventService} from "../../shared/services/event.service";
import {CategoryService} from "../../shared/services/category.service";
import {PSEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'ps-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
    event: PSEvent;
    category: Category;
    isLoaded = false;
    s1: Subscription;

    constructor(private route: ActivatedRoute,
                private eventService: EventService,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.s1 = this.route.params
            .mergeMap((params: Params) => this.eventService.getEventById(params['id']))
            .mergeMap((event: PSEvent) => {
                this.event = event;
                return this.categoryService.getCategoryById(event.category);
            })
            .subscribe((category: Category) => {
                this.category = category;
                this.isLoaded = true;
            })
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }
}
