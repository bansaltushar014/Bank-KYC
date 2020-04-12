pragma solidity >=0.4.25 <0.7.0;


contract Kyc {

    mapping(uint => string) documents;


    function storeDocument(uint id, string memory docHash) public {

        documents[id] = docHash;
    }

    function verifyDocument(uint id, string memory hashToVerify) view public returns (bool){
        if(keccak256(abi.encodePacked(documents[id])) == keccak256(abi.encodePacked(hashToVerify))) {
            return true;
        }
        else{
            return false;
        }
     }
}
