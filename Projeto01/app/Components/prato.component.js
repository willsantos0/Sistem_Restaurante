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
var prato_service_1 = require("../Service/prato.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var PratoComponent = (function () {
    function PratoComponent(fb, _pratoService) {
        this.fb = fb;
        this._pratoService = _pratoService;
        this.indLoading = false;
        this.pesquisar = false;
        this.formErrors = {
            'nome': '',
            'preco': '',
            'restaurantefk': ''
        };
        this.validationMessages = {
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
    }
    PratoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalBtnTitle = "Salvar";
        this.pratoFrm = this.fb.group({
            id: [''],
            nome: ['', forms_1.Validators.required],
            preco: ['', forms_1.Validators.required],
            restaurantefk: ['', forms_1.Validators.required]
        });
        this.pratoFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.LoadPratos();
    };
    PratoComponent.prototype.onValueChanged = function (data) {
        if (!this.pratoFrm) {
            return;
        }
        var form = this.pratoFrm;
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
    PratoComponent.prototype.pesquisaLista = function () {
        this.pesquisar = true;
    };
    PratoComponent.prototype.LoadPratos = function () {
        var _this = this;
        this.indLoading = true;
        this._pratoService.get(global_1.Global.BASE_PRATO_ENDPOINT)
            .subscribe(function (pratos) { _this.pratos = pratos; _this.indLoading = false; });
        this._pratoService.get(global_1.Global.BASE_RESTAURANTE_ENDPOINT)
            .subscribe(function (restaurantes) { _this.restaurantes = restaurantes; _this.indLoading = false; });
    };
    PratoComponent.prototype.addPrato = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Adicionar Prato";
        this.modalBtnTitle = "Salvar";
        this.pratoFrm.reset();
        this.pesquisar = false;
        this.modal.open();
    };
    PratoComponent.prototype.editPrato = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Editar Prato";
        this.modalBtnTitle = "Atualizar";
        this.prato = this.pratos.filter(function (x) { return x.id == id; })[0];
        this.pratoFrm.patchValue({
            id: this.prato.id,
            nome: this.prato.nome,
            preco: this.prato.preco,
            restaurantefk: this.prato.restaurantefk
        });
        this.modal.open();
    };
    PratoComponent.prototype.deletePrato = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Deseja deletar?";
        this.modalBtnTitle = "Deletar";
        this.prato = this.pratos.filter(function (x) { return x.id == id; })[0];
        this.pratoFrm.patchValue({
            id: this.prato.id,
            nome: this.prato.nome,
            preco: this.prato.preco,
            restaurantefk: this.prato.restaurantefk
        });
        this.modal.open();
    };
    PratoComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._pratoService.post(global_1.Global.BASE_PRATO_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Prato Adicionado Com Sucesso.";
                        _this.LoadPratos();
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
                this._pratoService.put(global_1.Global.BASE_PRATO_ENDPOINT, formData._value.id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Prato Atualizado Com Sucesso.";
                        _this.LoadPratos();
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
                this._pratoService.delete(global_1.Global.BASE_PRATO_ENDPOINT, formData._value.id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Prato Deletado Com Sucesso.";
                        _this.LoadPratos();
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
    PratoComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.pratoFrm.enable() : this.pratoFrm.disable();
    };
    PratoComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    return PratoComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], PratoComponent.prototype, "modal", void 0);
PratoComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/prato.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, prato_service_1.PratoService])
], PratoComponent);
exports.PratoComponent = PratoComponent;
//# sourceMappingURL=prato.component.js.map