import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

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
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'password',
        loadChildren: './password/password.module#PasswordModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './userpage/user.module#UserModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './employee/employee.module#EmployeeModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './customer/customer.module#CustomerModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './services/services.module#ServicesModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './servicescustm/servicescustm.module#ServicescustmModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './enquiry/enquiry.module#EnquiryModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './offer/offer.module#OfferModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './products/products.module#ProductsModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './expenses/expenses.module#ExpensesModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './reports/reports.module#ReportsModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './display-products/display-products.module#DisplayProductsModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './vendor/vendor.module#VendorModule',
        canActivate: [AuthGuard]
    },
    {
        path:'',
        loadChildren: './attandance/attandance.module#AttandanceModule',
        canActivate:[AuthGuard]
    },
    {
        path: '',
        loadChildren: './customerservice/customerservice.module#CustomerserviceModule',
        canActivate: [AuthGuard]
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