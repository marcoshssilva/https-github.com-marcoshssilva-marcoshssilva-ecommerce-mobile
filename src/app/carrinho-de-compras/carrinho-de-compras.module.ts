import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrinhoDeComprasPageRoutingModule } from './carrinho-de-compras-routing.module';

import { CarrinhoDeComprasPage } from './carrinho-de-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrinhoDeComprasPageRoutingModule
  ],
  declarations: [CarrinhoDeComprasPage]
})
export class CarrinhoDeComprasPageModule {}
