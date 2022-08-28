import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolherPagamentoPageRoutingModule } from './escolher-pagamento-routing.module';

import { EscolherPagamentoPage } from './escolher-pagamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolherPagamentoPageRoutingModule
  ],
  declarations: [EscolherPagamentoPage]
})
export class EscolherPagamentoPageModule {}
