import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, combineLatest } from 'rxjs';
import { Product } from 'src/app/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnDestroy {
  @ViewChild('title', { read: ElementRef }) titleField: ElementRef;

  product: Product = {
    title: null,
    price: 0,
    category: null,
    imageURL: null
  };
  id: string;
  productCategories: {name: string, id: string}[];
  combinedSubscription: Subscription;

  constructor(public productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.combinedSubscription = combineLatest(
      this.productService.categories$,
      this.productService.getProduct$(this.id)
    )
      .subscribe(combined => {
        this.productCategories = combined[0];
        if (this.id && combined[1]) {
          this.product = combined[1];
        }
      });
  }

  ngOnDestroy() {
    this.combinedSubscription.unsubscribe();
  }

  getCategory(id) {
    if (!this.productCategories) return null;

    const category = this.productCategories.find(cat => cat.id === id);
    if (category) return category.name;
    else return null;
  }

  addProduct(product: Product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.add(product);
    }

    this.router.navigate(['/admin/products']);
  }

  deleteProduct() {
    if (!confirm('Are you sure?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
