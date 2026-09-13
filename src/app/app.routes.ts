import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guards/guard';
import { Categorias } from './pages/categorias/categorias';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'categorias', component: Categorias },
        ],
    },
];
