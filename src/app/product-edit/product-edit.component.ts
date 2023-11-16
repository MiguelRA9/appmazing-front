import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  categories: []

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router, private categoriesService: CategoriesService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product= data;

      let dateFormated = this.datePipe.transform(this.product.date_added, 'dd/MM/yyyy');
      //this.product.date_added = dateFormated;
    })
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  updateProduct() {
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
