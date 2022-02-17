var app;

//const API_URL = 'http://localho.st:8080/api/';
const API_URL = 'https://xc-countries-api.herokuapp.com/api/';

function getData() {
    fetch(API_URL + 'countries/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            app.countries = data;
        }
        )
}


function startVue() {
    // vue makes it easy to manage the DOM
    app = new Vue({
        name: 'App',
        el: '#vuediv',
        data: {
            countries: [],
            selectedCountry: '',
            selectedState: '',
            states: [],
            submitCountryName: '',
            submitCountryCode: '',
            submitStateName: '',
            submitStateCode: '',
            submitOwnerID: '',
        },
        computed: {
            orderedCountries: function () {
                return this.countries.sort((a, b) => {
                    let aname = a.name.toLowerCase();
                    let bname = b.name.toLowerCase();
                    if (aname < bname) {
                        return -1;
                    }
                    if (aname > bname) {
                        return 1;
                    }
                    return 0;
                });
            },
            orderedStates: function () {
                return this.states.sort((a, b) => {
                    let aname = a.name.toLowerCase();
                    let bname = b.name.toLowerCase();
                    if (aname < bname) {
                        return -1;
                    }
                    if (aname > bname) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        methods: {
            addCountry() {
                fetch(API_URL + 'countries/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.submitCountryName,
                        code: this.submitCountryCode,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        app.countries.push(data);
                    })
            },
            addState() {
                fetch(API_URL + 'states/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.submitStateName,
                        code: this.submitStateCode,
                        countryId: this.submitOwnerID
                    })
                })
                    .then(response => response.json())
            }
        },
        watch: { // watch for changes in the selected country
            selectedCountry: function (val) {
                console.log(val);
                // load states
                if (val === '') {
                    console.log("invalid api call caught");
                    return;
                }

                fetch(API_URL + 'countries/' + val + '/states/')
                    .then((response) => {
                        return response.json();
                    }
                    )
                    .then((data) => {
                        this.states = data;
                    }
                    )
            }
        }
    });

    getData();
}

