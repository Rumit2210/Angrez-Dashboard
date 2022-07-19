import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
@NgModule({
    imports: [ 
        RouterModule,
        CommonModule,  
        FormsModule,
        MaterialModule
    ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
