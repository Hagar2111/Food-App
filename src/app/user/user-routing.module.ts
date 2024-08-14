import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UpdateProfileComponent } from '../shared/components/update-profile/update-profile.component';

const routes: Routes = [
  { path: '', component: UserComponent }, 
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) }, 
  { path: 'user-recipes', loadChildren: () => import('./user-recipes/user-recipes.module').then(m => m.UserRecipesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
