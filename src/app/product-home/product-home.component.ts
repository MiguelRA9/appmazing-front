import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  products: any = []; //Este es el datasource que se coge en el html.

  displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'active', 'date_added', 'category'];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  openDetailForm(row: any) {
    this.router.navigate(['/product', row.id])
  } //method implemented in product-home (html) which uses the url and row.id as parameters to show the single product which links to those parameters.

}
