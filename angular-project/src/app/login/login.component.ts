import { Component ,Injectable,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule, Routes,Router} from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  status: String ='';
  message: String ='';
  private static currentUsername: string = '';

  setCurrentUsername(username: string): void {
    LoginComponent.currentUsername = username;
  }

  
  constructor(private http:HttpClient,private router: Router){
  }
  ngOnInit(): void {
    
  }
  
  
  CheckLogin() :any{
    if (!this.username || !this.password) {
      
      alert('Enter UserName and Password');
      this.status='Enter Details';
    }
    else{
  //  this.http.get('assets/users.json').subscribe((data: any) => {
     // this.setCurrentUsername(this.username);
      //console.log(LoginComponent.currentUsername);
      const apiUrl = 'http://localhost:3000/user';
    this.http.get(apiUrl, { params: { username: this.username} })
      .subscribe((users: any) => {
        const user = users[0];
      //const user = data.user.find((u: any) => u.username === this.username && u.password === this.password);
      if(user)
      {
      if (user.password==this.password) {
        
        this.message = 'Login successful!';
      // alert('Login successful!');
        if(this.message==='Login successful!')
        { 
          this.router.navigate(['/accSummary',user.id]);
        }
        console.log(user.password);
      }
       else if(user.password!=this.password) 
        {
           this.status = 'Invalid  password!!!';
         //alert('Invalid  password.');
         }
        }
       else {
        this.status = 'No such user name!!!';
        //alert('No such username');
      }
      return this.username;
    });
  }
    
  }
  getUser():String
  {
    if(LoginComponent.currentUsername)
    {
    //console.log(this);
    console.log('ff');
    return LoginComponent.currentUsername;
    }
    else 
    return 'null';
  }
  
  close(): void {
    this.status = '';
    this.onButtonClick();
    console.log(this.status);
  }
  onButtonClick(): void {
    window.location.reload();
  }
}