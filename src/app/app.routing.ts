import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
}, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    },
    {
        path: '',
        loadChildren: './employee/employee.module#EmployeeModule'
    },
    {
        path: '',
        loadChildren: './customer/customer.module#CustomerModule'
    },
    {
        path: '',
        loadChildren: './services/services.module#ServicesModule'
    },
    {
        path: '',
        loadChildren: './enquiry/enquiry.module#EnquiryModule'
    },
    ]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
    }]
}
];
