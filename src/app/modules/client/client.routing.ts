import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { HomeComponent } from "./home/home.component";
import { PedidoComponent } from "./pedido/pedido.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ShellComponent } from "./shell/shell.component";


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
                path: 'perfil',
                component: PerfilComponent,
                data: { titulo: 'Perfil' }
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