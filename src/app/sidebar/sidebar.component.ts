import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
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
    icontype: 'nc-icon nc-bank'
},
{
    path: '/customer',
    title: 'Customer',
    type: 'link',
    icontype: 'fa fa-user'
},
{
    path: '/employee',
    title: 'Employee',
    type: 'link',
    icontype: 'fa fa-users'
},
{
    path: '/services',
    title: 'Services',
    type: 'link',
    icontype: 'fa fa-scissors'
},
{
    path: '/enquiry',
    title: 'Enquiry',
    type: 'link',
    icontype: 'fa fa-question'
},

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    public userName = localStorage.getItem("UserName");

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
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    ngAfterViewInit() {
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['pages/login'])
    }
}
