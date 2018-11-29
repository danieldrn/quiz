import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPerguntasPage } from './cadastro-perguntas';

@NgModule({
  declarations: [
    CadastroPerguntasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPerguntasPage),
  ],
})
export class CadastroPerguntasPageModule {}
