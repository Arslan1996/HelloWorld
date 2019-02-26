App = {
  web3Provider: null,
  contracts: {},
  account:'0x0',
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
    $.getJSON("Complaint.json", function(Complaint) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Complaint = TruffleContract(Complaint);
      // Connect provider to interact with contract
      App.contracts.Complaint.setProvider(App.web3Provider);
      web3.eth.getCoinbase(function(err,account){
        if(err===null)
        {
          App.account = account;
        }
        else{
          alert(err);
        }
      })
      return App.render();
    });
  },
  render: function() {
  },
  addComplaint: function()
  {
    alert($('#complaint').text());
    App.contracts.Complaint.deployed().then(function(instance){
        instance.addComplaint('f158012@nu.edu.pk',$('#complaint').text());
      }).then(function(result){
          
    });
  }
};

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});
