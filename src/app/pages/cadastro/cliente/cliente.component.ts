import { Component, OnInit, Type } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { StringUtils } from 'src/app/string-utils';
import { Http, RequestOptions, Headers } from '@angular/http';
import { jsonpFactory } from '@angular/http/src/http_module';

@Component({
    selector: "app-cliente",
    templateUrl: "./cliente.component.html"
})

export class Cliente implements OnInit {

    listClient: any[] = [];
    clienteSelecionado: any = null;
    enderecoSelecionado: any = null;

    formulario: boolean = false;
    progressSpinner: boolean = false;
    enderecoFormulario: boolean = false;

    estadoTela: string = null;

    paginaAtualCliente: number = 1;
    paginaAtualEndereco: number = 1;

    msgInit: string = null;
    msgForm: string = null;
    isVisibleMsg: boolean = null;

    //********************** init methos Attributes ***********************/

    loadEnderecoByCep() {
        let endereco = undefined;
        this.progressSpinner = true;


        if (StringUtils.isEmpty(this.enderecoSelecionado.cep)) {
            this.enderecoSelecionado = new Object();
            this.progressSpinner = false;
            return;
        }

        this.http.get('https://viacep.com.br/ws/' + StringUtils.extraiNumeros(this.enderecoSelecionado.cep) + '/json')
            .subscribe(data => {

                endereco = data.json();

                if (endereco.ibge === undefined) {
                    this.progressSpinner = false;

                } else {
                    this.enderecoSelecionado.endereco = endereco.logradouro;
                    this.enderecoSelecionado.complemento = endereco.complemento;
                    this.enderecoSelecionado.bairro = endereco.bairro;
                    this.enderecoSelecionado.cidade = endereco.localidade;
                    this.enderecoSelecionado.estado = endereco.uf
                    this.progressSpinner = false;


                }

            }, error => {
                this.progressSpinner = false;
            });
    }

    private msgError(resp: string) {
        this.isVisibleMsg = true;
        this.msgForm = resp;
    }
    private msgErrorInit(resp: string) {
        this.isVisibleMsg = true;
        this.msgInit = resp;
    }
    private msgSucess(resp: string) {

        this.isVisibleMsg = true;
        this.msgInit = resp;
        setTimeout(() => {
            this.isVisibleMsg = false;
        }, 1500);
    }


    //********************** end methos Attributes ***********************/



    constructor(private http: Http) {

    }
    ngOnInit() {
        this.formulario = false;
        this.paginaAtualCliente = 1;
        this.isVisibleMsg = false;
        this.msgInit = "";
        this.loadClientAll();
    }


    //********************** init methos Process **********************/
    private loadClientAll() {
        this.http.get("http://localhost:8080/api/clientes").subscribe(data => {

            this.listClient = data.json();

        }, erro => {
        this.msgErrorInit(erro.message)
        })
    }

    public insertClient() {
        this.msgForm = "";
        this.formulario = true;
        this.estadoTela = "Adicionando";
        this.enderecoFormulario = false;
        this.clienteSelecionado = { id: null, enderecos: [] };

    }

    public editClient(resp: any) {
        this.msgForm = "";
        this.formulario = true;
        this.enderecoFormulario = false;
        this.estadoTela = "Editando";
        this.clienteSelecionado = resp;

    }

    public removeClient(resp: any) {

        if (confirm("Deseja realmente excluir o cliente selecionado?")) {

            const args = new RequestOptions();
            args.headers = new Headers();
            args.headers.append('Content-Type', 'application/json');

            this.http.put("http://localhost:8080/api/clientes", resp.id, args).subscribe(data => {
                this.loadClientAll();
            }, erro => {

            });
        }
    }

    public saveClient() {


        if (StringUtils.isEmpty(this.clienteSelecionado.name)) {
            this.msgError("Nome do Cliente não informado.");
            return;
        }

        if (StringUtils.isEmpty(this.clienteSelecionado.cpf)) {
            this.msgError("CPF do Cliente não informado.");
            return;
        }

        if (this.clienteSelecionado.cpf.length < 14) {
            this.msgError("CPF do Cliente inválido.");
            return;
        }

        if (this.clienteSelecionado.enderecos.length == 0) {
            this.msgError("Nenhum endereço informado para o cliente.");
            return;
        }




        this.http.post("http://localhost:8080/api/clientes", this.clienteSelecionado).subscribe(data => {
            if (data.json()) {

                let resp = this.clienteSelecionado.id != null;
                this.cancelClient();
                let msg = "";
                if (resp) {
                    msg = "Cliente Atualizado com Sucesso.";
                } else {
                    msg = "Cliente Adicionado com Sucesso.";
                }
                this.msgSucess(msg);
            } else {
                this.msgError("CPF já cadastrado anteriormente.")
            }


        }, erro => {
            this.msgError(erro.message);
        })
    }

    public cancelClient() {
        this.formulario = false;
        this.estadoTela = "Listagem";
        this.clienteSelecionado = null;
        this.msgInit = "";
        this.msgForm = "";
        this.isVisibleMsg = false;
        this.loadClientAll();
    }

    //****************** Endereco *********************/
    public insertEndereco() {
        this.enderecoFormulario = true;
        this.enderecoSelecionado = {};
    }
    public editEndereco(resp: any) {
        this.enderecoFormulario = true;
        this.enderecoSelecionado = resp;
    }
    public removeEndereco(resp: any) {
        if (confirm("Deseja realmente remover o endereço selecionado?")) {
            for (let i = 0; i < this.clienteSelecionado.enderecos.length; i++) {
                if (this.clienteSelecionado.enderecos[i].id === resp.id) {
                    this.clienteSelecionado.enderecos.splice(i, 1);
                    break;
                }
            }
        }
    }
    public confirmEndereco() {

        if (StringUtils.isEmpty(this.enderecoSelecionado.cep)) {
            this.msgError("CEP não informado.");
            return;
        }

        if (StringUtils.isEmpty(this.enderecoSelecionado.estado)) {
            this.msgError("Estado não informado.");
            return;
        }
        if (StringUtils.isEmpty(this.enderecoSelecionado.cidade)) {
            this.msgError("Cidade não informado.");
            return;
        }
        if (StringUtils.isEmpty(this.enderecoSelecionado.endereco)) {
            this.msgError("Endereço não informado.");
            return;
        }
        if (StringUtils.isEmpty(this.enderecoSelecionado.bairro)) {
            this.msgError("Bairro não informado.");
            return;
        }
        if (StringUtils.isEmpty(this.enderecoSelecionado.fone1)) {
            this.msgError("Fone1 não informado.");
            return;
        }

        if (this.enderecoSelecionado.fone1.length < 15 || (this.enderecoSelecionado.fone2 != null && this.enderecoSelecionado.fone2 != undefined && this.enderecoSelecionado.fone2.length < 15)) {
            this.msgError("Nº de telefone inválido.");
            return;
        }

        let resp = this.clienteSelecionado.enderecos.filter((e) => {
            return e.cep == this.enderecoSelecionado.cep;
        })

        if (resp.length > 0) {
            this.msgError("CEP ja informado anteriormente.");
            return;
        }

        this.clienteSelecionado.enderecos.push(this.enderecoSelecionado);
        this.cancelEndereco();

    }
    public cancelEndereco() {
        this.enderecoFormulario = false;
        this.enderecoSelecionado = null;
    }

    //********************** end methos Process **********************/



}