import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from 'src/app/core/guards/admin/admin.guard';
import { userGuard } from 'src/app/core/guards/user/user.guard';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { UpdateProfileComponent } from 'src/app/shared/components/update-profile/update-profile.component';


const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./../admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        canActivate: [userGuard],
        loadChildren: () =>
          import('./../../user/user.module').then((m) => m.UserModule),
      },
      { path: 'update-profile', component:UpdateProfileComponent}

    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
