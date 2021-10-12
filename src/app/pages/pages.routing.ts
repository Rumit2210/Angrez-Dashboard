import { Routes } from '@angular/router';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';

import { LoginComponent } from './login/login.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgotpwd',
        component: ForgotPwdComponent
    },
    ]
}];
