import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth-guard.service';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { TypeaheadModule } from 'ngx-bootstrap';

import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TreeviewModule } from 'ngx-treeview';
import {DropdownModule} from "ngx-dropdown";
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AddpostComponent } from './addpost/addpost.component';
import { AddblogComponent } from './addblog/addblog.component';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { UsersinglepostComponent } from './usersinglepost/usersinglepost.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AddpostComponent,
    AddblogComponent,
    AllblogsComponent,    
    UserPostsComponent, SinglepostComponent, UsersinglepostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    TypeaheadModule.forRoot(),
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TreeviewModule.forRoot(),
    DropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
     },
     {
       path:'register',
       component: RegisterComponent
     },
     {
      path:'addpost',
      component: AddpostComponent
    },
    {
      path:'addblog', 
      component: AddblogComponent
    },
    {
      path:'', 
      component: AllblogsComponent
    },
    {
      path:'dashboard/userposts', 
      component: UserPostsComponent
    },
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    {
      path:'singlepost', 
      component: SinglepostComponent
    },
    {
      path:'singlepost', 
      component: SinglepostComponent
    },
    {
      path:'dashboard/usersinglepost', 
      component: UsersinglepostComponent
    },
     

    ])
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [HttpClient, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }

