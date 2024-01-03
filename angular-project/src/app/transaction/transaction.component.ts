import { Component,OnInit } from '@angular/core';
import { CommonModule, NgForOf ,Location} from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router,RouterLink ,ActivatedRoute,NavigationEnd} from '@angular/router';
import { AccSummaryComponent } from '../acc-summary/acc-summary.component';
import { LoginComponent } from '../login/login.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { Transactions } from '../transactions';
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
 
 
  recipientName: string = '';
  ifscCode: string = '';
  recipientAccount: string = '';
  transferAmount: string = '';
  transferSuccess: boolean = false;
  transferSuccessMessage: string = '';
  senderAccountNumber: any;
  accountDetails: any[] = [];
  accountDetails2: any[] = [];
  balance: number=0;
  accType:string='';
  accBalance:string='';
  senderAccount :any;
  recepientAcc:any;
  apiUrl:any;
  scrollAccounts:any[]=[];
  curr:any[]=[];
  static accid:string='';
  message:string='';
  constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient,private tranhistory:TransactionHistoryComponent,private location:Location) {
      this.route.params.subscribe((params) => {
      this.senderAccountNumber = params['accId'];
      this.getAccDetails();
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Disable browser back button by navigating back to the current route
          this.location.forward();
        }
      });
  });
}
ngOnInit(){
  
    this.getCurrency();
  
}; 
   getAccDetails()
   {
    this.apiUrl = 'http://localhost:3000/accounts';
    this.http.get(this.apiUrl, { params: { accId: this.senderAccountNumber } })
    .subscribe((response: any) => {
      this.accountDetails = Array.isArray(response) ? response : [response];
      this.senderAccount = this.accountDetails[0];
      TransactionComponent.accid=this.senderAccountNumber;
    } );}
   
  transferFund() {
    // Assuming your API endpoint for fetching account details is correct
    
 
    // Fetch account details for the sender account
   
       console.log(this.senderAccountNumber+'sd');
       console.log(this.accountDetails+'ss');
        // Check if the sender has sufficient funds for the transfer
        console.log(this.senderAccount.balance >'1000000')
        if (this.transferAmount >'1000000') {
          console.error('Payment limit exceeded');
         // alert('Insufficient funds for the transfer.');  
          this.message='Payment limit exceeded'
          return;
        }
        if (this.senderAccount.balance < this.transferAmount) {
          console.error('Insufficient funds for the transfer.');
          //alert('Insufficient funds for the transfer.');  
          this.message='Insuffient funds'
          return;
        }
        
        
 
        // Deduct the transfer amount from the sender's balance
        this.senderAccount.balance -= Number(this.transferAmount);
        //alert('Transaction success:)');
        this.message='Transfer Successfull :)'
          
        console.log(this.senderAccount.id);
      
        this.http.put(this.apiUrl + `/${this.senderAccount.accId}`, this.senderAccount)
        .subscribe(() => {
          console.log(this.senderAccount.id+' sa');
          console.log('Sender balance updated in the database.');});
          console.log(this.recipientAccount);
          console.log(this.apiUrl);
          
          this.http.get(this.apiUrl, { params: { accId: this.recipientAccount } })
  .subscribe(
    (response: any) => {
      console.log('API Response:', response);

      this.accountDetails2 = Array.isArray(response) ? response : [response];
      this.recepientAcc = this.accountDetails2[0];

      console.log('Recipient Account Details:', this.recepientAcc);
     
      // Continue with the rest of your logic here
      this.recepientAcc.balance=Number(this.recepientAcc.balance )+Number(this.transferAmount);
      this.tranhistory.newTransaction(this.transferAmount,'Debited',this.senderAccount.accId,this.senderAccount.cardHolderName,this.senderAccount.balance,this.recepientAcc.cardHolderName,this.recepientAcc.accId);
      this.http.put(this.apiUrl + `/${this.recepientAcc.accId}`, this.recepientAcc)
    .subscribe(() => {
      console.log(this.recepientAcc.accId+' ra');
      console.log('Sender balance updated in the database.');
      this.tranhistory.newTransaction(this.transferAmount,'Credited',this.recepientAcc.accId,this.recepientAcc.cardHolderName,this.recepientAcc.balance,this.senderAccount.cardHolderName,this.senderAccount.accId);
     
      // Reset form values
      this.recipientName = '';
      this.recipientAccount = '';
      this.ifscCode = '';
      this.transferAmount = '0';

      // Set transfer success flag and message
      this.transferSuccess = true;
      this.transferSuccessMessage = this.recipientAccount+' has been Transfered ';
    //  this.router.navigate(['/account-details', senderAccount.accountNumber]);
      // You can also navigate to the account details page if needed

    },
    (error) => {
      console.error('Error fetching recipient account details:', error);
    }
           
       
  
  );
  });
        
        }

    logout()
    { localStorage.clear();
      this.router.navigate(['/login']);
    }
    accDetails(accId:any)
    {
      this.router.navigate(['acc1Detail1',accId]);
    }
    accSummary(customerId:any)
    {
      this.router.navigate(['/accSummary',customerId]);
    }
    loadRecipientAccounts() {
      const apiUrl = 'http://localhost:3000/accounts';
      this.http.get(apiUrl)
        .subscribe(
          (response: any) => {
            this.scrollAccounts = Array.isArray(response) ? response : [response];
            this.scrollAccounts =response.filter((accounts: {
              accountType: string; 
      })=> accounts.accountType!=='Fixed Deposit');
          },
          (error) => {
            console.error('Error loading accounts details:', error);
          }
        );
        this.ifscCode=this.scrollAccounts[Number(this.recipientAccount)-1].IFSC;
        this.recipientName=this.scrollAccounts[Number(this.recipientAccount)-1].cardHolderName;
        
  }
  thistory()
  {
    console.log(TransactionComponent.accid);
    this.router.navigate(['transactionHistory'],{queryParams: { accId: TransactionComponent.accid} });
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
  
//   recipientName: string = '';
//   ifscCode: string = '';
//   recipientAccount: number=0;
//   transferAmount: number = 0;
//   accounts:any[]=[];
//   accId=this.accSumary.getAccId();
//   username=this.login.getUser();
//   constructor(private http:HttpClient,private router: Router,private accSumary:AccSummaryComponent,private login:LoginComponent){
//   }
//   ngOnInit(){
//     this.getAccSummary();
//     console.log('kk');
//   }; 

//   getAccSummary(){

//     this.http.get('assets/users.json').subscribe((data:any) =>
//     {
//         this.accounts=data.accounts;
//         if (this.accounts.length > 0) {
//           this.accounts[0].Currency = 'Rupee';
//         }
//         console.log(this.accounts[0].Currency+'kk');
//     }
    
//     );
//   }
//   getAccSummary2(id:number){

//     this.http.get('assets/users.json').subscribe((data:any) =>
//     {
//         this.accounts=data.accounts;
//         console.log(this.accounts[id-1].balance+'op')
//         if(Number(this.transferAmount)> Number(this.accounts[id- 1].balance))
//         alert('Insuffient Balance!!!');
//         else{
//         this.accounts[id-1].balance-=this.transferAmount;
//         console.log(this.accounts[id-1].balance)
//         this.accounts[this.recipientAccount - 1].balance = Number(this.accounts[this.recipientAccount - 1].balance);
//         this.transferAmount = Number(this.transferAmount);
//         this.accounts[this.recipientAccount-1].balance+=this.transferAmount;
//         console.log(this.accounts[this.recipientAccount-1].balance+' Recepient')
//         alert('Balance after transfer '+this.accounts[id-1].balance);
//         alert('Transaction success');
//          // Reset form values
//          this.recipientName = '';
//          this.recipientAccount = 0;
//          this.ifscCode = '';
//          this.transferAmount = 0;
//         }
//     }
    
//     );
//   }
// }
