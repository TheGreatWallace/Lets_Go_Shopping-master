import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
    id: '',
    name: '',
    categorie: '',
    amount: 1,
    price: '',
    bought: false
  };

  categories!: Categorie[];

  submitted = false;

  constructor(private itemService: ItemService, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      }
    )
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      categorie: this.item.categorie,
      amount: this.item.amount,
      price: this.item.price,
    };

    this.itemService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newItem(): void {
    this.submitted = false;
    this.item = {
      name: '',
      amount: 1,
      price: '',
      bought: false
    };
  }
}
