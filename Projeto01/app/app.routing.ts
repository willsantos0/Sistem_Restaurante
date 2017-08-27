import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestauranteComponent } from './components/restaurante.component';
import { PratoComponent } from './components/prato.component';
import { HomeComponent } from './components/home.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'restaurante', component: RestauranteComponent },
    { path: 'prato', component: PratoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);