"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var restaurante_service_1 = require("../Service/restaurante.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var RestauranteComponent = (function () {
    function RestauranteComponent(fb, _restauranteService) {
        this.fb = fb;
        this._restauranteService = _restauranteService;
        this.indLoading = false;
        this.pesquisar = false;
        this.formErrors = {
            'nome': ''
        };
        this.validationMessages = {
            'nome': {
                'maxlength': 'Nome do Restaurante com no máximo 100 caracteres.',
                'required': 'Nome é obrigatório.'
            }
        };
    }
    RestauranteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalBtnTitle = "Salvar";
        this.pesquisar = false;
        this.restauranteFrm = this.fb.group({
            id: [''],
            nome: ['', forms_1.Validators.required],
        });
        this.restauranteFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.LoadRestaurantes();
    };
    RestauranteComponent.prototype.onValueChanged = function (data) {
        if (!this.restauranteFrm) {
            return;
        }
        var form = this.restauranteFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    RestauranteComponent.prototype.LoadRestaurantes = function () {
        var _this = this;
        this.indLoading = true;
        this._restauranteService.get(global_1.Global.BASE_RESTAURANTE_ENDPOINT)
            .subscribe(function (restaurantes) { _this.restaurantes = restaurantes; _this.indLoading = false; }
        //,error => this.msg = <any>error
        );
    };
    RestauranteComponent.prototype.pesquisaLista = function () {
        this.pesquisar = true;
    };
    RestauranteComponent.prototype.addRestaurante = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Restaurante";
        this.modalBtnTitle = "Salvar";
        this.restauranteFrm.reset();
        this.pesquisar = false;
        this.modal.open();
    };
    RestauranteComponent.prototype.editRestaurante = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar Restaurante";
        this.modalBtnTitle = "Atualizar";
        this.restaurante = this.restaurantes.filter(function (x) { return x.id == id; })[0];
        this.restauranteFrm.patchValue({
            id: this.restaurante.id,
            nome: this.restaurante.nome
        });
        this.modal.open();
    };
    RestauranteComponent.prototype.deleteRestaurante = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Deseja deletar?";
        this.modalBtnTitle = "Deletar";
        this.restaurante = this.restaurantes.filter(function (x) { return x.id == id; })[0];
        this.restauranteFrm.patchValue({
            id: this.restaurante.id,
            nome: this.restaurante.nome
        });
        this.modal.open();
    };
    RestauranteComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._restauranteService.post(global_1.Global.BASE_RESTAURANTE_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Restaurante Adicionado Com Sucesso.";
                        _this.LoadRestaurantes();
                    }
                    else {
                        _this.msg = "Erro ao Salvar!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                this.modal.dismiss();
                break;
            case enum_1.DBOperation.update:
                this._restauranteService.put(global_1.Global.BASE_RESTAURANTE_ENDPOINT, formData._value.id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Restaurante Atualizado Com Sucesso.";
                        _this.LoadRestaurantes();
                    }
                    else {
                        _this.msg = "Erro ao Atualizar!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                this.modal.dismiss();
                break;
            case enum_1.DBOperation.delete:
                this._restauranteService.delete(global_1.Global.BASE_RESTAURANTE_ENDPOINT, formData._value.id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Restaurante Deletado Com Sucesso.";
                        _this.LoadRestaurantes();
                    }
                    else {
                        _this.msg = "Erro ao Deletar";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                this.modal.dismiss();
                break;
        }
    };
    RestauranteComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.restauranteFrm.enable() : this.restauranteFrm.disable();
    };
    RestauranteComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    return RestauranteComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], RestauranteComponent.prototype, "modal", void 0);
RestauranteComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/restaurante.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, restaurante_service_1.RestauranteService])
], RestauranteComponent);
exports.RestauranteComponent = RestauranteComponent;
//# sourceMappingURL=restaurante.component.js.map