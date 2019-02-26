$(document).ready(function(){
    function getDegreesonPage()
    {
        $('#tablepagination .btn').removeClass("active");
            ShowingEnd = ShowingStart*10;
            if(ShowingEnd>NoofDegrees)
            {
                ShowingEnd = NoofDegrees;
            }
            ShowingStart--;
            ShowingStart = ShowingStart*10;
            ShowingStart++;
            App.getDegrees();
    }
    $('#tablepagination .btn').bind("click",function(){
       if($(this).attr('id')!='previous'&&$(this).attr('id')!='next')
       {
            $(this).addClass("active");
            ShowingStart = $(this).text();
            getDegreesonPage();
       } 
       else 
       {
            $('#tablepagination .btn').removeClass("active");
            $('#first').addClass('active');
            if($(this).attr('id')=='next')
            {
                var i = $('#forth').text();
                i++;
                ShowingStart = $('#forth').text();
                $('#tablepagination .btn').each(function(){
                    if($(this).attr('id')!="previous"&&$(this).attr('id')!="next")
                    {
                        if(totalpages<i)
                        {
                        $('#next').attr("disabled",true);
                        $(this).hide();
                        }
                        else{
                        $(this).text(i);
                        }
                        i++;
                    }
                });
                if(totalpages<=i)
                {
                    $('#next').attr("disabled",true);  
                }
                ShowingStart++;
                getDegreesonPage();
            }
            else{
                var i = $('#first').text();
                var j=i-4;
                ShowingStart = j;
                $('#tablepagination .btn').each(function(){
                    if($(this).attr('id')!="previous"&&$(this).attr('id')!="next")
                    {
                        $(this).text(j);
                        $(this).show();
                        j++;
                    }
                });
                getDegreesonPage();
            }
       }
       if($('#first').text()=="1"&&($('#first').text()==totalpages||$('#second').text()==totalpages||$('#third').text()==totalpages||$('#forth').text()==totalpages)){
            $('#next').attr("disabled");
            $('#previous').attr("disabled");
       }
       else if($('#first').text()!="1"&&$('#first').text()!=totalpages&&$('#second').text()!=totalpages&&$('#third').text()!=totalpages&&$('#forth').text()!=totalpages){
            $('#next').removeAttr("disabled");
            $('#previous').removeAttr("disabled");
       }
       else if($('#first').text()!="1")
       {    $('#next').attr("disabled",true);
            $('#previous').removeAttr("disabled");
       }
       else if($('#first').text()!=totalpages&&$('#second').text()!=totalpages&&$('#third').text()!=totalpages&&$('#forth').text()!=totalpages)
       {
           alert(totalpages);
            $('#previous').attr("disabled",true);
            $('#next').removeAttr("disabled");    
       }
    });
});