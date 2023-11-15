import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Product } from '../model/Product';
import { Category } from '../model/Category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  category: Category = new Category();
  categories: []

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product= data;
    })
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  updateProduct() {
    const product = {
      name: this.product.name,
      stock: this.product.stock,
      price: this.product.price,
      active: this.product.active,
      date_added: this.product.date_added,
      category: this.category
    }
    this.productService.updateProduct(this.product);
    this.navigateProductDetail();
  }

  cancelUpdate() {
    this.navigateProductDetail();
  }

  navigateProductDetail() {
    this.router.navigate(['/product', this.route.snapshot.params['id']])
  }

}
