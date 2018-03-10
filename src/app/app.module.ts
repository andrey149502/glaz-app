import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { LocaleService } from './locale.service';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [LocaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
