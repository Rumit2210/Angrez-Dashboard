import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './material/material.module';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        NgbModule,
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        NgxPaginationModule,
        MaterialModule,
        AngularMultiSelectModule,
        NgxStarRatingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
