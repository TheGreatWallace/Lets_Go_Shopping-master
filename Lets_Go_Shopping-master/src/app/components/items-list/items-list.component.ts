import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  name = '';

  message = '';

  isDisplay = false;
  isChange = true;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  toggleDisplay(){
    this.isDisplay = !this.isDisplay;
    this.isChange = !this.isChange
  }

  retrieveItems(): void {
    this.itemService.getAll().subscribe(
       (data) => {
        this.items = data;
        console.log(data);
      }
    );
  }

  refreshListOfItems(): void {
    this.retrieveItems();
    this.currentItem = {};
    this.currentIndex = -1;
  }

  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
  }

  removeAllItems(): void {
    this.itemService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'All Items were deleted successfully!';
          this.refreshListOfItems();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentItem = {};
    this.currentIndex = -1;

    this.itemService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
