import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Pergunta } from '../../modules/pergunta';
import { HttpClient } from '@angular/common/http';
import { CadastroPerguntasPage } from '../cadastro-perguntas/cadastro-perguntas';

@IonicPage()
@Component({
  selector: 'page-visualizar-perguntas',
  templateUrl: 'visualizar-perguntas.html',
})
export class VisualizarPerguntasPage {

  private pergunta: Pergunta;
  private _isExcluir: boolean;
  load;
  conteudoAlert = { titulo: '', mensagem: '' }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _http: HttpClient,
    private _loadCtr: LoadingController,
    private _alertCtrl: AlertController) {

    this._isExcluir = false;
    this.pergunta = this.navParams.get('perguntaSelecionada');

    this.load = _loadCtr.create(
      { content: "Carregando..." }
    );
  }

  confirma() {
    /** Definição do compontente */
    let alert = this._alertCtrl.create({
      title: 'Excluir Pergunta',
      message: 'Você tem certeza que deseja excluir esta pergunta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            alert.dismiss;
            this.excluir();
          }
        }
      ]
    });
    alert.present();
  }


  excluir() {

    this.load.present();
    this._isExcluir = true;
    this._http.delete("http://localhost:3000/pergunta/" + this.pergunta._id)
      .subscribe(
        () => {
          this.load.dismiss();
          this.alertFinal();
          this.conteudoAlert.mensagem = "Deletado";
          this.conteudoAlert.titulo = "Deletado com sucesso"
        },
        (err) => {
          this._isExcluir = false;
          console.log(err);

          this._alertCtrl.create(
            {
              title: "Falha ao deletar a pergunta",
              subTitle: "Não foi possível deletar a pergunta, entre em contato com suporte.",
              buttons: [
                { text: 'OK' }
              ]
            }
          ).present();
          this.load.dismiss();
        }
      );
  }

  alertFinal() {
    let alert = this._alertCtrl.create({
      title: "Sucesso",
      subTitle: "Excluído com sucesso!",
      buttons: [
        {
          text: 'Fechar',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillLeave() {
    if (this._isExcluir) {
      this.navCtrl.getPrevious().data.idExcluirQuestion = this.pergunta._id;
    }
  }

  editar(){
    this.navCtrl.push(CadastroPerguntasPage.name, {
      usuarioSelecionado: this.pergunta
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarPerguntasPage');
  }

}
