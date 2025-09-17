import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { TasksComponent } from './components/tasks/tasks';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';

import { guardAppGuard } from './guard-app-guard';

export const routes: Routes = [
    {path: "home", component: HomeComponent, canActivate: [guardAppGuard]},    
    {path: "tasks", component: TasksComponent, canActivate: [guardAppGuard]},
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    {path: "", redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
