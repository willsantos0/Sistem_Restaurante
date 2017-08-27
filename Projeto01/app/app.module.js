"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var home_component_1 = require("./components/home.component");
var restaurante_service_1 = require("./Service/restaurante.service");
var restaurante_component_1 = require("./components/restaurante.component");
var prato_service_1 = require("./Service/prato.service");
var prato_component_1 = require("./components/prato.component");
var restaurante_pipe_1 = require("./filter/restaurante.pipe");
var prato_pipe_1 = require("./filter/prato.pipe");
var search_component_1 = require("./Shared/search.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule, forms_1.FormsModule],
        declarations: [app_component_1.AppComponent, restaurante_component_1.RestauranteComponent, prato_component_1.PratoComponent, home_component_1.HomeComponent, restaurante_pipe_1.RestauranteFilterPipe, prato_pipe_1.PratoFilterPipe, search_component_1.SearchComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, restaurante_service_1.RestauranteService, prato_service_1.PratoService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map