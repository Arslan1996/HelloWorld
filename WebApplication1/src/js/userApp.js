App = {
    web3Provider: null,
    contracts: {},
    account:'0x0',
    UserInstance:{},
    init: function() {
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
        $.getJSON("User.json", function(User) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.User = TruffleContract(User);
          // Connect provider to interact with contract
          App.contracts.User.setProvider(App.web3Provider);
          web3.eth.getCoinbase(function(err,account){
            if(err===null)
              App.account = account;
            else
              alert(err);
          });
        });
        return App.render();
      },
      render: function(){
          
        //console.log(web3.toHex('f158012@nu.edu.pk'));
      },
      register: function() {
        App.contracts.User.deployed().then(function(instance){
            App.UserInstance = instance;
            instance.registerUser(web3.toHex($('#name').val()),web3.toHex($('#email').val()),web3.toHex($('#contact').val()),web3.toHex($('#CNIC').val()),web3.toHex($('#gender').val()),web3.toHex($('#pass').val())).then(function(result){alert(result.tx);}).catch(function(error) {console.log(error);});
        });        
      },
      Login: function() {
        App.contracts.User.deployed().then(function(instance){
            instance.userLogin(web3.toHex($('#email').val()),web3.toHex($('#pass').val())).then(function(result){
              console.log(result);
              if(web3.toUtf8(result)!="Wrong")
              {
                alert(web3.toUtf8(result));
              }else{
                alert("Invalid Credentials");
              }
            }).catch(function(error) {console.log(error);});
        });        
      }  
};

$(function() {
    $(window).on('load',function() {
      App.init();
    });
});
  