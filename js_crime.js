
document.addEventListener('DOMContentLoaded', () => {
    const stateEntry = document.querySelector('#stateIn')
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const state = stateEntry.value;
        loadStateInfo(state);
    })
});

async function loadStateInfo(state) {
    const url = "https://api.usa.gov/crime/fbi/cde/arrest/state/" + state + "/all?type=totals&from=01-2025&to=12-2025&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";
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