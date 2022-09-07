import { getData } from "./getFixtures.js";
import {firstTeamName, score, secondTeamName, homeTeamLogo, awayTeamLogo, nextMatch, time} from "./elements.js";

var id = 0

const data = await getData()

console.log(data)
for(let i = 0 ; i < data.results; i++) {
   if(data.response[i].league.name === "UEFA Champions League") {
        firstTeamName.textContent = data.response[i].teams.home.name
        secondTeamName.textContent = data.response[i].teams.away.name
        homeTeamLogo.src = data.response[i].teams.home.logo
        awayTeamLogo.src = data.response[i].teams.away.logo
        score.textContent = data.response[i].goals.home + "-" + data.response[i].goals.away
        id = i;
        break;
       
   }
}

nextMatch.addEventListener("click", function() {
    for(let i = id + 1 ; i < data.results; i++) {
        if(data.response[i].league.name === "UEFA Champions League") {
            firstTeamName.textContent = data.response[i].teams.home.name
            secondTeamName.textContent = data.response[i].teams.away.name
            homeTeamLogo.src = data.response[i].teams.home.logo
            awayTeamLogo.src = data.response[i].teams.away.logo
            score.textContent = data.response[i].goals.home + "-" + data.response[i].goals.away
            id = i;
            break;
        }
    }
})

previousMatch.addEventListener("click", function() {
    for(let i = id - 1 ; i >= 0; i--) {
       if(data.response[i].league.name === "UEFA Champions League") {
            firstTeamName.textContent = data.response[i].teams.home.name
            secondTeamName.textContent = data.response[i].teams.away.name
            homeTeamLogo.src = data.response[i].teams.home.logo
            awayTeamLogo.src = data.response[i].teams.away.logo
            score.textContent = data.response[i].goals.home + "-" + data.response[i].goals.away
            id = i;
            break;
        }
    }
})

var timer = 100;

function UpdateScore()
{
    window.requestAnimationFrame(UpdateScore);
    score.textContent = data.response[id].goals.home + "-" + data.response[id].goals.away
    time.textContent = data.response[id].fixture.status.elapsed + 2 + ":" + "00"

}

window.requestAnimationFrame(UpdateScore)


