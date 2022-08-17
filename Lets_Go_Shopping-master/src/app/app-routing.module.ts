import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CategorieDetailsComponent } from './components/categorie-details/categorie-details.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full'},
  { path: 'items', component: ItemsListComponent},
  { path: 'items/:id', component: ItemDetailsComponent},
  { path: 'add-item', component: AddItemComponent},

  { path: '', redirectTo: '/categories', pathMatch: 'full'},
  { path: 'categories', component: CategoriesListComponent},
  { path: 'categories/:id', component: CategorieDetailsComponent},
  { path: 'add-categorie', component: AddCategorieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
