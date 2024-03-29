import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ClientRoutingModule } from './client.routing';
import { HomeComponent } from './home/home.component';
import { MiPerfilComponent } from './account/miperfil/miperfil.component';
import { ShellComponent } from './shell/shell.component';
import { MisPedidosComponent } from './account/mispedidos/mispedidos.component';
import { MenuPerfilComponent } from './account/menu-perfil/menu-perfil.component';
import { PedidoComponent } from './pedido/pedido.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { FilterTablePipe } from 'src/app/core/pipes/filter-table.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterCategoryPipe } from 'src/app/core/pipes/filter-category.pipe';
import { OrderReviewComponent } from './order-review/order-review.component';
import { WishListComponent } from './account/wishlist/wishlist.component';

const COMPONENTS = [
    HomeComponent,
    CatalogoComponent,
    PedidoComponent,

    // Order
    OrderTrackingComponent,
    OrderReviewComponent,

    // Menu Profile
    MenuPerfilComponent,
    MisPedidosComponent,
    MiPerfilComponent,
    WishListComponent,
    
    ShellComponent
]

const PIPES = [
    FilterTablePipe,
    FilterCategoryPipe
]

@NgModule({
    declarations: [
        COMPONENTS,
        PIPES
    ],
    exports: [
        COMPONENTS,
        FormsModule,
        ReactiveFormsModule
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule,
        ClientRoutingModule,
    ]
})

export class ClientModule { }