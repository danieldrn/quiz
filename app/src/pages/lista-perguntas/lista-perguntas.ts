import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { VisualizarUsuarioPage } from '../visualizar-usuario/visualizar-usuario';
import { Pergunta } from '../../modules/pergunta';
import { CadastroPerguntasPage } from '../cadastro-perguntas/cadastro-perguntas';
import { VisualizarPerguntasPage } from '../visualizar-perguntas/visualizar-perguntas';

@IonicPage()
@Component({
  selector: 'page-lista-perguntas',
  templateUrl: 'lista-perguntas.html',
})
export class ListaPerguntasPage {

  perguntas: Pergunta[];
  http: HttpClient;
  load;
  alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _http: HttpClient, 
    private _loadCtr: LoadingController,
    private _alert: AlertController
  ) {

    this.http = _http;

    this.load = _loadCtr.create(
      { content: "Carregando..." }
    );

    this.load.present();

    this.alert = _alert.create(
      {
        title: "Falha na Conexão",
        subTitle: "Não foi possível carregar lista de perguntas",
        buttons: [
          { text: 'OK' }
        ]
      }
    );


  }

  ionViewDidLoad() {
    this.http.get<Pergunta[]>("http://localhost:3000/pergunta")
      .subscribe(
        (questions) => {
          this.perguntas = questions;
          this.load.dismiss();
        },
        (err: HttpErrorResponse) => {
          this.load.dismiss();
          this.alert.present();
        }
      );
  }

  avancarCadastroPergunta() {
    this.navCtrl.push(CadastroPerguntasPage.name)
  }

  seleciona(question: Usuario) {
    this.navCtrl.push(VisualizarPerguntasPage.name, {
      perguntaSelecionada: question
    });
  }

  ionViewWillEnter() {

    if (this.navParams.get('questionBack')) {
      var questionBack = this.navParams.get('questionBack');
      this.perguntas.push(questionBack);
      console.log('back');
    }

    if (this.navParams.get('idExcluirQuestion')) {
      var idExcluirQuestion = this.navParams.get('idExcluirQuestion');
      this.perguntas = this.perguntas.filter(function (obj) {
        return obj._id !== idExcluirQuestion;
      });
    }
  }
}
