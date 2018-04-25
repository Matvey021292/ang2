import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../shared/services/category.service";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ps-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{
   sub1: Subscription;
  @Output() onCategoryAdd = new EventEmitter<Category>();
  constructor(private categoriesService: CategoryService ) { }

  ngOnInit() {
  }
    onSubmit(form: NgForm) {
        let {name, capacity} = form.value;
        if (capacity < 0) {
            capacity *= -1;
        }

        const category = new Category(name, capacity);

        this.sub1 = this.categoriesService.addCategory(category)
            .subscribe((category: Category) => {
                form.reset();
                form.form.patchValue({capacity: 1});
                this.onCategoryAdd.emit(category);

            })
    }
    ngOnDestroy(){
      if(this.sub1) this.sub1.unsubscribe();
    }
}
