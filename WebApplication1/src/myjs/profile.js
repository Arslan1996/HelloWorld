function setUserName()
{
    var user = JSON.parse(localStorage.getItem('user'));
    $("#CurrentUserName").text(user.Name);
    $("#CurrentUserType").text(user.Type).append('<b class="caret"></b>');
}

window.onload = function()
{
    setUserName();
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == 'profile.html' || page == 'profile2.html')
    {
        setUserProfile();
    }
}

function setUserProfile() {
    $(document).ready(function () {
        var user = JSON.parse(localStorage.getItem('user'));
        $("#Username").val(user.Username).attr('readonly',true);
        $("#Name").val(user.Name);
        $("#Email").val(user.Email);
        $("#Contact").val(user.Contact);
        $("#Address").val(user.Address);
    });
}

function updateprofile()
{
    
    var user1 = JSON.parse(localStorage.getItem('user'));
    var user = {};
    user.Username = $("#Username").val();
    user.Name = $("#Name").val();
    user.Email = $("#Email").val();
    user.Contact = $("#Contact").val();
    user.Address = $("#Address").val();
    user.Type = 'User';
    user.Password = user1.Password;
    
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/updateProfile",
        data: "{user:" + JSON.stringify(user) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            
            if (response != null && response.d != null) {
                var user = response.d;
                user = JSON.parse(user);
                localStorage.setItem('user', JSON.stringify(user));
                location.reload();
            }
        },
        error: function (response) {
            swal("Error Occured", response.responseText, "error");
        },
        failure: function (response) {

            swal("Request Failed", response.responseText, "warning");
        },
        complete: function () {
        }
    });
}