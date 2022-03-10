import { autorun, action, observable, configure } from 'mobx'

configure({ enforceActions: 'always' })

export class CountryStore {

    constructor() {
        // autorun(this.save)
        this.loadFromApi() // Loads countries from api
    }

    @observable apiUrl: string = 'https://xc-countries-api.herokuapp.com/api/'

    @observable countries: ICountry[] = []

    @action
    loadFromApi = async () => {
        const response = await fetch(this.apiUrl + 'countries')
        const data = await response.json()
        this.countries = data
    }

    // private save = () => {
    //     console.log('Saving countries to local storage')
    //     localStorage.setItem('countries', JSON.stringify(this.countries))

    // }

    @action
    private load = () => {
        const data = localStorage.getItem('countries')
        if (data) {
            this.countries = JSON.parse(data)
        }
    }

    @action
    addCountry = async (country: ICountry) => {
        const response = await fetch(this.apiUrl + 'countries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(country)
        })
        const data = await response.json()
        this.countries.push(data)
    }

}