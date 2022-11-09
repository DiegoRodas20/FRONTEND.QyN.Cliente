import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { HomeComponent } from "./home/home.component";
import { PedidoComponent } from "./pedido/pedido.component";
import { PerfilComponent } from "./account/perfil/perfil.component";
import { ShellComponent } from "./shell/shell.component";
import { PedidosComponent } from "./account/pedidos/pedidos.component";


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
                path: 'miperfil',
                component: PerfilComponent,
                data: { titulo: 'Mi Perfil' }
            },
            {
                path: 'mispedidos',
                component: PedidosComponent,
                data: { titulo: 'Mis Pedidos' }
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