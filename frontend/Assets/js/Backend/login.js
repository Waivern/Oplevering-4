async function inloggen() {

    var knop = document.getElementById('inloggen');

    knop.addEventListener("click", async () => {

        laadAnimatie.style.display = 'block';
        document.body.style.overflow = "hidden";
        let players = document.getElementById('players');
        let inputBorders = document.querySelectorAll('.border');

        var form = document.getElementById("form");
        var formData = new FormData(form);

        var enteredUsername = formData.get("username");
        var enteredPassword = formData.get("password");

        console.log("Entered Username: " + enteredUsername);
        console.log("Entered Password: " + enteredPassword);


        try {
            const response = await fetch("http://localhost:8000/api/login_check", {
                method: "POST",
                body: JSON.stringify({

                    username: enteredUsername,
                    password: enteredPassword
                }),

                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            );

            console.log("call = " + response + "\n Status: " + response.status);

            if (response.status === 200) {


                const jsonResponse = await response.json();
                localStorage.setItem('token', jsonResponse['token']);
                let token = localStorage.getItem('token');
                console.log(token);
                window.location.href = "/game.html";

            }


            else if (response.status === 401) {
                laadAnimatie.style.display = 'none';
                document.body.style.overflow = null;

                let error = document.getElementById("error");
                error.style.display = 'block';
                inputBorders.forEach(element => {
                    element.style.border = "2px solid red";

                    setTimeout(() => {
                        element.style.border = "";
                        error.style.display = 'none';
                    }, 3000);
                });
            }
        } catch (error) {
            console.error("Fout tijdens fetch: ", error);
        }
    });

}
inloggen();

//Registreer knop om naar de registreer pagina te gaan.
var nieuwAccount = document.getElementById('registreren');

nieuwAccount.addEventListener("click", async () => {

    localStorage.clear();
    window.location.href = "/Register.html";
});