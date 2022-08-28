import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolherPagamentoPage } from './escolher-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: EscolherPagamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolherPagamentoPageRoutingModule {}
