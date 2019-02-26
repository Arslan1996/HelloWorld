var NoofDegrees = 0,ShowingStart = 1,ShowingEnd = 0,totalpages=0, shownbuttons= 4,gettr;
var ShowingCount=0;
App = {
  web3Provider: null,
  contracts: {},
  degreetable:null,
  account:'0x0',
  delcount:'1',
  init: function() {
    console.log("web3");
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("DegreeInfo.json", function(DegreeInfo) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.DegreeInfo = TruffleContract(DegreeInfo);
      // Connect provider to interact with contract
      App.contracts.DegreeInfo.setProvider(App.web3Provider);
      web3.eth.getCoinbase(function(err,account){
        if(err===null)
        {
          App.account = account;
        }
        else{
          alert(err);
        }
      })
        App.contracts.DegreeInfo.deployed().then(function(instance){
          return instance.deletedDegreesCount();
        }).then(function(deldegcount){
            //alert(deldegcount);
            App.delcount=deldegcount;
          });
      return App.render();
    });
  },
  render: function() {
    App.contracts.DegreeInfo.deployed().then(function(instance){
      DegreeInstance= instance;
        return DegreeInstance.degreesCount();
    }).then(function(degreesCount){
        degreetable = $('#DegreeTable').DataTable({
          "bPaginate": false,
          "bLengthChange": false,
          "bFilter": false,
          "bInfo": false,
          "bAutoWidth": false 
        });

        NoofDegrees = degreesCount-(App.delcount);
        if(degreesCount>=10)
        {
            ShowingEnd =10;
        }
        else{
          ShowingEnd = degreesCount;
        }
        totalpages = degreesCount/10;
        totalpages = parseInt(totalpages);
        if(degreesCount%10!=0)
        totalpages++;
        if(shownbuttons*10>degreesCount)
        {
          var i=1;
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
        }
        for (var i = 1; i <= ShowingEnd; i++) {
            DegreeInstance.degrees.call(i).then(function(Degree) {
              if(Degree[9]==false)
              {
                degreetable.row.add([Degree[0],web3.toUtf8(Degree[1]),web3.toUtf8(Degree[2]),web3.toUtf8(Degree[3]),web3.toUtf8(Degree[4]),web3.toUtf8(Degree[5]),Degree[6],web3.toUtf8(Degree[7]),web3.toUtf8(Degree[8]),"<td class='text-center'><div class='btn-group'><button  data-toggle='modal' data-target='#degreeEditModel' class='btn-white btn btn-xs'><i class='fa fa-edit' style='font-size:16px'></i></button><button onclick='App.deleteDegree(this)' style='margin-left:4px' class='btn-white btn btn-xs'><i class='fa fa-trash' style='font-size:16px;color:red'></i></button></div></td>"]).draw('false');              
                ShowingCount++;
              }
              $('#entites').text("Showing 1 to "+ShowingCount+" of "+NoofDegrees+" entries");
            });
        }
    }).catch(function(error) {
      console.warn(error);
    });
  },
  getDegrees: function()
  {
    ShowingCount = 0;
    degreetable.clear().draw();
    for (var i = ShowingStart; i <= ShowingEnd; i++) {
      DegreeInstance.degrees(i).then(function(Degree) {
        if(Degree[9]==false)
        {
          degreetable.row.add([Degree[0],web3.toUtf8(Degree[1]),web3.toUtf8(Degree[2]),web3.toUtf8(Degree[3]),web3.toUtf8(Degree[4]),web3.toUtf8(Degree[5]),Degree[6],web3.toUtf8(Degree[7]),web3.toUtf8(Degree[8]),"<td class='text-center'><div class='btn-group'><button  data-toggle='modal' data-target='#degreeEditModel' class='btn-white btn btn-xs'><i class='fa fa-edit' style='font-size:16px'></i></button><button onclick='App.deleteDegree(this)' style='margin-left:4px' class='btn-white btn btn-xs'><i class='fa fa-trash' style='font-size:16px;color:red'></i></button></div></td>"]).draw('false');              
          ShowingCount++;
        }
          var msg = "Showing "+ShowingStart+" to "+((ShowingStart-1)+ShowingCount)+" of "+NoofDegrees+" entries";
          $('#entites').text(msg);
      });
    }
  },
  getDegree: function()
  {
    var degreeNO = $('#searchdegreeNo').val();
    degreetable.clear().draw();
      DegreeInstance.degreesNo(degreeNO).then(function(Id) {
      $('#viewAllDegrees').show();
      $('#datatablepagination').hide();
        if(Id!=0)
        {
            DegreeInstance.degrees(Id).then(function(Degree){
              if(Degree[9]==false)
              {
                degreetable.row.add([Degree[0],web3.toUtf8(Degree[1]),web3.toUtf8(Degree[2]),web3.toUtf8(Degree[3]),web3.toUtf8(Degree[4]),web3.toUtf8(Degree[5]),Degree[6],web3.toUtf8(Degree[7]),web3.toUtf8(Degree[8]),"<td class='text-center'><div class='btn-group'><button  data-toggle='modal' data-target='#degreeEditModel' class='btn-white btn btn-xs'><i class='fa fa-edit' style='font-size:16px'></i></button><button onclick='App.deleteDegree()' style='margin-left:4px' class='btn-white btn btn-xs'><i class='fa fa-trash' style='font-size:16px;color:red'></i></button></div></td>"]).draw('false');              
                $('#entites').text('Showing 1 to 1 of '+NoofDegrees);
              }
              else{
                $('#entites').text('Showing 0 to 0 of '+NoofDegrees);
              }
          });
        }else{
          $('#entites').text('Showing 0 to 0 of '+NoofDegrees);
        }
      });
  },
  editDegree: function()
  {
      var degreeId =$('#degreeId').text();
        DegreeInstance.editDegree(degreeId,$("#degreeNo").val(),$("#regNo").val(),$("#degreeStudentname").val(),$("#degreeType").val(),$("#major").val(),$("#creditHours").val(),$("#completionDate").val(),$("#issuanceDate").val(),{from:App.account}).then(function(result){console.log(result.tx);
        gettr.eq(1).text($('#degreeNo').val());
        gettr.eq(2).text($('#regNo').val());
        gettr.eq(3).text($('#degreeStudentname').val());
        gettr.eq(4).text($('#degreeType').val());
        gettr.eq(5).text($('#major').val());
        gettr.eq(6).text($('#creditHours').val());
        gettr.eq(7).text($('#completionDate').val());
        gettr.eq(8).text($('#issuanceDate').val()); 
      }); 
  },
  deleteDegree: function(abc)
  {
      var degreeId = gettr.eq(0).text();
      //alert(degreeId);
        DegreeInstance.deleteDegree(degreeId,{from:App.account}).then(function(result){alert(result.tx); location.reload();}).catch(function(error) {
        alert(error);
      });
      //gettr.remove();
      //alert("Deleted Successfully");
  }
};

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});
