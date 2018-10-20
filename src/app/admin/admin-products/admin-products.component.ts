import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AdminProductsDataSource } from './admin-products-datasource';
import { TableFilterDirective } from 'src/app/table-filter.directive';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(TableFilterDirective) tableFilter: TableFilterDirective;
  dataSource: AdminProductsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['index', 'title', 'price', 'action'];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.products$
      .subscribe(products => this.dataSource = new AdminProductsDataSource(
        products,
        this.paginator,
        this.sort,
        this.tableFilter
      ));
  }

  editProduct(id) {
    this.router.navigate(['/admin/product/', id]);
  }
}
