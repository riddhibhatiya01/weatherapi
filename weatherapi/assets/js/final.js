let apiKey = 'WnJUT3pRMndSS2M1VE1XSnZXdkhrT1ZOWlpDTldETW9MbUQ1eTlaWg=='
let weatherApi = "a800db5b8a3f9a0aa89e033ff728ec4b"

$.ajax({
    url: `https://api.countrystatecity.in/v1/countries`,
    method: 'get',
    headers: {
        "X-CSCAPI-KEY": apiKey
    },
    success: function (countries) {

        var Select = `<option value="">Select Your Country</option>`;
        countries.map((country, index) => {
            Select += `<option value="${country.iso2}">${country.name}</option>`;

        });
        document.getElementById('country').innerHTML = Select;
    },
});

function findCountry() {
    var country = document.getElementById('country').value;
    console.log(country)
    $.ajax({
        url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
        method: 'get',
        headers: {
            "X-CSCAPI-KEY": apiKey
        },
        success: function (states) {

            var Select = `<option value="">Select Your State</option>`;
            states.map((state, index) => {
                Select += `<option value="${state.iso2}">${state.name}</option>`;
            });
            document.getElementById('state').innerHTML = Select;
        },
    });

}

function findState() {
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    $.ajax({
        url: `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        method: 'get',
        headers: {
            "X-CSCAPI-KEY": apiKey
        },
        success: function (cites) {
            var Select = `<option value="">Select Your City</option>`;
            cites.map((city, index) => {
                Select += `<option value="${city.name}">${city.name}</option>`;

            });
            document.getElementById('city').innerHTML = Select;
        },
    });

}

function findCity() {
    var city = document.getElementById('city').value;
    $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherApi}`,
        method: "GET",
        success: function (res) {
            var latitude = res[0].lat
            var longititude = res[0].lon
            weatherDisplay(latitude, longititude);
        }
    })
}

function weatherDisplay(latitude, longititude) {

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longititude}&appid=${weatherApi}&units=metric`,
        method: "GET",
        success: function (res) {
            document.getElementById('cityName').innerHTML = res.name;
            document.getElementById('temp').innerHTML = Math.round(res.main.temp) + `°C`;
            document.getElementById('humidity').innerHTML = res.main.humidity + `%`;
            document.getElementById('wind').innerHTML = res.wind.speed + ` km/h`;
        }
    })
}
