import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipComponent } from './membership.component';
import { MembershipRoutes } from './membership.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'app/material/material.module';
@NgModule({
  declarations: [MembershipComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(MembershipRoutes)
  ],
  exports:[
    MembershipComponent
  ]
})
export class MembershipModule { }
