import { Component, OnInit, ViewChild } from '@angular/core';
import { PratoService } from '../Service/prato.service';
import { RestauranteService } from '../Service/restaurante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPrato } from '../Models/prato';
import { IRestaurante } from '../Models/restaurante';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/prato.component.html'
})

export class PratoComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    pratos: IPrato[];
    restaurantes: IRestaurante[];
    restaurante: IRestaurante;
    prato: IPrato;
    msg: string;
    indLoading: boolean = false;
    pratoFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: "Procurar...";
    pesquisar: boolean = false;

    constructor(private fb: FormBuilder, private _pratoService: PratoService) { }
    
    ngOnInit(): void {
        this.modalBtnTitle = "Salvar";

        this.pratoFrm = this.fb.group({
            id: [''],
            nome: ['', Validators.required],
            preco: ['', Validators.required],
            restaurantefk: ['', Validators.required]
        });
           this.pratoFrm.valueChanges.subscribe(data => this.onValueChanged(data));
          this.onValueChanged();

        this.LoadPratos();
    }

    onValueChanged(data?: any) {

        if (!this.pratoFrm) { return; }
        const form = this.pratoFrm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'nome': '',
        'preco': '',
        'restaurantefk': ''
    };

    validationMessages = {
        'nome': {
            'maxlength': 'Nome do prato com no máximo de 100 caracteres.',
            'required': 'Nome do prato é obrigatório.'
        },
        'preco': {
            'required': 'Preço é obrigatório.'
        },
        'restaurantefk': {
            'required': 'Restaurante é obrigatório.'
        }
    };

    pesquisaLista() {
        this.pesquisar = true;
    }

    LoadPratos(): void {
        this.indLoading = true;
        this._pratoService.get(Global.BASE_PRATO_ENDPOINT)
            .subscribe(pratos => { this.pratos = pratos; this.indLoading = false; });

        this._pratoService.get(Global.BASE_RESTAURANTE_ENDPOINT)
            .subscribe(restaurantes => { this.restaurantes = restaurantes; this.indLoading = false; });
            
    }

    addPrato() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Prato";
        this.modalBtnTitle = "Salvar";
        this.pratoFrm.reset();
        this.pesquisar = false;
        this.modal.open();

    }

    editPrato(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar Prato";
        this.modalBtnTitle = "Atualizar";
        this.prato = this.pratos.filter(x => x.id == id)[0];
        this.pratoFrm.patchValue({
            id: this.prato.id,
            nome: this.prato.nome,
            preco: this.prato.preco,
            restaurantefk: this.prato.restaurantefk
        });
        this.modal.open();

    }

    deletePrato(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Deseja deletar?";
        this.modalBtnTitle = "Deletar";
        this.prato = this.pratos.filter(x => x.id == id)[0];
        this.pratoFrm.patchValue({
            id: this.prato.id,
            nome: this.prato.nome,
            preco: this.prato.preco,
            restaurantefk: this.prato.restaurantefk
        });
        this.modal.open();

    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._pratoService.post(Global.BASE_PRATO_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Prato Adicionado Com Sucesso.";
                            this.LoadPratos();
                        }
                        else {
                            this.msg = "Erro ao Salvar!"
                        }

                    },
                    error => {
                        this.msg = error;
                    }
                );
                this.modal.dismiss();

                break;
            case DBOperation.update:
                this._pratoService.put(Global.BASE_PRATO_ENDPOINT, formData._value.id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Prato Atualizado Com Sucesso.";
                            this.LoadPratos();
                        }
                        else {
                            this.msg = "Erro ao Atualizar!"
                        }

                    },
                    error => {
                        this.msg = error;
                    }
                );
                this.modal.dismiss();

                break;
            case DBOperation.delete:
                this._pratoService.delete(Global.BASE_PRATO_ENDPOINT, formData._value.id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Prato Deletado Com Sucesso.";
                            this.LoadPratos();
                        }
                        else {
                            this.msg = "Erro ao Deletar"
                        }

                    },
                    error => {
                        this.msg = error;
                    }
                );
                this.modal.dismiss();

                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.pratoFrm.enable() : this.pratoFrm.disable();
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;

    }

 
}