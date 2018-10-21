import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() title: string;
  @Input() category: string;
  @Input() price: number;
  @Input() imageURL: string;
  @Input() addToCart: boolean;

  constructor() { }

  ngOnInit() {
  }

}
