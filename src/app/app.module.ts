import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CommentsComponent } from './comments/comments.component';
import { RatesComponent } from './rates/rates.component';
import { NOTFOUNDComponent } from './notfound/notfound.component';
import { PlacesComponent } from './places/places.component';
import { WeekendComponent } from './weekend/weekend.component';
import { FilterPipe } from './filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionsComponent } from './options/options.component';
import { AppPasswordDirective } from './app-password.directive';///////sign i
import { JwPaginationComponent } from 'jw-angular-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    SingleCategoryComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    ReservationComponent,
    CommentsComponent,
    RatesComponent,
    NOTFOUNDComponent,
    PlacesComponent,
    WeekendComponent,
    FilterPipe,
    OptionsComponent,
    AppPasswordDirective,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, ////sign in
    CarouselModule ,
    BrowserAnimationsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
