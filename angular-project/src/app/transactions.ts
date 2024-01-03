export class Transactions {
    tranid:string;
    date:any;
    amount:string;
    description:string;
    accId:number;
    name:string;
    balance:number;
    recepientName:string;
    raccId:number;

    constructor(id: string, date: any, amount: string, description: string, accId: number, name: string,balance:number,recepientName:string,raccId:number) {
        this.tranid = id;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.accId = accId;
        this.name = name;
        this.balance=balance;
        this.recepientName=recepientName;
        this.raccId=raccId;
      }
    
}
