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
            selected: '',
        }
    });

    getData();
}

