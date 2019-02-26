pragma solidity >= 0.5.0;

contract Complaint {
    struct ComplaintInfo{
        uint complaintId;
        bytes32 candidateEmail;
        string complain;
        bytes10 status;
    }
    uint public ComplaintCount;
    
    mapping (uint => ComplaintInfo) public Complaints;
    
    function addComplaint(bytes32 _candidateEmail,string memory _complain) public {
        ComplaintCount++;
        Complaints[ComplaintCount] = ComplaintInfo(ComplaintCount,_candidateEmail,_complain,"Pending");
    }
}