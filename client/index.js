import Web3 from 'web3';
import Covid19_blockchain from '../build/contracts/Covid19_blockchain.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
    const deploymentKey = Object.keys(Covid19_blockchain.networks)[0];
  return new web3.eth.Contract(
      Covid19_blockchain.abi, 
      Covid19_blockchain
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
    const $New_state = document.getElementById('New_state_or_update_state');
    const $New_stateResult = document.getElementById('New_state_or_update_state-result');
    const $Search_statename = document.getElementById('Search_statename');
    const $Search_statenameResult = document.getElementById('Search_statename-result');
    const $Detail_state = document.getElementById('Get_details_for_statename');
    const $Detail_stateResult = document.getElementById('Get_details_for_statename-result');
    const $Delete_state = document.getElementById('Delete_state');
    const $Delete_stateResult = document.getElementById('Delete_state-result');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

    $New_state.addEventListener('submit', (e) => {
    e.preventDefault();
        const name = e.target.elements[0].value;
        const active = e.target.elements[1].value;
        const effect = e.target.elements[2].value;
        const death = e.target.elements[3].value;
        const recover = e.target.elements[4].value;
        const patient=e.target.elements[5].value;
        const doctor=e.target.elements[6].value;
        const hash=e.target.elements[7].value;

        var flag=1;
        var res="abc";
        var msg = name+active.toString()+effect.toString()+death.toString()+recover.toString()+patient+doctor+hash;

        const prefix = "\x19Ethereum signed message:\n" + msg

        web3.eth.sign(prefix, accounts[0]).then(result => {
           res=result;
})
        .catch(_e => {
            flag=0;
            $New_stateResult.innerHTML = `Ooops... there was an error while trying to create new state ${name}`;

        });

        crud.methods.New_entry(name,active,effect,death,recover,patient,doctor,hash,flag).send({from: accounts[0]})
    .then(result => {
      $New_stateResult.innerHTML = `New State ${name}  successfully created`;
    })
    .catch(_e => {
      $New_stateResult.innerHTML = `Ooops... there was an error while trying to create a new state ${name}`;
    });
  });



    $Search_statename.addEventListener('submit', (e) => {
    e.preventDefault();
    const statename = e.target.elements[0].value;
        crud.methods.Search_statename(statename).call()
    .then(result => {
        $Search_statenameResult.innerHTML = `   
${result[2]}   = ${result[3]} ,
${result[4]}   = ${result[5]} , 
${result[6]}   = ${result[7]} ,
${result[8]}   = ${result[9]} ,
${result[10]}  = ${result[11]}`;
    })
    .catch(_e => {
      $Search_statenameResult.innerHTML = `Ooops... there was an error while trying to read state name ${statename}`;
    });
  });

    $Detail_state.addEventListener('submit', (e) => {
    e.preventDefault();
        const name = e.target.elements[0].value;
        crud.methods.getAll(name).call()
    .then(result => {
      $Detail_stateResult.innerHTML = JSON.stringify(result, null, 2);;
    })
    .catch(_e => {
      $Detail_stateResult.innerHTML = `Ooops... there was an error while trying to fetch details of the state ${name}`;
    });
  });

    $Delete_state.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
          var msg = name;

        const prefix = "\x19Ethereum signed message:\n" + msg
        var flag=1;
        web3.eth.sign(prefix, accounts[0]).then(
        ).catch(_e => {
             flag=0;
            $Delete_stateResult.innerHTML = `Ooops... there was an error while trying to delete state ${name}`;

        });
        crud.methods.Delete_state(name,flag).send({from: accounts[0]})
    .then(result => {
      $Delete_stateResult.innerHTML = `Deleted state ${name}`;
    })
    .catch(_e => {
      $Delete_stateResult.innerHTML = `Ooops... there was an error while trying to delete state ${name}`;
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
        .catch(e => console.log(e.message));
   
});