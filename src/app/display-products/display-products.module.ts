import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayProductsComponent } from './display-products.component';
import { RouterModule } from '@angular/router';
import { DisplayProductRoutes } from './display-products.routing';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [DisplayProductsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(DisplayProductRoutes)
  ]
})
export class DisplayProductsModule { }
