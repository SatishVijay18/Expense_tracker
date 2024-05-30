export interface Expense {
  name: string;
  amount: number;
  description: string;
  date: Date;
  account: Account;
  accountName: string;
  type: string;
}

export interface Account {
  name: string;
  type: string;
}

export interface FormDataType {
  name: string;
  amount: number;
  description: string;
  accountname: string;
}
