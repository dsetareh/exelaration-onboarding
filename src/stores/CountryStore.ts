import { autorun, action, observable, configure, makeObservable, runInAction } from 'mobx'


export class CountryStore {

    constructor() {
        // !!!!! this not being here was why locationBrowser was not rerendered on store change !!!!!
        makeObservable(this, {
            apiUrl: false,
            countries: observable,
            loadFromApi: action,
            addCountry: action
        }); 
    }

    apiUrl: string = 'https://xc-countries-api.herokuapp.com/api/'
    countries: ICountry[] = []

    loadFromApi = async () => {
        const response = await fetch(this.apiUrl + 'countries')
        const data = await response.json()
        runInAction(() => {
            this.countries = data
        });
    }
    
    addCountry = async (country: ICountry) => {
        const response = await fetch(this.apiUrl + 'countries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(country)
        })
        const data = await response.json()
        this.countries =  [...this.countries, data];
    }

}