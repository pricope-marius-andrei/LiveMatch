import { getData } from "./getFixtures.js";
import {footballEvents, firstTeamName, score, secondTeamName, homeTeamLogo, awayTeamLogo, nextMatch, time, events} from "./elements.js";

//Current id
var id = 0

//Create new element
(function() {
    class Events extends HTMLElement {
        connectedCallback(){
        this.innerHTML = `
            <img class="eventImg">
            <div class="eventTime">time</div>
            <div class="eventPlayer">player</div>
        `;
      }
    }
    window.customElements.define('football-event',Events);
})();

//get data from api
const data = await getData()

//Update new events
function UpdateEvents(id) {

    //create all events
    for(let i = 0 ; i < data.response[id].events.length; i++)
    {
        const event = document.createElement('football-event')
        event.className = "event"
        footballEvents.appendChild(event)
    }

    const eventTime = document.getElementsByClassName('eventTime')
    const eventImg = document.getElementsByClassName('eventImg')
    const eventPlayer = document.getElementsByClassName('eventPlayer')

    //Update information for all events
    for(let i = 0 ; i < eventTime.length; i++)
    {
        eventTime[i].textContent = data.response[id].events[i].time.elapsed + "'"
        eventPlayer[i].textContent = data.response[id].events[i].player.name
        console.log(id)
        if(data.response[id].events[i].detail === "Missed Penalty")
        {
            eventImg[i].src = "./eventsImage/missed.png"
        }
        else if(data.response[id].events[i].type === "Goal")
        {
            if(data.response[id].events[i].detail === "Own Goal")
            {
                eventImg[i].src = "./eventsImage/own.png"
            }
            else 
                eventImg[i].src = "./eventsImage/football.png"
        }
        else if (data.response[id].events[i].detail === "Yellow Card")
        {
            eventImg[i].src = "./eventsImage/yellow-card.png"
        }
        else if(data.response[id].events[i].detail === "Red Card")
        {
            eventImg[i].src = "./eventsImage/red.png"
        }
        else if(data.response[id].events[i].type === "subst")
        {
            eventImg[i].src = "./eventsImage/change.png"
        }
        else
        {
            eventImg[i].src = "./eventsImage/var.png"
        }
    }
}

//status match - half time, full time, not started
var statusMatch = data.response[id].fixture.status.short

//select match from UEFA Champions League
for(let i = 0 ; i < data.results; i++) {
   if(data.response[i].league.name === "UEFA Champions League") {
        UpdateEvents(i)
        firstTeamName.textContent = data.response[i].teams.home.name
        secondTeamName.textContent = data.response[i].teams.away.name
        homeTeamLogo.src = data.response[i].teams.home.logo
        awayTeamLogo.src = data.response[i].teams.away.logo
        statusMatch = data.response[i].fixture.status.short
        if(statusMatch !== "NS")
            score.textContent = data.response[i].goals.home + "-" + data.response[i].goals.away
        id = i;
        break;
   }
}

//update teams and details when press nextMatch button
nextMatch.addEventListener("click", function() {
    for(let i = id + 1 ; i < data.results; i++) {
        if(data.response[i].league.name === "UEFA Champions League") {
            footballEvents.innerHTML = ''
            UpdateEvents(i)
            firstTeamName.textContent = data.response[i].teams.home.name
            secondTeamName.textContent = data.response[i].teams.away.name
            homeTeamLogo.src = data.response[i].teams.home.logo
            awayTeamLogo.src = data.response[i].teams.away.logo
            statusMatch = data.response[i].fixture.status.short
            if(statusMatch !== "NS")
                score.textContent = data.response[i].goals.home + "-" + data.response[i].goals.away
            id = i;
            statusMatch = data.response[id].fixture.status.short
            break;
        }
    }
})

//update teams and details when press previousMatch button
previousMatch.addEventListener("click", function() {
    for(let i = id - 1 ; i >= 0; i--) {
       if(data.response[i].league.name === "UEFA Champions League") {
            footballEvents.innerHTML = ''
            UpdateEvents(i)
            firstTeamName.textContent = data.response[i].teams.home.name
            secondTeamName.textContent = data.response[i].teams.away.name
            homeTeamLogo.src = data.response[i].teams.home.logo
            awayTeamLogo.src = data.response[i].teams.away.logo
            statusMatch = data.response[i].fixture.status.short
            if(statusMatch !== "NS")
                score.textContent = data.response[i].goals.home + "-" + data.response[i].goals.away
            id = i;
            
            break;
        }
    }
})

//Update Score at every seconds
function UpdateScore()
{
    window.requestAnimationFrame(UpdateScore);
    statusMatch = data.response[id].fixture.status.short
    if(statusMatch === "NS") {
        time.textContent = "Not started"
    }
    else {
        if(data.response[id].league.name === "UEFA Champions League") {
            score.textContent = data.response[id].goals.home + "-" + data.response[id].goals.away
            time.textContent = data.response[id].fixture.status.elapsed + ":" + "00"
        }
    }
}

window.requestAnimationFrame(UpdateScore)