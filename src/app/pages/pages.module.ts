import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';


import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        ForgotPwdComponent,

    ]
})

export class PagesModule { }
