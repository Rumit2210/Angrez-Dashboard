import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';

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
}, {
    path: '/calendar',
    title: 'Calendar',
    type: 'link',
    icontype: 'nc-icon nc-calendar-60'
}, {
    path: '/pages',
    title: 'Pages',
    collapse: 'pages',
    type: 'sub',
    icontype: 'nc-icon nc-book-bookmark',
    children: [
        { path: 'timeline', title: 'Timeline Page', ab: 'T' },
        { path: 'user', title: 'User Page', ab: 'UP' },
        { path: 'login', title: 'Login Page', ab: 'LP' },
        { path: 'register', title: 'Register Page', ab: 'RP' },
        { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' }
    ]
}
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    isNotMobileMenu() {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    ngAfterViewInit() {
    }
}
