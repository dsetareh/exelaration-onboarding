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
    app = new Vue({
        name: 'App',
        el: '#vuediv',
        data: {
            countries: [],
            selectedCountry: '',
            selectedState: '',
            states: [],
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

