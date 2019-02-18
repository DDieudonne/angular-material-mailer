import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const authRoutes: Routes = [
    { path: 'home-forms', component: HomeComponent },
    { path: '**', redirectTo: 'home-forms' }

];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class HomeRouting { }