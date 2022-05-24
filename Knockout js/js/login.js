function Login() {

this.credentials = {
    username : ko.observable(),
    password : ko.observable()
}
this.flag = ko.observable(false);
    
    
    this.login = () => {
        this.flag(false);
        console.log(ko.toJSON(this.credentials))
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ko.toJSON(this.credentials),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.login == 'Success'){
                    sessionStorage.setItem("AuthenticationState", "Authenticated");
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("user_id", data.username);
                    window.location.href = './products.html';
                }
                else{
                    this.flag(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
        });
     };

}
ko.applyBindings(new Login());