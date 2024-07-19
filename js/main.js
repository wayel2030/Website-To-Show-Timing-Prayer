let cities = ["البريمي", "مسقط", "الخرطوم", "القاهره"];
let allCites = [
  {
    arabicName: "البريمي",
    name: "Al Buraymī",
    country: "OM",
  },
  {
    arabicName: "مسقط",
    name: "Masqaţ",
    country: "OM",
  },
  {
    arabicName: "الخرطوم",
    name: "Al Kharţūm",
    country: "SD",
  },
  {
    arabicName: "القاهره",
    name: "Al Qāhirah",
    country: "EG",
  },
];
let cityName = document.querySelector(".cityName h1");
let citiesSelected = document.querySelector("#citesSelected");
for (let city of allCites) {
  let content = `
  <option>${city.arabicName}</option>
  `;
  citiesSelected.innerHTML += content;
}


window.onload = function () {
  defaultData();
  getData();
  citiesSelected.addEventListener("change", function () {
    let nameOfCity = "";
    let nameCountry = "";

    for (const city of allCites) {
      if (city.arabicName === this.value) {
        nameOfCity = city.name;
        nameCountry = city.country;
      }
    }

    getData(nameCountry, nameOfCity);

    cityName.innerHTML = this.value;
  });
};

let getData = function (countryName, cityName) {
  let params = {
    country: countryName, //"OM",
    city: cityName, //"Al Buraymī",
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let allData = response.data.data;
      let years = allData.date.gregorian.year;
      let days = allData.date.gregorian.day;
      let months = allData.date.gregorian.month.number;
      let fullHistoryMalldee = `${years} - ${months} - ${days}`;
      history.innerHTML = allData.date.readable;
      fillTimingForPrayer("Fajr", allData.timings.Fajr);
      fillTimingForPrayer("Sunrise", allData.timings.Sunrise);
      fillTimingForPrayer("Dhuhr", allData.timings.Dhuhr);
      fillTimingForPrayer("Asr", allData.timings.Asr);
      fillTimingForPrayer("Maghrib", allData.timings.Maghrib);
      fillTimingForPrayer("Isha", allData.timings.Isha);
      fillTimingForPrayer("historyDay", allData.date.hijri.weekday.ar);
      fillTimingForPrayer("history", fullHistoryMalldee);
      fillTimingForPrayer("historyHigire", allData.date.hijri.date);
    })
    .catch(function (error) {
      console.log(Error("Some Error"));
    });
};

getData();

function fillTimingForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}

// this to default data
function defaultData() {
  if (cityName.innerHTML == "") {
    cityName.innerHTML = "البريمي";
  }
}
defaultData();
