import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolherEnderecoPage } from './escolher-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: EscolherEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolherEnderecoPageRoutingModule {}
