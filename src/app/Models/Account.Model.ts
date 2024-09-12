import { AccountType } from "./AccountType.Model";

  
  export interface Account {
    id: number;
    accountNumber: string; // Hesap Numarası
    balance: number; // Hesap Bakiyesi
    type: AccountType; // Vadeli mi, Vadesiz mi?
    createdAt: Date; // Hesabın oluşturulma tarihi
    lastInterestAppliedDate?: Date | null; // Vadeli hesaba faiz uygulama tarihi (opsiyonel)
  
    // İlişkiler
    appUserId: string; // Kullanıcı ID

  }
  
  

export { AccountType };
  