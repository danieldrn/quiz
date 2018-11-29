import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';
import { HttpClient } from '@angular/common/http';
import { Pergunta } from '../../modules/pergunta';
import { Resposta } from '../../modules/Resposta';

@IonicPage()
@Component({
  selector: 'page-cadastro-perguntas',
  templateUrl: 'cadastro-perguntas.html',
})
export class CadastroPerguntasPage {

  private orderForm;
  public respostas: Resposta[];
  public pergunta: Pergunta;
  public categoria: number;
  public descricao: string;
  public perguntaBackup: Pergunta;
  private error = { condicao: false, message: '' };
  private success = { condicao: false, message: '' };

  //melhorar

  public condicao1: boolean;
  public descricao1: string;
  public label1: string;
  public condicao2: boolean;
  public descricao2: string;
  public label2: string;
  public condicao3: boolean;
  public descricao3: string;
  public label3: string;
  public condicao4: boolean;
  public descricao4: string;
  public label4: string;
  public condicao5: boolean;
  public descricao5: string;
  public label5: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient) {

    this.pergunta = new Pergunta();
    if (this.navParams.get('perguntaSelecionada')) {
      this.pergunta = this.navParams.get('perguntaSelecionada');
      this.descricao = this.pergunta.pergunta;
      this.categoria = this.pergunta.categoria;
      let resp = this.pergunta.respostas;

      this.condicao1 = resp[0].condicao;
      this.descricao1 = resp[0].descricao;
      this.label1 = resp[0].label;
      this.condicao2 = resp[1].condicao;
      this.descricao2 = resp[1].descricao;
      this.label2 = resp[1].label;
      this.condicao3 = resp[2].condicao;
      this.descricao3 = resp[2].descricao;
      this.label3 = resp[2].label;
      this.condicao4 = resp[3].condicao;
      this.descricao4 = resp[3].descricao;
      this.label4 = resp[3].label;
      this.condicao5 = resp[4].condicao;
      this.descricao5 = resp[4].descricao;
      this.label5 = resp[4].label;

      
    }
  }

  verficaSalvarEditar() {
    this.pergunta.pergunta = this.descricao;
    this.pergunta.categoria = this.categoria;
    this.error.condicao = false;
    this.validarDados();

    if (!this.error.condicao) {
      this.pergunta = this.pergunta;

      if (this.pergunta._id) {
        this.editar();
      }
      else {
        this.salvar();
      }
    }
  }

  validarDados() {
    if (!this.pergunta.pergunta) {
      this.error.condicao = true;
      this.error.message = "Pergunta, campo obrigatório!";
    }

    if (!this.pergunta.categoria) {
      this.error.condicao = true;
      this.error.message = "Categoria, campo obrigatório!";
    }

  }

  salvar() {
    this.http.post("http://localhost:3000/pergunta",
      this.pergunta
    ).subscribe(() => {
      this.error.condicao = false;
      this.error.message = '';
      this.success.condicao = true;
      this.success.message = "Criado com sucesso"
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
    });
  }

  ionViewWillLeave() {
    this.navCtrl.getPrevious().data.questionBack = this.pergunta;
  }

  editar() {
    this.http.put("http://localhost:3000/pergunta/" + this.pergunta._id,
      this.pergunta
    ).subscribe(res => {
      console.log(res);
      this.error.condicao = false;
      this.error.message = '';
      this.success.condicao = true;
      this.success.message = "Criado com sucesso"
      this.pergunta = new Pergunta();

    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPerguntasPage');
  }

}
