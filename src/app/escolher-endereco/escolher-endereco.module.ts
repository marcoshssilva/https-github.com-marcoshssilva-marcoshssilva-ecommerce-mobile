import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolherEnderecoPageRoutingModule } from './escolher-endereco-routing.module';

import { EscolherEnderecoPage } from './escolher-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolherEnderecoPageRoutingModule
  ],
  declarations: [EscolherEnderecoPage]
})
export class EscolherEnderecoPageModule {}
