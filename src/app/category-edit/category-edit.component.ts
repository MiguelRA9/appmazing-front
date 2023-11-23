import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: any;

  constructor(private categoryService: CategoriesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategory(this.route.snapshot.params['id']).subscribe(data => {
      this.category = data;
    })
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category);
    this.navigateContactHome();
  }

  cancelUpdate() {
    this.navigateContactHome();
  }

  navigateContactHome() {
    this.router.navigate(['/categories']);
  }

}
