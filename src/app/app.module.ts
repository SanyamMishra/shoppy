import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MaterialComponentsModule } from './material-components/material-components.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AdminGuard } from './guards/admin.guard';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},

  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard]},

  {path: 'shopping-cart', component: ShoppingCartComponent},

  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ShoppingCartComponent,
    HomeComponent,
    CheckOutComponent,
    LoginComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
