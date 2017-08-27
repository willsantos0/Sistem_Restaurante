import { Component } from "@angular/core";
import { RestauranteComponent } from './components/restaurante.component';
import { PratoComponent } from './components/prato.component';
@Component({
    selector: "restaurante-app", 
    template: `
               <div>
                  <nav class='navbar navbar-default' id='borda'>
                       <div class='container-fluid'>
                         <ul class='nav navbar-nav'>
                           <li><a [routerLink]="['home']">Home</a></li>
                           <li><a [routerLink]="['restaurante']">Restaurante</a></li>
                           <li><a [routerLink]="['prato']">Pratos</a></li>
                      </ul>
                      </div>
                 </nav>    
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
`
})

export class AppComponent {

}