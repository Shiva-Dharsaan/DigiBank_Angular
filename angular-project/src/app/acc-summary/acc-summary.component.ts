import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { RouterModule, Routes,Router, ActivatedRoute,NavigationEnd} from '@angular/router';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-acc-summary',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    RouterModule,
    LoginComponent
  ],
  templateUrl: './acc-summary.component.html',
  styleUrl: './acc-summary.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class AccSummaryComponent implements OnInit {
  //ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  //}
  static accId:any;
  public users:any;
  accounts:any[]=[];
  curr:any[]=[];
  username=this.login.getUser();
  userId!: number;
  bankAccounts: any[] = [];
  constructor(private http:HttpClient,private router: Router,private route: ActivatedRoute,private login:LoginComponent,private location:Location){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Disable browser back button by navigating back to the current route
        this.location.forward();
      }
    });
  }
  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getAccSummary();
      this.getCurrency();
    });
  }; 

  getAccSummary(){
    const apiUrl = 'http://localhost:3000/accounts';
    this.http.get(apiUrl, { params: { customerId: this.userId.toString() } })
      .subscribe(
        (response: any) => {
          this.bankAccounts = Array.isArray(response) ? response : [response];
        },
        (error) => {
          console.error('Error loading bank accounts:', error);
        }
      );
  
  }
  getCurrency(){
    const apiUrl = 'http://localhost:3000/Currency';
    this.http.get(apiUrl)
      .subscribe(
        (response: any) => {
          this.curr = Array.isArray(response) ? response : [response];
        },
        (error) => {
          console.error('Error loading bank accounts:', error);
        }
      );
  
  }

  getAccId():String
  {
    return AccSummaryComponent.accId;
  }
  gotoAccountDetails(accId:any)
  {
     AccSummaryComponent.accId=accId
    // console.log(AccSummaryComponent.accId);
     this.router.navigate(['acc1Detail1',accId]);
  }
  logout()
  { localStorage.clear();
    this.router.navigate(['login']);
  }
  
}