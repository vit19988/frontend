import {Moment} from "moment/moment";

export interface DataServiceItem {
    account: string;
    operation: string;
    symbol: string;
    description: string;
    quantity: number;
    filledQuantity: number;
    price: number;
    period: string;
    status: string;
    amount: number;
    date: Moment;
    expireDate: Moment;
    refNumber: string;
    extRefNumber: string;
    exchangeRate: number,
    limit: number,
    phoneNumber: string,
    userId: string
}

export interface SearchFormData {
    period: string;
    status: string;
    from: Moment;
    to: Moment;
}
