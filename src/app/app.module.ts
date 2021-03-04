import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { Common } from './libs';
import { NgnModule } from './ngn/ngn.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // ServiceWorkerModule.register(site_url + '../angular/dist/ngsw-worker.js', { enabled: production }),
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        routing,
        NgnModule,
    ],
    providers: [Common],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

