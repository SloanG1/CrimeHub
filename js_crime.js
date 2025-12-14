
document.addEventListener('DOMContentLoaded', () => {
    const stateEntry = document.querySelector('#stateIn')
    const yearEntry = document.querySelector('#yearIn');
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const state = stateEntry.value;
        const year = yearEntry.value;
        loadStateInfo(state, year);
        loadPopInfo(state);
        loadEconomyInfo(state);
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

        const canvas2 = document.getElementById('RaceCanvas');
        const ctx2 = canvas2.getContext('2d');

        const canvas3 = document.getElementById('ArrestedSexCanvas');
        const ctx3 = canvas3.getContext('2d');

        const existingCanvas = Chart.getChart(canvas);
        if (existingCanvas) {
            existingCanvas.destroy();
        }
        
        const existingCanvas2 = Chart.getChart(canvas2);
        if (existingCanvas2) {
            existingCanvas2.destroy();
        }

        const existingCanvas3 = Chart.getChart(canvas3);
        if (existingCanvas3) {
            existingCanvas3.destroy();
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

        new Chart(ctx2, {
        type: "bar",
        data: {
            labels: maleArrestsByAge,
            datasets: [{
            backgroundColor: 'blue',
            data: arresteeRace
            }]
        },
        options: {
            plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: "Arrested Race",
                font: {size: 16}
            }
            }
        }
        });

        new Chart(ctx3, {
        type: "bar",
        data: {
            labels: maleArrestsByAge,
            datasets: [{
            backgroundColor: 'blue',
            data: arresteeSex
            }]
        },
        options: {
            plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: "Arrested Sex",
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

async function loadPopInfo(state) {

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

async function loadEconomyInfo(state) {
    //This dictionary state keys have different keys that the previous one
    const stateRow = {
        AL: "01", AK: "02", AZ: "04", AR: "05", CA: "06", CO: "08",
        CT: "09", DE: "10", FL: "12", GA: "13", HI: "15", ID: "16",
        IL: "17", IN: "18", IA: "19", KS: "20", KY: "21", LA: "22",
        ME: "22", MD: "23", MA: "24", MI: "25", MN: "26", MS: "28",
        MO: "29", MT: "30", NE: "31", NV: "32", NH: "33", NJ: "34",
        NM: "35", NY: "36", NC: "37", ND: "38", OH: "39", OK: "40",
        OR: "41", PA: "42", RI: "44", SC: "45", SD: "46", TN: "47",
        TX: "48", UT: "49", VT: "50", VA: "51", WA: "53", WV: "54",
        WI: "55", WY: "56"
    }

    const stateID = stateRow[state];
    console.log(stateID);

    const census_key = "328bb87c1e1bba3954a2f149072c8727924504fc";
    /*Town information is too specific I found so all information is strictly state wide*/

    // B23025_005E = Unemployment Rate
    //B19013_001E = Median Household Income
    //B19001_001E = Total Households
    //C16002_002E = English Only Speakers
    //C16002_004E = Spanish Speakers Limited English
    //C16002_007E = Indo-European Languages Limited English
    //C16002_010E = Asian and Pacific Islander Languages Limited English
    //C16002_013E = Other Languages Limited English
    const url = `https://api.census.gov/data/2023/acs/acs5?get=NAME,B23025_005E,B19013_001E,B19001_001E,C16002_002E,C16002_004E,C16002_007E,C16002_010E,C16002_013E&for=state:${stateID}&key=${census_key}`;


    let response = await fetch(url);
    if(response.ok) {
        let report = await response.json();

        Unemployment_Rate = report[1][1];
        Median_Household_Income = report[1][2];
        Total_Households = report[1][3];
        English_Speakers = report[1][4];
        Spanish_Speakers = report[1][5];
        IndoEuropean_Speakers = report[1][6];
        Asian_Speakers = report[1][7];
        Other_Speakers = report[1][8];

        document.getElementById("UnemploymentRate").innerHTML = `Unemployment: ${Unemployment_Rate}`;
        document.getElementById("MedianIncome").innerHTML = `Median Household Income: ${Median_Household_Income}`;
        document.getElementById("TotalHouseholds").innerHTML = `Total Households: ${Total_Households}`;
        document.getElementById("EnglishSpeakers").innerHTML = `English Speakers: ${English_Speakers}`;
        document.getElementById("SpanishSpeakers").innerHTML = `Spanish Speakers: ${Spanish_Speakers}`;
        document.getElementById("IndoEuropeanSpeakers").innerHTML = `Indo-European Speakers: ${IndoEuropean_Speakers}`;
        document.getElementById("AsianSpeakers").innerHTML = `Asian Speakers: ${Asian_Speakers}`;
        document.getElementById("OtherSpeakers").innerHTML = `Other Speakers: ${Other_Speakers}`;

    }
    else {
        document.querySelector("#UnemploymentRate").textContent ="Could not load population data.";
        document.querySelector("#MedianIncome").textContent ="Could not load population data.";
        document.querySelector("#TotalHouseholds").textContent ="Could not load population data.";
        document.querySelector("#EnglishSpeakers").textContent ="Could not load population data.";
        document.querySelector("#SpanishSpeakers").textContent ="Could not load population data.";
        document.querySelector("#IndoEuropeanSpeakers").textContent ="Could not load population data.";
        document.querySelector("#AsianSpeakers").textContent ="Could not load population data.";
        document.querySelector("#OtherSpeakers").textContent ="Could not load population data.";
        
    }
}