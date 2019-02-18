import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const Approutes: Routes = [
  { path: '', loadChildren: '../home-module/home.module#HomeModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(Approutes),
  ],
  declarations: []
})
export class AppRoutingModule { }
