function Register()
{
    var f = document.getElementsByTagName('form')[0];
    if (!f.checkValidity()) {
        return false;
    }
    $("#registerButton").toggleClass('btn-info');
    $("#registerButton").html('Processing...');
    $("#registerButton").attr('disabled', true);
    var user = {};
    
    user.Name = $("#name").val();
    user.Username = $("#username").val();
    user.Pass = $("#pass").val();
    user.Email = $("#email").val();
    user.Contact = $("#contact").val();
    user.Address = $("#add").val();
    user.Type = 'User';
    
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/Register",
        data: "{user:" + JSON.stringify(user) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response)
        {
            if (response.d === 'OK') {
                swal({
                    title: "Success!",
                    text: "Account Created Successfully!",
                    type: "success"
                }).then(function () {
                    // Redirect the user
                    window.location.href = "login.html";
                });
            }
            else {
                swal("Registration Error", response.d, "error");
            }
        },
        error: function (response) {
            swal("Error Occured", response.responseText, "error");
        },
        failure: function (response) {

            swal("Request Failed", response.responseText, "warning");
        },
        complete: function () {
            $("#registerButton").toggleClass('btn-primary');
            $("#registerButton").html('Register');
            $("#registerButton").attr('disabled', false);
        }
    });
}

function Login() {
    var f = document.getElementsByTagName('form')[0];
    if (!f.checkValidity()) {
        return false;
    }
    $("#loginButton").toggleClass('btn-info');
    $("#loginButton").html('Processing...');
    $("#loginButton").attr('disabled', true);
    var user = {};
    user.Name = '';
    user.Username = $("#username").val();
    user.Pass = $("#pass").val();
    user.Email = '';
    user.Contact = '';
    user.Address = '';
    user.Type = '';

    $.ajax({
        type: "POST",
        url: "WebService1.asmx/Login",
        data: "{user:" + JSON.stringify(user) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null && response.d != null)
            {
                var user = response.d;
                user = JSON.parse(user);
                localStorage.setItem('user', JSON.stringify(user));
                //var user = JSON.parse(localStorage.getItem('user'));
                //alert(typeof (data));
                //console.log(data.Type);
                if (user.Type === 'Admin') {
                    window.location.replace('index.html');
                }
                else if (user.Type === 'User') {
                    window.location.replace('index2.html');
                }
                else {
                    swal("Login Error", response.d, "info");
                }
            }
        },
        error: function (response) {
            swal("Error Occured", response.responseText, "error");
        },
        failure: function (response) {

            swal("Request Failed", response.responseText, "warning");
        },
        complete: function () {
            $("#loginButton").toggleClass('btn-primary');
            $("#loginButton").html('Login');
            $("#loginButton").attr('disabled', false);
        }
    });
}

