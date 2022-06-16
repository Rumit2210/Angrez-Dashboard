import { Routes } from '@angular/router';
import { DisplayProductsComponent } from './display-products.component';


export const DisplayProductRoutes: Routes = [{
    path: '',
    children: [{
        path: 'display-products',
        component: DisplayProductsComponent
    }]
}];