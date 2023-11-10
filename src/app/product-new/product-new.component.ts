import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  name: string;
  stock: number;
  price: number;
  active: boolean;
  date_added: string;
  //category

  constructor(private router: Router, private productsService: ProductsService) { }

  ngOnInit() {
  }

  newProduct() {
    const product = {
      name: this.name,
      stock: this.stock,
      price: this.price,
      active: this.active,
      date_added: this.date_added,
      //category
    }
    this.productsService.newProduct(product);
    this.navigateToHome();
  }

  cancelInsert() {
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(['/products']);
  }

}
