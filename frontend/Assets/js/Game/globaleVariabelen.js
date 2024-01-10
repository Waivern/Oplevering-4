/* Door Marcel Bos ITC deeltijd leerjaar 3

globale variabelen*/

var kaarten = document.querySelectorAll('.Kaart');
var laadAnimatie = document.querySelector('.pop-up');
var kaartenAchterkant = document.querySelectorAll('.Kaart #achterkant');
var kaartenVoorkant = document.querySelectorAll('.Kaart #voorkant');

var aantalRijen = 6;
var aantalKolommen = 6;
var aantalKaarten = aantalKolommen * aantalRijen;

var paren = [];
var vorigeLetter = '';
var leegmaken = 0;

// timers
var totaleSeconden = 0;
var timerInterval;

//Colorpickers
let colorPicker;

//Afbeeldingen api's
const willekeurigUrl = 'https://picsum.photos/80';
const kattenUrl = 'https://api.thecatapi.com/v1/images/search';
// katten url heeft api nodig..  'x-api-key'
const apiKattenKey = 'live_ghtZbkoeVo0EharQHJGHxP2zcDAEToRmgoRJ2szZYszSHdlhfN3GAggjlzFbh1tN';