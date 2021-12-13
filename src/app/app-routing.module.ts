import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'animal/:id',
    loadChildren: () => import('./pages/animal/animal.module').then(m => m.AnimalPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./pages/user-details/user-details.module').then(m => m.UserDetailsPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then(m => m.AddUserPageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then(m => m.EditUserPageModule)
  },
  {
    path: 'add-favorite-animal/:id',
    loadChildren: () => import('./pages/add-favorite-animal/add-favorite-animal.module').then(m => m.AddFavoriteAnimalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
