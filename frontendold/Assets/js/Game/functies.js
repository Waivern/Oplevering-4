/* Door Marcel Bos ITC deeltijd leerjaar 3

algemene functies */


const getImage = async (url) => {
    return await fetch(url).then(res => res.url)

}
async function GenereerAfbeelding(url) {
    laadAnimatie.style.display = 'block';
    document.body.style.overflow = "hidden";
    var randomplaatjes = [];
    var vorigeResult = "";
    console.log("Aantal kaarten: " + aantalKaarten);
    for (let i = 0; i < aantalKaarten / 2; i++) {
        try {
            if (url == kattenUrl) {

                await fetch(url, {
                    headers: {
                        'x-api-key': apiKattenKey
                    }
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        let imagesData = data;
                        imagesData.map(function (imageData) {

                            let image = document.createElement('img');

                            image.src = `${imageData.url}`;

                            if (vorigeResult != result) {
                                var imageUrl = '<img src="' + image.src + '" alt="Memory spel afbeelding">'
                                console.log(imageUrl);
                                randomplaatjes.push(imageUrl);
                                randomplaatjes.push(imageUrl);

                            } else { i--; }


                        })

                    })
            } //Als niet katten dan iets anders
            else {

                var result = await getImage(url);
                if (vorigeResult != result) {
                    var imageUrl = '<img src="' + result + '" alt="Memory spel afbeelding">'
                    randomplaatjes.push(imageUrl);
                    randomplaatjes.push(imageUrl);
                } else { i--; }
            }

        }

        catch (err) {

            console.error(`Error -> ${err}`);
            const errorMessage = 'De afbeelding kan niet opgehaald worden.';
            console.log(errorMessage);


        }
    }
    var array = Shuffle(randomplaatjes);
    laadAnimatie.style.display = 'none';
    document.body.style.overflow = null;
    return array;
}

// Functie om de willekeurige afbeeldingen toe te voegen aan de achterkant van de kaarten
async function Voegplaatjetoe(url) {
    var randomplaatjes = await GenereerAfbeelding(url);
    console.log(randomplaatjes);

    kaartenAchterkant.forEach((kaartAchterkant, index) => {

        console.log(randomplaatjes[index]);
        kaartAchterkant.innerHTML = randomplaatjes[index];


    });
}

function Genereercijfer() {

    var cijfers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    const randomCijfers = [];
    console.log("Aantal kaarten: " + aantalKaarten);
    for (let i = 0; i < aantalKaarten / 2; i++) {
        var randomIndex = Math.floor(Math.random() * cijfers.length);

        var randomCijfer = cijfers[randomIndex];
        randomCijfers.push(randomCijfer);
        randomCijfers.push(randomCijfer);

        console.log(randomIndex);
        var x = cijfers.splice(randomIndex, 1);
        console.log(cijfers);
    }
    var array = Shuffle(randomCijfers);
    console.log(array);
    return array;
}


function Genereerletter() {

    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÜÖËÏÄÉÁÓ';
    const randomLetters = [];

    console.log("Aantal kaarten: " + aantalKaarten);
    for (let i = 0; i < aantalKaarten / 2; i++) {
        var randomIndex = Math.floor(Math.random() * alphabet.length);
        //console.log(randomIndex);
        var randomLetter = alphabet[randomIndex];
        randomLetters.push(randomLetter);
        randomLetters.push(randomLetter);
        // Creëer een nieuw alphabet zonder de gebruikte letter
        alphabet = alphabet.substring(0, randomIndex) + alphabet.substring(randomIndex + 1);
    }
    var array = Shuffle(randomLetters);
    console.log(array);
    return array;
}


// Functie om de willekeurige letters toe te voegen aan de kaarten
function Voegkaraktertoe(cijfersOfLetters) {

    if (cijfersOfLetters == "letters") {
        var random = Genereerletter();
    }
    else {
        var random = Genereercijfer();
    }
    console.log(random);

    kaartenAchterkant.forEach((kaartAchterkant, index) => {
        kaartAchterkant.innerHTML = random[index];


    });
}

//Colorpickers
function StartColorPickers() {

    var colorPickerGesloten = document.querySelector("#Geslotenkleur");
    var colorPickerOpen = document.querySelector("#Openkleur");
    var colorPickerGevonden = document.querySelector("#Gevondenkleur");

    colorPickerGesloten.value = "#6F6D76"; /* Kleur voor nog gesloten kaarten */
    colorPickerOpen.value = "#424D94"; /* Kleur voor geopende kaarten */
    colorPickerGevonden.value = "#31AA31"; /* Kleur voor gevonden kaarten */


    colorPickerGesloten.addEventListener("input", updateKleurGesloten, false);
    colorPickerGesloten.select();
    colorPickerOpen.addEventListener("input", updateKleurOpen, false);
    colorPickerOpen.select();
    colorPickerGevonden.addEventListener("input", updateKleurGevonden, false);
    colorPickerGevonden.select();
}

function updateKleurGesloten(event) {
    let r = document.querySelector(':root');
    r.style.setProperty('--grijs', event.target.value);
}

function updateKleurOpen(event) {
    let r = document.querySelector(':root');
    r.style.setProperty('--blauw', event.target.value);
}
function updateKleurGevonden(event) {
    let r = document.querySelector(':root');
    r.style.setProperty('--groen', event.target.value);
}



// initieel alle kaarten 1 keer omdraaien en weer terugdraaien, mooie animatie
function unflip() {
    kaarten = document.querySelectorAll('.Kaart');
    kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
    kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
    kaarten.forEach(function (kaart) {
        kaart.classList.remove('flip');
    })
}

// initieel alle kaarten 1 keer omdraaien en weer terugdraaien, mooie animatie
function unflipKaartAnimatie(Kaart, delay) {
    setTimeout(function () {
        //let element = document.getElementById(Kaart); 
        //  console.log("Hallo unflip" + Kaart);
        Kaart.classList.remove('flip');
    }, delay)

}

function flipKaartAnimatie(Kaart, delay) {
    setTimeout(function () {
        //let element = document.getElementById(Kaart); 
        // console.log("Hallo flip" + Kaart);
        Kaart.classList.add('flip');
    }, delay)

}

//hulpfunctie om de arrays te kunnen husselen, zodat niet alle plaatjes naast elkaar staan
function Shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

async function maakInstellingAcherkantPlaatjes(player) {

    var game = document.getElementById(player);
    var keuze = document.getElementById('PlaatjesKeuze');

    keuze.addEventListener("click", async () => {
        var label = document.getElementById("Labelinstelling");
        var voorTekst = "Achterkant: "
        var achterTekst = " gekozen";

        label.innerHTML = voorTekst + keuze.value + achterTekst;
    });

    game.addEventListener("click", async () => {

        var label = document.getElementById("Labelinstelling");
        kaarten = document.querySelectorAll('.Kaart');
        kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
        kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
        var voorTekst = "Achterkant: "
        var achterTekst = " gekozen";
        console.log(keuze.value);
        switch (keuze.value) {

            case "Willekeurig":
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                await Voegplaatjetoe(willekeurigUrl);

                Maakklikactie();
                timerInterval = setInterval(verlopenTimer, 1000);
                break;

            case "Letters":
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                await Voegkaraktertoe("letters");

                Maakklikactie();
                timerInterval = setInterval(verlopenTimer, 1000);
                break;

            case "Kattenplaatjes":
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                await Voegplaatjetoe(kattenUrl);

                Maakklikactie();
                timerInterval = setInterval(verlopenTimer, 1000);
                break;
            case "Cijfers":
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                await Voegkaraktertoe("cijfers");

                Maakklikactie();
                timerInterval = setInterval(verlopenTimer, 1000);
                break;
            default:
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                await Voegkaraktertoe("letters");

                Maakklikactie();
                timerInterval = setInterval(verlopenTimer, 1000);
                break;
        }
    });

}
// Plaatjes keuze voorkant:
async function maakInstellingVoorkantPlaatjes(player) {

    var game = document.getElementById(player);

    var keuze = document.getElementById('Kaartsoort');


    game.addEventListener("click", async () => {

        var label = document.getElementById("Labelinstelling2");
        kaarten = document.querySelectorAll('.Kaart');
        kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
        kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
        var voorTekst = "Voorkant: "
        var achterTekst = " gekozen";
        console.log(keuze.value);
        switch (keuze.value) {

            case "Geen":
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                kaartenVoorkant.forEach((kaartVoorkant) => {
                    kaartVoorkant.style = null;
                    kaartVoorkant.innerHTML = '';
                });
                break;

            case "Sterren":
                kaartenVoorkant.forEach((kaartVoorkant) => {

                    kaartVoorkant.style = "font-family: 'Wingdings 2'";
                    kaartVoorkant.innerHTML = '&#x00f3;';


                });


                label.innerHTML = voorTekst + keuze.value + achterTekst;

                break;

            case "Logo":

                label.innerHTML = voorTekst + keuze.value + achterTekst;
                kaartenVoorkant.forEach((kaartVoorkant) => {
                    kaartVoorkant.style = null;
                    kaartVoorkant.innerHTML = '<img src="assets/images/1.png">';
                });
                break;
            default:
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                kaartenVoorkant.forEach((kaartVoorkant) => {
                    kaartVoorkant.style = null;
                    kaartVoorkant.innerHTML = '';
                });
                break;
        }
    });
}

// Functie om het speelbord te genereren op basis van het aantal rijen en kolommen
function genereerSpeelbord(aantalRijen = 6, aantalKolommen = 6) {

    var speelbordTabel = document.getElementById("speelbordTabel");


    speelbordTabel.innerHTML = "";


    for (var i = 0; i < aantalRijen; i++) {

        var rij = document.createElement("tr");

        for (var j = 0; j < aantalKolommen; j++) {

            var cel = document.createElement("td");


            cel.className = "Kaart gesloten";
            cel.innerHTML = '<span id="voorkant"></span><span id="achterkant"></span>';
            rij.appendChild(cel);
        }
        speelbordTabel.appendChild(rij);
    }

    kaarten = document.querySelectorAll('.Kaart');
    kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
    kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
}

// Afmeting memory keuze:

async function maakInstellingAfmetlingSpeelbord(player) {
    var game = document.getElementById(player);
    var keuze = document.getElementById('Speelbord');

    keuze.addEventListener("click", async () => {
        var label = document.getElementById("Labelinstelling3");
        var voorTekst = "Achterkant: "
        var achterTekst = " gekozen";

        label.innerHTML = voorTekst + keuze.value + achterTekst;
    });


    game.addEventListener("click", async () => {
        var label = document.getElementById("Labelinstelling3");
        var voorTekst = "Achterkant: "
        var achterTekst = " gekozen";
        console.log(keuze.value);
        switch (keuze.value) {

            case "4x4":
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                aantalRijen = 4
                aantalKolommen = 4;
                aantalKaarten = aantalKolommen * aantalRijen;
                genereerSpeelbord(aantalRijen, aantalKolommen);
                break;

            case "6x6":


                label.innerHTML = voorTekst + keuze.value + achterTekst;

                aantalRijen = 6;
                aantalKolommen = 6;
                aantalKaarten = aantalKolommen * aantalRijen;
                genereerSpeelbord();
                break;

            case "8x8":

                label.innerHTML = voorTekst + keuze.value + achterTekst;
                aantalRijen = 8
                aantalKolommen = 8;
                aantalKaarten = aantalKolommen * aantalRijen;
                genereerSpeelbord(aantalRijen, aantalKolommen);

                break;
            default:
                label.innerHTML = voorTekst + keuze.value + achterTekst;
                aantalRijen = 6;
                aantalKolommen = 6;
                aantalKaarten = aantalKolommen * aantalRijen;
                genereerSpeelbord();


                break;
        }
    });


}

function Maakklikactie() {
    kaarten = document.querySelectorAll('.Kaart');
    kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
    kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');

    kaarten.forEach(kaart => kaart.addEventListener('click', flipKaart));
}




function verwijderInstellingen() {
    var keuze = document.getElementById("PlaatjesKeuze");
    var keuze2 = document.getElementById('Kaartsoort');
    var keuze3 = document.getElementById('Speelbord');
    keuze.disabled = true;
    keuze2.disabled = true;
    keuze3.disabled = true;
}

function verlopenTimer() {


    ++totaleSeconden;
    var uur = Math.floor(totaleSeconden / 3600);
    var minuten = Math.floor((totaleSeconden - uur * 3600) / 60);
    var seconden = totaleSeconden - (uur * 3600 + minuten * 60);


    if (uur < 10)
        uur = "0" + uur;
    if (minuten < 10)
        minuten = "0" + minuten;
    if (seconden < 10)
        seconden = "0" + seconden;


    document.getElementById("Verlopen").innerHTML = uur + ":" + minuten + ":" + seconden;
    document.getElementById("Verlopentotaal").innerHTML = uur + ":" + minuten + ":" + seconden;
}