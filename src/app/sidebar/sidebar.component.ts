import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    roles: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'nc-icon nc-bank',
    roles: "Admin",
},
{
    path: '/customer',
    title: 'Customer',
    type: 'link',
    icontype: 'fa fa-user',
    roles: "Admin",
},
{
    path: '/employee',
    title: 'Employee',
    type: 'link',
    icontype: 'fa fa-users',
    roles: "Admin",
},
{
    path: '/services',
    title: 'Services',
    type: 'link',
    icontype: 'fa fa-scissors',
    roles: "Admin",
},
{
    path: '/enquiry',
    title: 'Enquiry',
    type: 'link',
    icontype: 'fa fa-question',
    roles: "Admin",
},

];
export const Employee: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'nc-icon nc-bank',
        roles: "Admin",
    },
    {
        path: '/customer',
        title: 'Customer',
        type: 'link',
        icontype: 'fa fa-user',
        roles: "Admin",
    },
    {
        path: '/enquiry',
        title: 'Enquiry',
        type: 'link',
        icontype: 'fa fa-question',
        roles: "Admin",
    },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    public subAdminMenuItems: any;
    public Rolees = localStorage.getItem("role");
    public userName = localStorage.getItem("UserName");
    Roles: any;
    isNotMobileMenu() {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    }
    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.Roles = localStorage.getItem("adminRole");
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.subAdminMenuItems = Employee.filter((menuItem) => menuItem);
    }
    ngAfterViewInit() {
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['pages/login'])
    }
}
