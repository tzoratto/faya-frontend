import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './utils/auth/auth-guard.service';
import {SignupComponent} from './signup/signup.component';
import {SettingGuard} from './setting/setting-guard.service';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './admin/admin-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [SettingGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
