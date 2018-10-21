import { Component, OnDestroy} from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  productCategories;
  products;
  currCategory: string = null;
  private combinedSubscription: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.combinedSubscription = combineLatest(route.queryParams, productService.categories$, productService.products$)
      .subscribe(combined => {
        const queryParams = combined[0];
        const categories = combined[1];
        const products = combined[2];

        this.productCategories = categories;

        if (queryParams.category) {
          this.currCategory = queryParams.category;
          this.products = products.filter(product => product.category === queryParams.category);
        } else {
          this.currCategory = null;
          this.products = products;
        }
      });
  }

  ngOnDestroy() {
    this.combinedSubscription.unsubscribe();
  }

  getCategoryName(id) {
    const category = this.productCategories.find(cat => cat.id === id);
    if (!category) return null;

    return category.name;
  }

}
