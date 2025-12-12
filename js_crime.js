
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

    const stateRow = {
        AL: "1", AK: "2", AZ: "3", AR: "4", CA: "5", CO: "6",
        CT: "7", DE: "8", FL: "10", GA: "11", HI: "12", ID: "13",
        IL: "14", IN: "15", IA: "16", KS: "17", KY: "18", LA: "19",
        ME: "20", MD: "21", MA: "22", MI: "23", MN: "24", MS: "25",
        MO: "26", MT: "27", NE: "28", NV: "29", NH: "30", NJ: "31",
        NM: "32", NY: "33", NC: "34", ND: "35", OH: "36", OK: "37",
        OR: "38", PA: "39", RI: "40", SC: "41", SD: "42", TN: "43",
        TX: "44", UT: "45", VT: "46", VA: "47", WA: "48", WV: "49",
        WI: "50", WY: "51"
    }

    const row = stateRow[state];

    const url = "https://api.census.gov/data/2020/dec/cd118?get=group(P1)&ucgid=pseudo(0100000US$0400000)";


    let response = await fetch(url);

    if(response.ok) {
        let report = await response.json();

        stateName = report[row][1];
        population = report[row][2];
        console.log(stateName, population);
        document.getElementById("statePop").innerHTML = `${stateName} Population (2020 Census): ${population}`;

    }
    else {
        document.querySelector("#statePopulation").textContent =
            "Could not load population data.";
    }
}
