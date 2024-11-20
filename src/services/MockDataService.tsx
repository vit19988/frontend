import {Moment} from "moment/moment";
import {DataServiceItem} from "../models/models";

const moment = require('moment');

class MockDataService {
    listMockData(): DataServiceItem[] {
        const mockData: DataServiceItem[] = [];
        for (let i = 1; i <= 100; i++) {
            const account = i.toString().padStart(6, '0');
            const operations = ["Buy", "Sell"];
            const quantity = Math.floor(Math.random() * 100) + 1;
            const filledQuantity = Math.floor(Math.random() * (quantity + 1));
            const date = this.randomDate();
            const expireDate = this.randomExpirationDate(date);
            const refNumber = this.randomSevenDigit();
            const extRefNumber = this.randomExtRefNumber();

            mockData.push({
                account: account,
                operation: operations[Math.floor(Math.random() * operations.length)],
                symbol: "NA",
                description: "NATIONAL BANK OF CDA",
                quantity: quantity,
                filledQuantity: filledQuantity,
                period: "Transmission",
                status: "Waiting",
                date: moment(date),
                expireDate: moment(expireDate),
                refNumber: refNumber,
                extRefNumber: extRefNumber,
                amount: this.randomTwoDecimalNumber(20, 1000),
                price: this.randomTwoDecimalNumber(20, 500),
                exchangeRate: this.randomTwoDecimalNumber(1, 1.5),
                limit: this.randomTwoDecimalNumber(20, 200),
                phoneNumber: this.randomPhoneNumber(),
                userId: this.randomSevenDigit()
            });
        }

        return mockData;
    }

    private randomDate() {
        const start = moment(new Date(2020, 0, 1));
        const end = moment();
        return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()));
    }

    private randomExpirationDate(start: Moment) {
        let end = moment(start).add(2, 'years');
        return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()));
    }

    private randomSevenDigit() {
        let number = Math.floor(Math.random() * 1_000_000_0);
        return number.toString().padStart(7, '0');
    }

    private randomExtRefNumber() {
        return `2-${this.randomSevenDigit()}2-3`;
    }

    private randomTwoDecimalNumber(min = 1, max = 1000) {
         const result = (Math.random() * (max - min) + min).toFixed(2);
         return parseFloat(result);
    }

    private randomPhoneNumber() {
        let phoneNumber = '';
        for (let i = 0; i < 10; i++) {
            phoneNumber += Math.floor(Math.random() * 10);
        }
        return phoneNumber;
    }
}

const mockDataService: MockDataService = new MockDataService();
export default mockDataService;
