import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnimationComponent } from './animation/animation.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ClientRoutingModule } from './client.routing';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ShellComponent } from './shell/shell.component';

const COMPONENTS = [
    HomeComponent,
    CatalogoComponent,
    PedidoComponent,
    ShellComponent,
    AnimationComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS,
        FormsModule,
        ReactiveFormsModule,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ClientRoutingModule,
    ]
})

export class ClientModule { }