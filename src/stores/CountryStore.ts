import { action, observable, makeObservable, runInAction } from 'mobx'


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
    lastApiRequest: number = 0;
    countries: ICountry[] = []

    loadFromApi = async () => {
        // check whether there has been an api req in the last minute
        // if (Date.now() - this.lastApiRequest < 60000) {
        //     return;
        // }
        // // set lastApiRequest to now
        // this.lastApiRequest = Date.now();



        // perform request
        const response = await fetch(this.apiUrl + 'countries')
        const data = await response.json()

        // mobx needs this bcuz the function is async
        runInAction(() => {
            this.countries = data
        });
    }
    
    addCountry = async (country: object) => {
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