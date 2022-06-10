import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StockRoutes } from './stock.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(StockRoutes)
  ]
})
export class StockModule { }