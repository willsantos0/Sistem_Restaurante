import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { RestauranteService } from './Service/restaurante.service'
import { RestauranteComponent } from './components/restaurante.component';
import { PratoService } from './Service/prato.service';
import { PratoComponent } from './components/prato.component';
import { RestauranteFilterPipe } from './filter/restaurante.pipe';
import { PratoFilterPipe } from './filter/prato.pipe';
import { SearchComponent } from './Shared/search.component';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule],
    declarations: [AppComponent, RestauranteComponent, PratoComponent, HomeComponent, RestauranteFilterPipe, PratoFilterPipe, SearchComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, RestauranteService, PratoService],
    bootstrap: [AppComponent]
})

export class AppModule { }