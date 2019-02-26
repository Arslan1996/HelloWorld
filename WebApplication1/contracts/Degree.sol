pragma solidity >= 0.5.0;

contract DegreeInfo {
    // Model a Degree
    struct Degree {
        uint Id;
        bytes32 degreeNo;
        bytes32 registerationNo;
        bytes32 studentName;
        bytes32 degreeType;
        bytes32 major;
        uint creditHour;
        bytes11 completionDate;
        bytes11 issuanceDate;
        bool isDeleted;
    }
    mapping(uint => Degree) public degrees;
    mapping(bytes32 => uint) public degreesNo;

    uint public degreesCount;
    uint public deletedDegreesCount;

    constructor () public {
        
        addDegree ("16-3810","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3811","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3812","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3813","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3814","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3815","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3816","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3817","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3818","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3819","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3820","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3821","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3822","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3823","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3824","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3825","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3826","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3827","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3828","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3829","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3830","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3831","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3832","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3833","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3834","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014");
        addDegree ("16-3835","12F-8012","Ali","MS","CS",130,"03/11/2014","03/11/2014"); 
    }
    
    function addDegree (bytes32 degreeNo,bytes32 regNO,bytes32 name,bytes32 _type,bytes32 _major,uint _creditHour,bytes11 _completionDate,bytes11 _issuanceDate) public {
        degreesCount++;
        degrees[degreesCount] = Degree(degreesCount,degreeNo,regNO,name,_type,_major,_creditHour,_completionDate,_issuanceDate,false);
        degreesNo[degreeNo] = degreesCount;
    }

    function editDegree (uint Id,bytes32 degreeNo,bytes32 regNO,bytes32 name,bytes32 _type,bytes32 _major,uint _creditHour,bytes11 _completionDate,bytes11 _issuanceDate) public {
        degrees[Id] = Degree(Id,degreeNo,regNO,name,_type,_major,_creditHour,_completionDate,_issuanceDate,false);
    }

    function deleteDegree (uint Id) public {
        deletedDegreesCount++;
        degrees[Id].isDeleted = true;
    }

}