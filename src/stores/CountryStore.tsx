import { makeAutoObservable, runInAction, toJS } from "mobx"


export class CountryStore {
    apiUrl: string = 'https://xc-countries-api.herokuapp.com/api/';
    countries: ICountry[] = []
    hasLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this)
        this.loadCountries()
    }

    // Fetches all Countries from the server.
    loadCountries() {
        fetch(this.apiUrl + 'countries/')
            .then(response => response.json())
            .then(data => {
                runInAction(() => {
                    this.countries = data
                })
            });
        this.hasLoaded = true;
    }

    // Sends new country to server
    sendCountryToServer(newCountry:ICountry) {
        fetch(this.apiUrl + 'countries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCountry)
        })
            .then(response => response.json())
            .then(data => {
            })

    }


    // Creates a fresh Country on the client and the server.
    createCountry(newCountry:ICountry) {
        this.countries.push(newCountry)
        this.sendCountryToServer(newCountry)
        return newCountry
    }

    // Get array of all countries
    get allCountries() {
        let allCountriesAsJS: ICountry[] = this.countries.map(country => toJS(country));
        return allCountriesAsJS;
    }


}


// Domain object Country.
export class Country implements ICountry {

    id: number
    name: string
    code: string
    store:CountryStore;

    constructor(store: CountryStore, country: ICountry) {
        makeAutoObservable(this, {
            id: false,
            name: false,
            code: false,
            store: false
        })
        this.store = store

        this.id = country.id
        this.name = country.name
        this.code = country.code

    }
    
    get asJson() {
        return {
            id: this.id,
            name: this.name,
            code: this.code
        }
    }

    // Send this country to the server
    save() {
        this.store.sendCountryToServer(this)
    }

}