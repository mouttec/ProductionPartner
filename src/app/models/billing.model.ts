export class Billing {

  constructor(public invoiceNumber: string, public amountInvoice: string, public invoiceDate: string, public invoiceLines: string, public idContract?: number, public dateCustomer?: string, public idPartner?: number, public idInvoice?: number) {}
}
