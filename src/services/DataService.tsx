import {BehaviorSubject} from 'rxjs';
import {DataServiceItem, SearchFormData} from "../models/models";
import mockDataService from "./MockDataService";

class DataService {
    private readonly data: DataServiceItem[] = [];
    readonly searchSubject$ = new BehaviorSubject<DataServiceItem[]>(null);

    constructor() {
        this.data = mockDataService.listMockData();
        this.searchSubject$.next(this.data)
    };

    search(formData: SearchFormData): void {
        const queryResult = [...this.data].filter(data => {
            return (!formData.from || data.date >= formData.from)
                && (!formData.to || data.date <= formData.to)
                && (!formData.period || data.period === formData.period)
                && (!formData.status || data.status === formData.status)
        });

        this.searchSubject$.next(queryResult);
    }

    clear(): void {
        this.searchSubject$.next([...this.data])
    }
}

const dataService: DataService = new DataService();
export default dataService;
