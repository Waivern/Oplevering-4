function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



function loginCheck() {
    let token = localStorage.getItem('token');
    if (token != null) {
        let tokenCheck = parseJwt(token);

        if (tokenCheck.exp < (Date.now() / 1000)) {
            alert('Token is niet meer geldig, u wordt uitgelogd');
            clearInterval(interval);
            window.location.href = "/";
        }
    }
    else {
        alert('U bent niet ingelogd, u wordt nu doorverwezen naar de loginpagina.');
        clearInterval(interval);
        window.location.href = "/";
    }
}

function resterendeTijd() {
    let token = localStorage.getItem('token');

    let tokenCheck = parseJwt(token);
    // console.log(tokenCheck.exp);
    //  console.log(Date.now() / 1000);
    let secondenResterend = Math.round(tokenCheck.exp - (Date.now() / 1000));
    //console.log(secondenResterend);

    let uur = Math.floor(secondenResterend / 3600);
    let minuten = Math.floor((secondenResterend - uur * 3600) / 60);
    let seconden = secondenResterend - (uur * 3600 + minuten * 60);


    if (uur < 10)
        uur = "0" + uur;
    if (minuten < 10)
        minuten = "0" + minuten;
    if (seconden < 10)
        seconden = "0" + seconden;


    document.getElementById("Resterende").innerHTML = uur + ":" + minuten + ":" + seconden;

    // set width of progress bar of secondes seconden resteren / 3600 * 100
    var percentage = secondenResterend / 3600 * 100;
    document.getElementById('progress').style = 'width:' + percentage + '%';


}

//Log uit knop op de game pagina.
var loguit = document.getElementById('uitloggen');

loguit.addEventListener("click", async () => {
    clearInterval(interval);
    localStorage.removeItem('token');
    window.location.href = "/";
});