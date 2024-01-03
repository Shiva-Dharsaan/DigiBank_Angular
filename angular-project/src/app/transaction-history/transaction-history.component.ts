import { ChangeDetectorRef, Component, Injectable, ViewChild } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Transactions } from '../transactions';
import { HttpClient } from '@angular/common/http';
import { AccSummaryComponent } from '../acc-summary/acc-summary.component';
import { ActivatedRoute, Router ,NavigationEnd} from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule,FormsModule,MatPaginatorModule,MatSortModule,MatTableModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',

})
@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryComponent {
   
   filter:string="all";
   filter2:string="all";
   accId:any;
   currentDate: Date = new Date();
   randomNumber = Math.floor(Math.random() * 100000);
   transactions:Transactions[]=[];
   transactions2:Transactions[]=[];
   currentPage = 1;
  itemsPerPage = 5;
  bb:any[]=[];
  // Method to change the current page

   constructor(private router: Router,private route: ActivatedRoute, private http:HttpClient,private accSumary:AccSummaryComponent,private cdr: ChangeDetectorRef,private location:Location){
    this.route.queryParams.subscribe(params => {
      this.accId = params['accId'];
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Disable browser back button by navigating back to the current route
          this.location.forward();
        }
      });
  
  });
}
 
displayedColumns: any[] = ['tranid', 'date', 'amount', 'description', 'accId', 'name', 'balance', 'recepientName', 'raccId'];

@ViewChild(MatPaginator) paginator!: MatPaginator;

// ...
@ViewChild(MatSort) sort!: MatSort ;
dataSource = new MatTableDataSource(this.transactions2);
// ...
  // Inside ngOnInit or after fetching data
 
   ngOnInit(): void {
      console.log('Transactions:', this.transactions);
      const apiUrl2 = 'http://localhost:3000/transactions';
  this.http.get(apiUrl2 ,{ params: { accId: this.accId.toString() } })
    .subscribe(
      (response: any) => {
        this.transactions2 = Array.isArray(response) ? response : [response];
        console.log('Get request successful', response);
        this.setupPaginator();
        
      },
      (error) => {
        console.error('Error loading accounts details:', error);
      }
    );
    const apiUrl = 'http://localhost:3000/accounts';
    this.http.get(apiUrl, { params: {accId: this.accId.toString() } })
      .subscribe(
        (response: any) => {
          this.bb = Array.isArray(response) ? response : [response];
        },
        (error) => {
          console.error('Error loading accounts details:', error);
        }
      );
    
    console.log(this.accId);
    //this.setupPaginator();
    }
    setupPaginator() {
      this.dataSource.data = this.transactions2;  // Update data source
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.paginator);
    }
   newTransaction(amount: string, description: string, accId: number, name: string,balance:number,rName:string,raccId:number):void {
    const newTransaction = new Transactions(this.randomNumber.toString(), this.currentDate, amount, description, accId, name,balance,rName,raccId);
    this.transactions.push(newTransaction);
    console.log(this.transactions);
    const transactionsJsonString = JSON.stringify(this.transactions);
    const apiUrl = 'http://localhost:3000/transactions';
    this.http.post(apiUrl, this.transactions[this.transactions.length-1] )
  .subscribe(
    response => {
      console.log('POST request successful', response);
    },
    error => {
      console.error('POST request failed', error);
    }
  );
  }
  // filterData(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  applyFilter() {
    // Apply filter logic based on the selected filter option
    if (this.filter === 'Debited') {
      this.dataSource.data =  this.dataSource.data.filter((transaction) => transaction.description === 'Debited');
    } else if (this.filter === 'Credited') {
      this.dataSource.data =  this.dataSource.data.filter((transaction) => transaction.description === 'Credited');
    } else {
      // If 'all' or any other option selected, reload all transactions
      this.ngOnInit();
    }
    console.log('Filter 1:', this.filter);
    console.log(this.transactions2);
    this.cdr.detectChanges();
  }
  applyFilter2() {
    // Apply filter logic based on the selected filter option
    if (this.filter2 === 'Sowmya') {
      this.dataSource.data =  this.dataSource.data.filter((transaction) => transaction.recepientName === 'Sowmya');
    } else if (this.filter2 === 'Sathiya') {
      this.dataSource.data=  this.dataSource.data.filter((transaction) => transaction.recepientName === 'Sathiya');
    }
    else if (this.filter2 === 'Shiva') {
      this.dataSource.data=  this.dataSource.data.filter((transaction) => transaction.recepientName === 'Shiva');
    }
    else {
      // If 'all' or any other option selected, reload all transactions
      this.ngOnInit();
    }
    console.log(this.transactions2);
    console.log('Filter 2:', this.filter2);
    this.cdr.detectChanges();
  }
  logout()
    { localStorage.clear();
      this.router.navigate(['/login']);
    }
      
    
    accDetails(accId:any)
    {
      this.router.navigate(['acc1Detail1',accId]);
    }
} 
