import { Component ,OnInit} from '@angular/core';
import { CommonModule,Location} from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule ,Router, ActivatedRoute,NavigationEnd} from '@angular/router';
import { AccSummaryComponent } from '../acc-summary/acc-summary.component';
import { LoginComponent } from '../login/login.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
@Component({
  selector: 'app-acc1-detail1',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,],
  templateUrl: './acc1-detail1.component.html',
  styleUrl: './acc1-detail1.component.css',
  
})
export class Acc1Detail1Component implements OnInit  {
  public users:any;
 // accId=this.accSumary.getAccId();
  username=this.login.getUser();
  accountNumber!: number;
  accounts: any[]=[];
  curr: any[]=[];
  constructor(private http:HttpClient, private route: ActivatedRoute,private accSumary:AccSummaryComponent,private login:LoginComponent,private router: Router,private trhistory:TransactionHistoryComponent,private location:Location){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Disable browser back button by navigating back to the current route
        this.location.forward();
      }
    });
  }
  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.accountNumber = params['accId'];
      this.getAccSummary();
      this.getCurrency();
    });
  }; 
  
  accSummary(customerId:any)
  {
      this.router.navigate(['/accSummary',customerId]);
  }
  getAccSummary(){
    const apiUrl = 'http://localhost:3000/accounts';
    this.http.get(apiUrl, { params: {accId: this.accountNumber.toString() } })
      .subscribe(
        (response: any) => {
          this.accounts = Array.isArray(response) ? response : [response];
        },
        (error) => {
          console.error('Error loading accounts details:', error);
        }
      );
    // this.http.get('assets/users.json').subscribe((data:any) =>
    // {
    //     this.accounts=data.accounts;
    // }
    // );
  }
  transac()
  {
    this.router.navigate(['transaction',this.accountNumber]);
  }
  thistory()
  {
    this.router.navigate(['transactionHistory'],{ queryParams: { accId: this.accountNumber.toString()} });
  }
  getTransactions():void
  {
    //console.log(this.trhistory.transactions);
  }
  logout() 
  { localStorage.clear()
    this.router.navigate(['/login']);
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
}
