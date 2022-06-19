import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

    // Client Module
    {
        path: '',
        loadChildren: () => import('./modules/client/client.module').then( (m) => m.ClientModule )
    }
    
    // Auth Module

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }