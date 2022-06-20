import { Routes } from '@angular/router';
import { MembershipComponent } from './membership.component';


export const MembershipRoutes: Routes = [{
    path: '',
    children: [{
        path: 'membership',
        component: MembershipComponent
    }]
}];
