import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesModule } from './modules/jokes/jokes.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NotificationService } from './modules/jokes/components/menu-notification-bar/menu-notification.service';
import { NotificationBarComponent } from './modules/jokes/components/menu-notification-bar/notification-bar.component';

@NgModule({
  declarations: [
    AppComponent,NotificationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JokesModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
