function getusers() {
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/getUsers",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var jsonData = JSON.parse(response.d);
            for (var i = 0; i < jsonData.length; i++) {
                $('#Users').append("<div class='col-lg-3 c'><div class='contact-box center-version'>" +
                    "<a href='#'><img alt='image' class='img-circle' src='img/user.png'><h3 class='m-b-xs'><strong>" +
                    jsonData[i].Name + "</strong></h3><div class='font-bold'>" +
                    jsonData[i].Type + "</div><address class='m-t-md'>" +
                    "<br><lable class='user'>" + jsonData[i].Username +"</lable><br>"+
                    jsonData[i].Address + " <br><abbr title='Phone'>P:</abbr> " +
                    jsonData[i].Contact+ "</address></a></div></div>");
            }
            $(".c").click(function () {
                alert($(this).find(".user").text());
            });
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}