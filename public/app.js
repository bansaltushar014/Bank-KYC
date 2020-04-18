var instance;
fetch('http://localhost:3000/Kyc.json')
    .then(res => {
        return res.text();
    })
    .then(json => {
        var contractAbi = JSON.parse(json);

        var abi = contractAbi.abi;
        // var address = contractAbi.networks['5777'].address;
        var deployments = Object.keys(contractAbi.networks);
        var address = contractAbi.networks[deployments[deployments.length - 1]].address;
        // var address = '0x0E6739f69E8f788B6229Ee3e71F9Ea5435d5a8c3';
        console.log(contractAbi.abi);


        if (window.ethereum) {
            // here goes the request for the metamask
            window.web3 = new Web3(ethereum);
            try {
                ethereum.enable();
                instance = new web3.eth.Contract(abi, address);
                //  console.log("working" + JSON.stringify(instance));
                console.log(instance);
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            if (web3.currentProvider) {
                window.web3 = new Web3(web3.currentProvider);
            } else {
                window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
                console.log("working2");
            }
            // Acccounts always exposed
            //    instance = new web3.eth.Contract(abi, contractAddress);
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }


    });


function verify1() {
    event.preventDefault();
    var indexValue = document.getElementById('index').value;
    var hash = document.getElementById('verify').value;
    console.log("hashs is " + hash + "index "+ indexValue);
    instance.methods.verifyDocument(indexValue,hash).call()
    .then(result => {
        alert("verified");
    })
        

}

function Register() {
    event.preventDefault();
    var aadhar = document.getElementById("aadhar").value;
    var pan = document.getElementById("pan").value;
    var license = document.getElementById("license").value;
    // console.log("aadhar "+ aadhar + "pan "+ pan + "license "+ license);
    aadhar = web3.utils.sha3(aadhar);
    pan = web3.utils.sha3(pan);
    license = web3.utils.sha3(license);

    var hash = aadhar + pan + license;
    hash = web3.utils.sha3(hash);
    // document.getElementById('hashGenerated').appendChild(hash);


    storeDocument(hash);
};

function storeDocument(hash) {
    instance.methods.storeDocument(hash).send({ from: '0xadD2292217dA6B0D93c3b204De770842bDF77198' })
        .then(result => {
            document.getElementById("hashGenerated").innerHTML = hash;
        })

    instance.methods.getId().call()
    .then(result => {
        console.log(result);
    })
};


