var oorspronkelijk_email = '';
async function toonVoorkeuren() {
    let token = localStorage.getItem('token');
    var tokenInhoud = parseJwt(token);



    try {
        const responsemail = await fetch("http://localhost:8000/api/player/" + tokenInhoud.sub, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/ld+json; charset=UTF-8',
            }



        }
        );




        const response = await fetch("http://localhost:8000/api/player/" + tokenInhoud.sub + '/preferences', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/ld+json; charset=UTF-8',
            }



        }
        );

      //  console.log("call = " + response + "\n Status: " + response.status);

        if (response.status === 200 && responsemail.status === 200) {

            const jsonResponse = await response.json();
            const jsonResponsemail = await responsemail.json();
           
            oorspronkelijk_email = jsonResponsemail.email;
            var preferred_api = jsonResponse.preferred_api;
            var preferred_color_closed = jsonResponse.color_closed;
            var preferred_color_found = jsonResponse.color_found;

        }


        else if (response.status === 401) {
        }
    } catch (error) {
        console.error("Fout tijdens ophalen van de voorkeursdata: ", error);
    }



    // Vul alle velden met de data van de database

    document.getElementById('mail').value = oorspronkelijk_email;


    if (preferred_color_found != undefined && preferred_color_found.length != 0) {
        document.getElementById('Gevondenkleur').value = preferred_color_found;
        let r = document.querySelector(':root');
        r.style.setProperty('--groen', preferred_color_found);
    }
    if (preferred_color_closed != undefined && preferred_color_closed.length != 0) {
        document.getElementById('Geslotenkleur').value = preferred_color_closed;
        let r = document.querySelector(':root');
        r.style.setProperty('--grijs', preferred_color_closed);
    }
    if (preferred_api != undefined && preferred_api.length != 0) {
        document.getElementById('PlaatjesKeuze').value = preferred_api;

    }

    // Vul alle velden met de data uit de localstorage, deze velden hebben een spelerid en value
    let Speelbord = localStorage.getItem('Speelbord'); //formaat speelbord
    let Kaartsoort = localStorage.getItem('Kaartsoort'); //Voorkant kaart
    let Openkleur = localStorage.getItem('Openkleur'); // kleur open kaart

    //console.log(tokenInhoud.roles);
    document.getElementById('username').innerText = tokenInhoud.username;
    //if (tokenInhoud) ROLE_ADMIN
    const found = tokenInhoud.roles.find((element) => element == 'ROLE_ADMIN');
    if (found != undefined) {
        document.getElementById('admin').style.display = 'block';
        document.getElementById('username').innerText = 'Admin ' + tokenInhoud.username;
    }
    if (Speelbord != null) {
        document.getElementById('Speelbord').value = Speelbord;
    }
    if (Kaartsoort != null) {
        document.getElementById('Kaartsoort').value = Kaartsoort;
    }
    if (Openkleur != null) {
        document.getElementById('Openkleur').value = Openkleur;
        let r = document.querySelector(':root');
        r.style.setProperty('--blauw', Openkleur);
    }
}




// voorkeuren van grootte speelbord,en voorkant, plus open eerst maar lokaal opslaan.
async function opslaan() {
    let token = localStorage.getItem('token');
    var tokenInhoud = parseJwt(token);

    //console.log(tokenInhoud);

    var opslaanknop = document.getElementById('opslaan');

    opslaanknop.addEventListener("click", async () => {

        laadAnimatie.style.display = 'block';
        document.body.style.overflow = "hidden";



        var form = document.getElementById("voorkeurenform");
        var formData = new FormData(form);
        var mail = formData.get("email");
        let preferred_api = formData.get("preferred_api");
        let preferred_color_closed = formData.get("preferred_color_closed");
        let preferred_color_found = formData.get("preferred_color_found");
        let Speelbord = formData.get("Speelbord"); //formaat speelbord
        let Kaartsoort = formData.get("Kaartsoort"); //Voorkant kaart
        let Openkleur = formData.get("Openkleur"); // kleur open kaart


        let token = localStorage.getItem('token');
        //console.log(oorspronkelijk_email);
        if (mail != oorspronkelijk_email && mail != null) {
            try {
                const responsepatchm = await fetch("http://localhost:8000/api/player/" + tokenInhoud.sub + '/email', {
                    method: "PUT",
                    body: JSON.stringify({
                        email: mail
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
                ); console.log(responsepatchm, responsepatchm.status);
            } catch (error) {
                console.error("Fout tijdens opslaan mail: ", error);
            }
        }
        try {
            const responsepatch = await fetch("http://localhost:8000/api/player/" + tokenInhoud.sub + '/preferences', {
                method: "POST",
                body: JSON.stringify({

                    api: preferred_api,
                    color_found: preferred_color_found,
                    color_closed: preferred_color_closed,
                    id: tokenInhoud.sub,
                }),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-type': 'application/json; charset=UTF-8',
                }



            }
            );

          //  console.log(responsepatch, responsepatch.status);

            if (responsepatch.status === 204) {

                laadAnimatie.style.display = 'none';
                document.body.style.overflow = null;
                // const jsonResponse2 = await responsepatch.json();

                // console.log(jsonResponse2);
                localStorage.setItem('Speelbord', Speelbord);
                localStorage.setItem('Kaartsoort', Kaartsoort);
                localStorage.setItem('Openkleur', Openkleur);
            }


            else if (responsepatch.status === 400) {
            }
        } catch (error) {
            console.error("Fout tijdens opslaan voorkeuren: ", error);
        }
    });

}



//Opslaan spel en laatste voorkeuren en score..
async function aantalGames() {
    let token = localStorage.getItem('token');
    var tokenInhoud = parseJwt(token);

   // console.log(tokenInhoud);

   
            try {
                const responsepatchuitslag= await fetch("http://localhost:8000/api/player/" + tokenInhoud.sub + '/games', {
                    method: "GET",
                    // body: JSON.stringify({
                        
                    // }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }

                
                );
                
                if (responsepatchuitslag.status === 200) {

                    const jsonResponse = await responsepatchuitslag.json();
                    console.log(jsonResponse);
                    return jsonResponse.length;
        
                }
                
                
                
            } catch (error) {
                console.error("Fout tijdens tellen games: ", error);
            }
 
}
//Opslaan spel en laatste voorkeuren en score..
async function opslaanUitslag() {
    let token = localStorage.getItem('token');
    var tokenInhoud = parseJwt(token);

   // console.log(tokenInhoud);

   
            try {
                const responseOpslaanUitslag = await fetch("http://localhost:8000/api/player/" + tokenInhoud.sub + '/games', {
                    method: "POST",
                    body: JSON.stringify({

                        score: 100,
                      //  date: ,
                        id: tokenInhoud.sub,
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }

                
                );
                
                if (responsepatchuitslag.status === 200) {

                    const jsonResponse = await responsepatchuitslag.json();
                    console.log(jsonResponse.length);
                    return jsonResponse.length;
        
                }
                
                
                
            } catch (error) {
                console.error("Fout tijdens tellen games: ", error);
            }
 
}


//einde functie opslaanUitslag.


toonVoorkeuren();
opslaan();
aantalGames();
//Registreer knop om naar de registreer pagina te gaan.
var standaard = document.getElementById('standaard');

standaard.addEventListener("click", async () => {
    document.getElementById("voorkeurenform").reset();

    document.getElementById('mail').value = oorspronkelijk_email;

});

var admin = document.getElementById('admin');

admin.addEventListener("click", async () => {

    window.location.href = "http://localhost:4200/";
});

