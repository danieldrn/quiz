import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../modules/usuario';
import { HttpClient } from '@angular/common/http';
import { Pergunta } from '../../modules/pergunta';

@IonicPage()
@Component({
  selector: 'page-cadastro-perguntas',
  templateUrl: 'cadastro-perguntas.html',
})
export class CadastroPerguntasPage {

  private orderForm;
  public pergunta: Pergunta;
  public perguntaBackup: Pergunta;
  private senha: string;
  private senha_confirma: string;
  private error = { condicao: false, message: '' };
  private success = { condicao: false, message: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient) {

    this.pergunta = new Pergunta();
    if (this.navParams.get('perguntaSelecionada')) {
      this.pergunta = this.navParams.get('perguntaSelecionada');
    }
  }

  verficaSalvarEditar() {
    this.error.condicao = false;
    this.validarDados();

    if (!this.error.condicao) {
      this.pergunta = this.pergunta;

      if (this.pergunta.id) {
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

  editar(){
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
