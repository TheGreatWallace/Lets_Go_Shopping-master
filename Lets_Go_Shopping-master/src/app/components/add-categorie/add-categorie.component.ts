import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  categorie: Categorie = {
    id: '',
    name: '',
    description: '',
  };

  submitted = false;

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
  }

  saveCategorie(): void {
    const data = {
      name: this.categorie.name,
      description: this.categorie.description,
    };

    this.categorieService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCategorie(): void {
    this.submitted = false;
    this.categorie = {
      name: '',
      description: '',
    };
  }

}
