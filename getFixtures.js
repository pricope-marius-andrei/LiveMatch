const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2022-09-07'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b60b6ddc04mshdde4f28139e8f4ep1a5ffbjsn6c6297d561f4',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

export async function getData() {
    const response = await fetch(url, options)
    return response.json();
}