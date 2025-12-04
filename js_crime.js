
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
    let responseFromZy = await fetch(url);
    if(responseFromZy.ok) {
        let report = await responseFromZy.json();
        console.log(report);
    }
}