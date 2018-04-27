import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {UserService} from './shared/services/user.service';
import {AuthService} from './shared/services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AuthModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [UserService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
