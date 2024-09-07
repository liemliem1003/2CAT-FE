import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { QRgeneratorComponent } from './qrgenerator/qrgenerator.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'order', component: OrderComponent },
    { path: 'table-details', component: TableDetailsComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'item-details', component: ItemDetailsComponent },
    { path: 'create-item', component: CreateItemComponent },
    { path: 'create-order', component: CreateOrderComponent },
    { path: 'order-details', component: OrderDetailsComponent },
    { path: 'qrcode', component: QRgeneratorComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
