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
import { AlertComponent } from './components/alert/alert.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ToolTipComponent } from './components/tooltip/tooltip.component';
import { ChangePasswordComponent } from '../modules/client/auth/change-password/change-password.component';

const COMPONENTS = [
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ShoppingCartComponent,
    
    AlertComponent,
    LoaderComponent,
    ErrorMessageComponent,
    ToolTipComponent,

    // Auth Components
    SignUpComponent,
    SignInComponent,
    ChangePasswordComponent
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