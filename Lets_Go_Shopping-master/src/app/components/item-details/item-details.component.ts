import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() 
  
  currentItem: Item = {
    name: '',
    categorie: '',
    amount: 1,
    price: '',
    bought: false
  };

  currentCategorie: Categorie = {
    name: '',
    description: ''
  };

  message = '';

  categories!: Categorie[];

  constructor(
    private itemService: ItemService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    // private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getItem(this.route.snapshot.params["id"]);
      this.getCategorie(this.route.snapshot.params["name"])
    }

    this.categorieService.getAll().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      }
    )
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe({
        next: (data) => {
          this.currentItem = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getCategorie(name: string): void {
    this.categorieService.get(name)
      .subscribe({
        next: (data) => {
          this.currentCategorie = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  updateBought(status: boolean): void {
    const data = {
      name: this.currentItem.name,
      categorie: this.currentItem.categorie,
      amount: this.currentItem.amount,
      price: this.currentItem.price,
    };

    this.message = '';

    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.itemService.update(this.currentItem.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentItem.bought = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
          // this.router.navigate(['/items']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  updateItem(): void {
    this.message = '';
    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.itemService.update(this.currentItem.id, this.currentItem)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Item was updated successfully!';
          // this.router.navigate(['/items']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  deleteItem(): void {
    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.itemService.delete(this.currentItem.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Item was deleted successfully!';

        },
        error: (e) => console.error(e)
      });
    }
  }

}
