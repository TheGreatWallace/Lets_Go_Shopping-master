import { Component, OnInit, Input } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css']
})
export class CategorieDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCategorie: Categorie = {
    name: '',
    description: ''
  };

  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCategorie(this.route.snapshot.params["id"]);
    }
  }

  getCategorie(id: string): void {
    this.categorieService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCategorie = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateCategorie(): void {
    this.message = '';
    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.categorieService.update(this.currentCategorie.id, this.currentCategorie)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Ctaegorie was updated successfully!';
          this.router.navigate(['/categories']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  deleteCategorie(): void {
    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.categorieService.delete(this.currentCategorie.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Categorie was deleted successfully!';
          this.router.navigate(['/categories']);
        },
        error: (e) => console.error(e)
      });
    }
  }

}
