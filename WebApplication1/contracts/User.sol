pragma solidity >=0.5.0;

contract User {
    struct userInfo{
        bytes32 name;
        bytes32 email;
        bytes32 contactNo;
        bytes13 cnic;
        bytes6 gender;
        bytes32 password;
        bytes9 userType; 
    }

    mapping (bytes32 => userInfo) public Users;

    function registerUser(bytes32 _name,bytes32 _email,bytes32 _contactNo,bytes13 _cnic,bytes6 _gender,bytes9 _password) public{
        Users[_email] = userInfo(_name,_email,_contactNo,_cnic,_gender,_password,"Candidate");
    }

    function userLogin(bytes32 _email,bytes32 _password) public view returns(bytes9) {
        if(Users[_email].email == _email && Users[_email].password == _password)
        {
            return Users[_email].userType;
        }
        else
        {   
            return "Wrong";
        }
    }
}