function sorteerScores(a, b) {

    if (a[2] == b[2]) {
        return 0;

    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}


//Naam en score toevoegen aan de top vijf, de laagste vijf
async function voegHogescoreToe(i, naam, score) {
    console.log(i + naam + score);
    var scoresTable = document.getElementById("scorestable");
    var nieuweRegel = document.createElement("tr");

    var nrKolom = document.createElement("td");
    nrKolom.textContent = parseInt(i) + 1;
    nieuweRegel.appendChild(nrKolom);

    var naamKolom = document.createElement("td");
    naamKolom.textContent = naam;
    nieuweRegel.appendChild(naamKolom);

    var scoreKolom = document.createElement("td");
    scoreKolom.textContent = score;
    nieuweRegel.appendChild(scoreKolom);


    scoresTable.appendChild(nieuweRegel);

}


async function haalTopVijfOp() {
    var array = [];

    try {
        // const response = await fetch("http://localhost:8000/api/games", {
        const response = await fetch("http://localhost:8000/scores", {
            method: "GET",
            headers: {

            }
        });
        console.log(response.status);
        if (response.status === 200) {
            let players = document.querySelector('#players');
            players.style.display = 'block';
            const jsonResponse = await response.json();

            console.log('\n------');
            console.log(jsonResponse);


            for (let i = 0; i < jsonResponse.length; i++) {
                // laagste vijf scores ophalen en stoppen in een array met game id en score                  
                let id = i;
                let username = jsonResponse[i].username;
                let score = jsonResponse[i].score;
                console.log("gameid: " + id + "Username" + username + " Score: " + score)
                array.push([id, username, score]);
            }


            array = array.sort(sorteerScores);
            //Alleen de eerste vijf meenemen
            array = array.slice(0, 5);

            for (let i = 0; i < array.length; i++) {

                let naam = array[i][1];
                let score = array[i][2];

                await voegHogescoreToe(i, naam, score);
            }
        }
    }
    catch (error) {
        console.error("Fout tijdens het ophalen van de top 5:  ", error);
    }


}

haalTopVijfOp();
