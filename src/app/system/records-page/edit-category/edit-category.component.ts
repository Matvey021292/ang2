import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/services/category.service";

@Component({
    selector: 'ps-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
    @Input() categories: Category[] = [];
    @Output() onCategoryEdit = new EventEmitter<Category[]>();

    currentCategoryId = 1;
    currentCategory: Category;

    constructor(private  categoriesService: CategoryService) {
    }

    ngOnInit() {
        this.onCategoryChange();
    }

    onCategoryChange(){
            // console.log(this.currentCategoryId)
        this.currentCategory = this.categories
            .find(c => c.id === +this.currentCategoryId)
    }

    onSubmit(form: NgForm) {
        let {capacity,name} = form.value;
        if(capacity < 0 ) capacity *=-1;

        const category = new Category(name, capacity, +this.currentCategoryId);
        this.categoriesService.updateCategory(category)
            .subscribe((category: Category[]) => {
            this.onCategoryEdit.emit(category);
            })
    }
}
