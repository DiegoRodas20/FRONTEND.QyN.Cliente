import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class SharedModule { }