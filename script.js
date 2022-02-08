var app;

function getData() {
    fetch('https://xc-countries-api.herokuapp.com/api/countries/')
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
                    return a.name.localeCompare(b.name);
                });
            },
            orderedStates: function () {
                return this.states.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
        },
        methods: {
            addCountry() {
                fetch('https://xc-countries-api.herokuapp.com/api/countries/', {
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
                fetch('https://xc-countries-api.herokuapp.com/api/states/', {
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
                    .then(data => {
                        app.countries.push(data);
                    })
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

                fetch('https://xc-countries-api.herokuapp.com/api/countries/' + val + '/states/')
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

