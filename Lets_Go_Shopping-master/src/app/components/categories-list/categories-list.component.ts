import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories?: Categorie[];
  currentCategorie: Categorie = {};
  currentIndex = -1;
  name = '';

  message = '';

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.categorieService.getAll().subscribe(
       (data) => {
        this.categories = data;
        console.log(data);
      }
    );
  }

  refreshListOfCategories(): void {
    this.retrieveCategories();
    this.currentCategorie = {};
    this.currentIndex = -1;
  }

  setActiveCategorie(categorie: Categorie, index: number): void {
    this.currentCategorie = categorie;
    this.currentIndex = index;
  }

  removeAllCategories(): void {
    this.categorieService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'All Categories were deleted successfully!';
          this.refreshListOfCategories();
        },
        error: (e) => console.error(e)
      });
  }

}
