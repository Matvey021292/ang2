import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {PSEvent} from '../../shared/models/event.model';

@Component({
    selector: 'ps-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

    @Input() categories: Category[] = [];
    @Input() events: PSEvent[] = [];
    searchValue = '';
    searchPlaceholder = 'Сумма';
    searchField = 'amount';

    constructor() {
    }

    ngOnInit() {
        this.events.forEach((e) => {
            e.catName = this.categories.find(c => c.id === e.category).name;
        });
    }

    getEventClass(e: PSEvent) {
        return {
            'label': true,
            'label-danger': e.type === 'outcome',
            'label-success': e.type === 'income'
        };
    }

    chacheCriteria(field: string) {
        const nameMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        };
        this.searchPlaceholder = nameMap[field];
        this.searchField = field;
    }

}
