import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailAuthGuard } from './email-auth.guard';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [EmailAuthGuard] },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
