import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './core/auth/auth-guard.service';
import {SignupComponent} from './signup/signup.component';
import {SignupGuard} from './signup/signup-guard.service';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './admin/admin-guard.service';
import {TokenManagerComponent} from './token-manager/token-manager.component';
import {ApiKeyPairComponent} from './api-key-pair/api-key-pair.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';

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
        canActivate: [SignupGuard]
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
    },
    {
        path: 'token-manager',
        component: TokenManagerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'api-key-pair',
        component: ApiKeyPairComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'password-reset',
        component: PasswordResetComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
