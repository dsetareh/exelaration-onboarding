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
            submitCountryID: '',

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
                        id: this.submitCountryID
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

