import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule, Routes,Router} from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http:HttpClient,private router: Router){
  }
  goToLogin()
  {
    this.router.navigate(['/login']);
  }
}