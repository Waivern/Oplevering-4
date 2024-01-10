/* Door Marcel Bos ITC deeltijd leerjaar 3

Spel gerelateerde functies */

// Als het scherm opent alle letters 1 keer openen en sluiten.
window.onload = function () {
    var count = 0;
    // allereerst een mooie begin animatie
    kaarten.forEach(function (kaart) {
        count = count + 200;
        flipKaartAnimatie(kaart, count);
        count = count + 400;
        //kaart.classList.add('flip');
        unflipKaartAnimatie(kaart, count);
    })
    // setTimeout(unflip, 500);

    maakInstellingAfmetlingSpeelbord('start');
    maakInstellingVoorkantPlaatjes('start');
    maakInstellingAcherkantPlaatjes('start');

    StartColorPickers();



    restInterval = setInterval(resterendeTijd, 1000);
    interval = setInterval(loginCheck, 1000); // check op geldige login elke seconde.
}

// Kijken of er gewonnen is
function ControleSpeelbordvol() {
    var count = 0;
    kaarten = document.querySelectorAll('.Kaart');
    kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
    kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
    for (var i = 0; i < kaarten.length; i++) {

        if (kaarten[i].classList.contains('gevonden')) {
            count++;

        }
        if (count == aantalKaarten) {
            //Felicitaties!! Met ballonnen en draaien van alle kaarten 3 keer diagonaal :D

            console.log("Gefeliciteerd!! " + count + " omgedraaid!");
            document.getElementById('paren').innerHTML = "Alles gevonden!"
            clearInterval(timerInterval);
            kaarten.forEach(function (kaart) {
                var random = Math.floor(Math.random() * 3);
                if (random == 0) {
                    kaart.classList.add('gewonnen');
                }
                if (random == 1) {
                    kaart.classList.add('gewonnenlinks');
                }
                if (random == 2) {
                    kaart.classList.add('gewonnenrechts');
                }
                document.getElementById('gewonnentekst').classList.add('gewonnentekstanimatie');

                document.getElementById('gewonnentekst').style.display = "block";


            });


            return true;
        }
        else {
            document.getElementById('paren').innerHTML = count + " van " + aantalKaarten + " gevonden!"
        }

    }

}

//de functie om een kaart te openen en controles te doen.
function flipKaart() {

    achterkant = this.querySelector('#achterkant');
    voorkant = this.querySelector('#voorkant');

    if (this.classList.contains('open') || (this.classList.contains('gevonden'))) {
        console.log("Kaart is al geopend of gevonden, ik doe niks");
    }
    else {
        //als leegmaken op 1 staat dan de twee (alle kaarten) weer terugdraaien.
        if (leegmaken == 1) {
            var kaarten = document.querySelectorAll('.Kaart');
            var kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
            var kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
            for (var i = 0; i < kaarten.length; i++) {

                if (kaarten[i].classList.contains('open')) {

                    kaartenAchterkant[i].style.display = 'none';
                    kaarten[i].classList.remove('open');
                    kaarten[i].classList.add('gesloten');
                    kaartenVoorkant[i].style.display = 'block';

                }
            }
            leegmaken = 0; // Weer naar 0 zetten, anders voert hij nogmaals de if uit bij het draaien.
        }
        achterkant.style.display = 'block';
        this.classList.add('flip');
        this.classList.remove('gesloten');
        this.classList.add('open');
        setTimeout(unflip, 500);
        voorkant.style.display = 'none';

        const huidigeLetter = achterkant.innerHTML;

        if (huidigeLetter === vorigeLetter) {
            console.log('yes ' + huidigeLetter);
            this.classList.remove('open');
            this.classList.add('gevonden');
            //andere opzoeken die zelfde letter heeft en die dan op gevonden zetten.
            var kaarten = document.querySelectorAll('.Kaart');
            var kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
            var kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');

            for (var i = 0; i < kaarten.length; i++) {

                if (kaartenAchterkant[i].innerHTML == huidigeLetter) {

                    kaarten[i].classList.remove('open');
                    kaarten[i].classList.add('gevonden');
                    kaartenAchterkant[i].style.display = 'block';
                    kaartenVoorkant[i].style.display = 'none';
                }

            }
            //nu even controleren of het speelbord al vol is en anders weer verder
            ControleSpeelbordvol();

        }
        else {
            //als er twee blauw zijn deze weer sluiten met leegmaken bool na klikken op nieuwe kaart
            var count = 0;
            var kaarten = document.querySelectorAll('.Kaart');
            var kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
            var kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');
            //console.log("hallo ik ben erdd");
            for (var i = 0; i < kaarten.length; i++) {

                if (kaarten[i].classList.contains('open')) {
                    count++;
                    //console.log("hallo ik ben er" +count);
                }
                if (count == 2) {
                    leegmaken = 1;
                    break;
                }

            }


        }
        vorigeLetter = huidigeLetter;
        paren.push(huidigeLetter);

    }
}

async function Startgame() {



    verwijderInstellingen();

    //Voeglettertoe();
    document.getElementById('start').innerHTML = "Stop spel";
    // document.getElementById('test').style.display = "none";
    document.getElementById('start').removeEventListener('click', function () {
        Startgame();

    });
    document.getElementById('start').addEventListener('click', () => {
        location.reload(true);
    });

}
// Roep de functies aan bij het starten van het spel en verander de tekst en kleur van de knop
document.getElementById('start').addEventListener('click', function () {
    //Voegplaatjetoe();

    Startgame();

});

//Herlaad scherm na een gewonnen spel.
document.getElementById('restart').addEventListener('click', () => {

    location.reload(true);

});