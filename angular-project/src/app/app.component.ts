import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AccSummaryComponent } from "./acc-summary/acc-summary.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet,
        HttpClientModule, LoginComponent, RouterModule, AccSummaryComponent,NgxPaginationModule,MatTableModule,MatPaginatorModule,MatSortModule]
})
export class AppComponent {
  title = 'angular-project';
}