
document.addEventListener('DOMContentLoaded', () => {
    const stateEntry = document.querySelector('#stateIn')
    const yearEntry = document.querySelector('#yearIn');
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const state = stateEntry.value;
        const year = yearEntry.value;
        loadStateInfo(state, year);
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

