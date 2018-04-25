import { Component, OnInit } from '@angular/core';
import {Category} from "../shared/models/category.model";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'ps-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
    categories: Category[] = [];
    isLoaded = false;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryService.getCategories()
            .subscribe((categories: Category[]) => {
                this.categories = categories;
                this.isLoaded = true;
            })
    }

    NewCategoryAdded(category: Category) {
        this.categories.push(category);
    }

    categoryWasEdited(category: Category) {
        const idx = this.categories
            .findIndex(c => c.id === category.id);
        this.categories[idx] = category;
    }
}
