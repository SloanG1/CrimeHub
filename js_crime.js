
document.addEventListener('DOMContentLoaded', () => {
    const stateEntry = document.querySelector('#stateIn')
    const yearEntry = document.querySelector('#yearIn');
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const state = stateEntry.value;
        const year = yearEntry.value;
        loadStateInfo(state, year);
        loadStateInfo2(state)
    })
});

async function loadStateInfo(state, year) {
    const url = "https://api.usa.gov/crime/fbi/cde/arrest/state/" + state + "/all?type=totals&" + year + "&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";
    let response = await fetch(url);
    if(response.ok) {
        let report = await response.json();
        const arresteeRace = report['Arrestee Race']; 
        const arresteeSex = report['Arrestee Sex'];
        const femaleArrestsByAge = report['Female Arrests by Age'];
        const maleArrestsByAge = report['Male Arrests by Age'];
        const offenseBreakdown = report['Offense Breakdown'];
        const offenseCategory = report['Offense Category'];
        const offenseName = report['Offense Name'];

        const canvas = document.getElementById('crimeCanvas');
        const ctx = canvas.getContext('2d');

        const existingCanvas = Chart.getChart(canvas);
        if (existingCanvas) {
            existingCanvas.destroy();
        }
        

        new Chart(ctx, {
        type: "bar",
        data: {
            labels: maleArrestsByAge,
            datasets: [{
            backgroundColor: 'blue',
            data: offenseBreakdown
            }]
        },
        options: {
            plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: "Crime Offense Breakdown",
                font: {size: 16}
            }
            }
        }
        });
        console.log(report);
    } 
    
    else {
        console.error("HTTP-Error: " + response.status);
    }
}


async function loadCityInfo(city) {
    const url = "Not avaiable yet";
    let response = await fetch(url);
    if(response.ok) {
        let report = await response.json();
        console.log(report);
    }
}

async function loadStateInfo2(state) {

    const stateFIPS = {
        AL: "01", AK: "02", AZ: "04", AR: "05", CA: "06", CO: "08",
        CT: "09", DE: "10", FL: "12", GA: "13", HI: "15", ID: "16",
        IL: "17", IN: "18", IA: "19", KS: "20", KY: "21", LA: "22",
        ME: "23", MD: "24", MA: "25", MI: "26", MN: "27", MS: "28",
        MO: "29", MT: "30", NE: "31", NV: "32", NH: "33", NJ: "34",
        NM: "35", NY: "36", NC: "37", ND: "38", OH: "39", OK: "40",
        OR: "41", PA: "42", RI: "44", SC: "45", SD: "46", TN: "47",
        TX: "48", UT: "49", VT: "50", VA: "51", WA: "53", WV: "54",
        WI: "55", WY: "56"
    }

    const fips = stateFIPs[state];

    const url = "https://api.census.gov/data/2020/dec/cd118?get=group(P1)&ucgid=pseudo(0100000US$0400000)";

    let response = await fetch(url);

    if(response.ok) {
        let data = await response.json();

        const stateName=data[1][0];
        const population = parseInt(data[1][1]).toLocaleString();

        document.querySelector("#statePopulation").textContent =
            `${stateName} Population (2020 Census): ${population}`;
    }
    else {
        document.querySelector("#statePopulation").textContent =
            "Could not load population data.";
    }
}
