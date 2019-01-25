import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryItemListComponent } from './registry-item-list/registry-item-list.component';
import { RegistryItemFormComponent } from './registry-item-form/registry-item-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "registryitem", component: RegistryItemFormComponent, canActivate: [AuthguardService] },
  { path: "registryitemlist", component: RegistryItemListComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent, canActivate: [AuthguardService] }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
