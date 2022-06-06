import { Routes } from '@angular/router';
import { StockComponent } from './stock.component';


export const StockRoutes: Routes = [{
    path: '',
    children: [{
        path: 'stock',
        component: StockComponent
    }]
}];