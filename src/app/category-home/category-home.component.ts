import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.css']
})
export class CategoryHomeComponent implements OnInit {
  categories: any = [];

  displayedColumns: string[] = ['id', 'name']

  constructor(private categoriesService: CategoriesService, private router: Router, public dialog: MatDialog) { };

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  editCategoryDetail(category: any) {
    this.router.navigate(['/category/edit', category])
  }
}
