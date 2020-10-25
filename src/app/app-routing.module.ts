import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bookmarks' },
  { path: 'bookmarks', loadChildren: () => import('./bookmarks/bookmarks.module').then((m) => m.BookmarksModule) },
  { path: '*', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
