import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product, ProductCategory } from '../product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) {
  }

  get categories$(): Observable<{name: string, id: string}[]> {
    return this.afs.collection<ProductCategory>('product-categories').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    ) as Observable<{name: string, id: string}[]>;
  }

  add(product: Product) {
    return this.afs.collection<Product>('products').add(product);
  }

  update(id: string, product: Product) {
    this.afs.collection<Product>('products').doc(id).update(product);
  }

  delete(id: string) {
    this.afs.collection<Product>('products').doc(id).delete();
  }

  get products$() {
    return this.afs.collection<Product>('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getProduct$(id) {
    return this.afs.doc<Product>(`products/${id}`).valueChanges();
  }
}
