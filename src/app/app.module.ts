import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { PdfMakesComponent } from './pdf-makes/pdf-makes.component';
import { TestComponent } from './test/test.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NewDComponent } from './new-d/new-d.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
                              
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#ffffff',
  pbColor: 'red',
  bgsColor: 'red',
  fgsColor: 'red',
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent,
    PdfMakesComponent,
    TestComponent,
    NewDComponent,

    ],
  imports: [
    BrowserModule,
    // MatInput,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatInputModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTreeModule,
    DragDropModule,
    MatGridListModule,
    MatMenuModule,
  ],
  providers: [HttpClientModule , {provide: HTTP_INTERCEPTORS , useClass: TokenInterceptorInterceptor  , multi : true}],
  bootstrap: [AppComponent],
  
 
})
export class AppModule {}
