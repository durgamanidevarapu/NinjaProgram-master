import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { UsersListResolverService } from '../../services/users-list-resolver.service';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
import { HomeComponent } from '../home/home.component';
import { UsersListComponent } from '../users-list/users-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import(`../../auth/auth-routing.module`).then(m => m.AuthRoutingModule) },
  {
    path: 'users', component: UsersListComponent, canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    resolve: { resolvedUsers: UsersListResolverService }
  },
  { path: 'accessDenied', component: AccessDeniedComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
