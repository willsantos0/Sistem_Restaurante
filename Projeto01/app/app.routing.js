"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var restaurante_component_1 = require("./components/restaurante.component");
var prato_component_1 = require("./components/prato.component");
var home_component_1 = require("./components/home.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'restaurante', component: restaurante_component_1.RestauranteComponent },
    { path: 'prato', component: prato_component_1.PratoComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map