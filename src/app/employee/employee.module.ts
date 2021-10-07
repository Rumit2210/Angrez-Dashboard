import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    RouterModule.forChild(EmployeeRoutes)
  ]
})
export class EmployeeModule { }
