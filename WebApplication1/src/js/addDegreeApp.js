addDegreeApp = {
  web3Provider: null,
  contracts: {},
  account:'0x0',
  init: function() {
    console.log("web3");
    return addDegreeApp.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      addDegreeApp.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      addDegreeApp.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(addDegreeApp.web3Provider);
    }
    return addDegreeApp.initContract();
  },

  initContract: function() {
    $.getJSON("DegreeInfo.json", function(DegreeInfo) {
      // Instantiate a new truffle contract from the artifact
      addDegreeApp.contracts.DegreeInfo = TruffleContract(DegreeInfo);
      // Connect provider to interact with contract
      addDegreeApp.contracts.DegreeInfo.setProvider(addDegreeApp.web3Provider);
        web3.eth.getCoinbase(function(err,account){
          if(err===null)
          {
            App.account = account;
          }
          else{
            alert(err);
          }
        return addDegreeApp.render();
      });
    });
  },
  render: function() {
    console.log("aya");
  },
  addDegree: function()
  {
    var f = document.getElementsByTagName('form')[0];
    if (!f.checkValidity()) {
        return false;
    }

    addDegreeApp.contracts.DegreeInfo.deployed().then(function(instance){
       instance.addDegree($('#degreeNo').val(),$('#regNo').val(),$('#studentName').val(),$('#degreeType').val(),$('#degreeMajor').val(),$('#creditHours').val(),$('#completionDate').val(),$('#degreeIssuedDate').val(),{from:App.account}).then(function(result){
         console.log(result.tx);
       }).catch(function(error) {
        alert(error);
      });
    });
  }
};

$(function() {
  $(window).on('load',function() {
    addDegreeApp.init();
  });
});
