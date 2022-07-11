import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const DEFAULT_ROUTE: string = 'home'

const routes: Routes = [

    // Client Module
    {
        path: '',
        redirectTo: DEFAULT_ROUTE,
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./modules/client/client.module').then( (m) => m.ClientModule )
    }
    
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }