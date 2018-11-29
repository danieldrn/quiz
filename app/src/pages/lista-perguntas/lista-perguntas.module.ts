import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPerguntasPage } from './lista-perguntas';

@NgModule({
  declarations: [
    ListaPerguntasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPerguntasPage),
  ],
})
export class ListaPerguntasPageModule {}
