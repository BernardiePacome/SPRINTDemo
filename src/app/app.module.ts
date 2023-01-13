import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
