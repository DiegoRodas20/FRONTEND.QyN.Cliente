import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignUpComponent } from '../modules/client/auth/signup/signup.component';
import { SignInComponent } from '../modules/client/auth/signin/signin.component';

const COMPONENTS = [
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    LoaderComponent,
    SignUpComponent,
    SignInComponent,
    ShoppingCartComponent
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