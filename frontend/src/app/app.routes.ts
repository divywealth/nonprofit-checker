import { Routes } from '@angular/router';
import { Login } from './authentication/login/login';
import { Register } from './authentication/register/register';
import { Home } from './home/home';
import { AuthGuard, NoAuthGuard } from '../guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [NoAuthGuard]},
    { path: 'register', component: Register, canActivate: [NoAuthGuard] },
    { path: '', component: Home, canActivate: [AuthGuard]}
];
