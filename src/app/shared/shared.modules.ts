import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgxChartsModule
    ],
    exports: [ReactiveFormsModule, FormsModule, NgxChartsModule]
})

export class SharedModule {
}

