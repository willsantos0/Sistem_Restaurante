import { Component, OnInit, ViewChild } from '@angular/core';
import { RestauranteService } from '../Service/restaurante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRestaurante } from '../Models/restaurante';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/restaurante.component.html'
})

export class RestauranteComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    restaurantes: IRestaurante[];
    restaurante: IRestaurante;
    msg: string;
    indLoading: boolean = false;
    restauranteFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    searchTitle: "Procurar...";
    pesquisar: boolean = false;

    constructor(private fb: FormBuilder, private _restauranteService: RestauranteService) { }

    ngOnInit(): void {
        this.modalBtnTitle = "Salvar";
        this.pesquisar = false;

        this.restauranteFrm = this.fb.group({
            id: [''],
            nome: ['', Validators.required],
        });
        this.restauranteFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();

        this.LoadRestaurantes();
    }

    onValueChanged(data?: any) {

        if (!this.restauranteFrm) { return; }
        const form = this.restauranteFrm;

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
        'nome': ''
       
    };

    validationMessages = {
        'nome': {
            'maxlength': 'Nome do Restaurante com no máximo 100 caracteres.',
            'required': 'Nome é obrigatório.'
        }
    };

    LoadRestaurantes(): void {
        this.indLoading = true;
        this._restauranteService.get(Global.BASE_RESTAURANTE_ENDPOINT)
            .subscribe(restaurantes => { this.restaurantes = restaurantes; this.indLoading = false; }
            //,error => this.msg = <any>error
            );
    }

    pesquisaLista() {
        this.pesquisar = true;
    }

    addRestaurante() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Restaurante";
        this.modalBtnTitle = "Salvar";
        this.restauranteFrm.reset();
        this.pesquisar = false;
        this.modal.open();

    }

    editRestaurante(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar Restaurante";
        this.modalBtnTitle = "Atualizar";
        this.restaurante = this.restaurantes.filter(x => x.id == id)[0];
        this.restauranteFrm.patchValue({
            id: this.restaurante.id,
            nome: this.restaurante.nome
        }); 
        this.modal.open();
       
    }

    deleteRestaurante(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Deseja deletar?";
        this.modalBtnTitle = "Deletar";
        this.restaurante = this.restaurantes.filter(x => x.id == id)[0];
        this.restauranteFrm.patchValue({
            id: this.restaurante.id,
            nome: this.restaurante.nome
        }); 
        this.modal.open();

    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._restauranteService.post(Global.BASE_RESTAURANTE_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Restaurante Adicionado Com Sucesso.";
                            this.LoadRestaurantes();
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
                this._restauranteService.put(Global.BASE_RESTAURANTE_ENDPOINT, formData._value.id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Restaurante Atualizado Com Sucesso.";
                            this.LoadRestaurantes();
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
                this._restauranteService.delete(Global.BASE_RESTAURANTE_ENDPOINT, formData._value.id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Restaurante Deletado Com Sucesso.";
                            this.LoadRestaurantes();
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
        isEnable ? this.restauranteFrm.enable() : this.restauranteFrm.disable();
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;

    }

}