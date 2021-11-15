     pragma solidity ^0.5.0;
     pragma experimental ABIEncoderV2;
contract Covid19_blockchain{
    struct Indian{
        uint id;
        string state_name;
        int Covid19_activecases;
        int Covid19_effectedcases;
        int Covid19_deaths;
        int Covid19_recovered;
        uint count;
        
    }
        mapping(uint => mapping(uint => patient_details)) details;
    struct patient_details{
        string pat_id;
        string doc;
        string ha;
        string senderr;
    }

    Indian[] public Indian_states;
    uint public nextid;
    
    function New_entry(string memory state_name,int activecases, int  effectedcases,int Deaths,int   Recovered, string memory  patient_id, string memory doctor__id, string memory hash,int flag) public{
            if(flag==1){
            uint k=findd_id(state_name);
            if(k==1){
            patient_details memory p;
            p.pat_id=patient_id;
            p.doc=doctor__id;
            p.ha=hash;
            p.senderr=toAsciiString(msg.sender);
           
            details[nextid][0]=p;
             uint countt=1;

            Indian_states.push(Indian(nextid,state_name,activecases,effectedcases, Deaths,Recovered,countt));
            nextid++;}
            else
            {
                uint i=find_id(state_name);
              uint j=Indian_states[i].count;
                
                  Indian_states[i].state_name=state_name;
                  Indian_states[i].Covid19_activecases+=activecases;
                  Indian_states[i].Covid19_effectedcases+=effectedcases;
                  Indian_states[i].Covid19_deaths+=Deaths;
                  Indian_states[i].Covid19_recovered+=Recovered;
                  patient_details memory p;
                  p.pat_id=patient_id;
                  p.doc=doctor__id;
                  p.ha=hash;
                  p.senderr=toAsciiString(msg.sender);
                  details[i][j]=p;
                  Indian_states[i].count++;
            }
            }
            else{
                 revert('The transaction was not signed');
            }
            
        }
        function Search_statename(string memory state_name)view public returns(string memory,uint,string memory,string memory,string memory,int,string memory,int,string memory,int,string memory,int){
            
            uint i=find_id(state_name);
                    return("Id",Indian_states[i].id,"State name",Indian_states[i].state_name,"Active cases",Indian_states[i].Covid19_activecases,"Effected cases",Indian_states[i].Covid19_effectedcases,"Deaths",Indian_states[i].Covid19_deaths,"Recovered cases",Indian_states[i].Covid19_recovered);
                
            
        }
        
        function getAll(string memory state_name) view public  returns (string[] memory){
            uint j=find_id(state_name);
    string[] memory ret = new string[](9*Indian_states[j].count);
    uint k=0;
    for (uint i = 0; i < 9*Indian_states[j].count; i+=9) {
        ret[i]="Patient_id";
        ret[i+1] = details[j][k].pat_id;
        ret[i+2]="Doctor_id";
        ret[i+3]=details[j][k].doc;
        ret[i+4]="file_hash";
        ret[i+5]=details[j][k].ha;
        ret[i+6]="sender_address";
        ret[i+7]=details[j][k].senderr;
        ret[i+8]="          ";
        k++;
    }
    return ret;
}
        


        function Delete_state(string memory state_name,int flag)public{
            if(flag==1){
            uint i=find_id(state_name);
                  delete Indian_states[i]; 
            }
            else{
                 revert('The transaction was not signed');
            }
                
            
        }
        function find_id(string memory state_name)view internal returns(uint){
            for(uint i=0;i<Indian_states.length;i++){
                if(keccak256(abi.encodePacked(Indian_states[i].state_name))== keccak256(abi.encodePacked(state_name)))
                {
                    return i;
                }
            }
            revert('This state does not exist in blockchain!');
        }
        function toAsciiString(address x) internal view returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}

function char(bytes1 b) internal view returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
}
         function findd_id(string memory state_name)view internal returns(uint){
             uint k=1;
            for(uint i=0;i<Indian_states.length;i++){
                if(keccak256(abi.encodePacked(Indian_states[i].state_name))== keccak256(abi.encodePacked(state_name)))
                {
                     k=0;
                }
            }
            return k;
           
        }
        
        
        
    
}
        
        
        
