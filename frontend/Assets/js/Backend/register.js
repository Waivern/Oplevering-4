async function registreer() {

    var regristreerKnop = document.getElementById('opslaan');




    regristreerKnop.addEventListener("click", async () => {

        laadAnimatie.style.display = 'block';
        document.body.style.overflow = "hidden";



        var form = document.getElementById("registreerform");
        var formData = new FormData(form);

        var enteredUsername = formData.get("username");
        var enteredPassword = formData.get("password");
        var enteredEmail = formData.get("email");

        console.log("Entered Username: " + enteredUsername);
        console.log("Entered Password: " + enteredPassword);
        console.log("Entered email: " + enteredEmail);
        let boolUserBestaat = await controleerOfUserBestaat(enteredUsername, enteredPassword);
        if (!boolUserBestaat) {
            try {

                const response = await fetch("http://localhost:8000/register", {
                    method: "POST",
                    body: JSON.stringify({

                        username: enteredUsername,
                        email: enteredEmail,
                        password: enteredPassword
                    }),
                    headers: {

                        'Content-type': 'application/json; charset=UTF-8',
                    }



                }
                );

                console.log(response + response.status);

                if (response.status === 201) {

                    laadAnimatie.style.display = 'none';
                    document.body.style.overflow = null;
                    localStorage.clear();
                    window.location.href = "/";



                }


                else if (response.status === 400) {
                    laadAnimatie.style.display = 'none';
                    document.body.style.overflow = null;




                }
            } catch (error) {
                console.error("Fout tijdens registratie: ", error);
            }
        }
        else {
            // gebruiker bestaat al en wordt niet aangemaakt.
            laadAnimatie.style.display = 'none';
            document.body.style.overflow = null;
            let inputBorders = document.querySelectorAll('.border');
            let error = document.getElementById("error");
            error.style.display = 'block';
            inputBorders.forEach(element => {
                element.style.border = "2px solid red";

                setTimeout(() => {
                    element.style.border = "";
                    error.style.display = 'none';
                }, 6000);

            });

        }
    });

}


async function controleerOfUserBestaat(user, pass) {

    try {
        const response = await fetch("http://localhost:8000/api/login_check", {
            method: "POST",
            body: JSON.stringify({

                username: user,
                password: pass
            }),

            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        );

        if (response.status === 200) {


            const jsonResponse = await response.json();
            localStorage.setItem('token', jsonResponse['token']);
            let token = localStorage.getItem('token');
            console.log(token);
            return true;

        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fout tijdens Controle user: ", error);
    }



}




registreer();
//Registreer knop om naar de registreer pagina te gaan.
var terug = document.getElementById('terug');

terug.addEventListener("click", async () => {

    localStorage.clear();
    window.location.href = "/";
});