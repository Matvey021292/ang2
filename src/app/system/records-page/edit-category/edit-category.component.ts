import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/services/category.service";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'ps-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    sub1: Subscription;
    @Input() categories: Category[] = [];
    @Output() onCategoryEdit = new EventEmitter<Category[]>();

    currentCategoryId = 1;
    currentCategory: Category;
    message: Message;

        constructor(private  categoriesService: CategoryService) {
    }

    ngOnInit() {
            this.message = new Message('success','');
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
       this.sub1 = this.categoriesService.updateCategory(category)
            .subscribe((category: Category[]) => {
            this.onCategoryEdit.emit(category);
            this.message.text = 'Категория успешно отредаткирована.';
            window.setTimeout(()=> this.message.text ='',5000);
            })
    }
    ngOnDestroy(){
            if (this.sub1) this.sub1.unsubscribe();
    }
}
