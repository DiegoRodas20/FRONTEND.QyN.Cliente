import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { HomeComponent } from "./home/home.component";
import { PedidoComponent } from "./pedido/pedido.component";
import { MiPerfilComponent } from "./account/miperfil/miperfil.component";
import { ShellComponent } from "./shell/shell.component";
import { MisPedidosComponent } from "./account/mispedidos/mispedidos.component";
import { MenuPerfilComponent } from "./account/menu-perfil/menu-perfil.component";


const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: { titulo: 'Home' }
            },
            {
                path: 'catalogo',
                component: CatalogoComponent,
                data: { titulo: 'Catálogo' }
            },
            {
                path: 'pedido',
                component: PedidoComponent,
                data: { titulo: 'Pedido' }
            },
            {
                path: 'micuenta',
                component: MenuPerfilComponent,
                data: { titulo: 'Mi Cuenta' }
            },
        ]
    },
    {
        path: '**',
        redirectTo: '/catalogo',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ClientRoutingModule { }