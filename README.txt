Note :- Project Id and seed phrase is secrets file is removed for privacy

FOR PUBLIC NETWORK(Ropsten test network)
 
truffle Ethereum - Covid19_blockchain

 Run `npm install truffle-hdwallet-provider`

for 1st run
1. run `truffle compile`

2. Run `truffle develop`, then list of 10 accounts will come ,take any account and copy it.Also remember the private key corresponding to that account.
 Paste the account on  https://faucet.ropsten.be  and click on send ether
3. Run `truffle migrate --reset --network ropsten`
4. Run `npm install`
5. Run `npm run build`
6. Run 'npn run bundle'
7. run `npm start`                        // This will be hosted at http://localhost:8080/

8. on metamash selct Ropsten test network
9. import account, enter the private key from step 3.

Afterwards
1. run `truffle compile`
2. Run `truffle migrate --reset --network ropsten`
3. Run `npm run build`
4. run `npm start`


Optional- Run `truffle test` on command line to test.

To publish on IPFS/IPNS
1. run `truffle compile`

2. Run `truffle develop`, then list of 10 accounts will come ,take any account and copy it.Also remember the private key corresponding to that account.
 Paste the account on  https://faucet.ropsten.be  and click on send ether
3. Run `truffle migrate --reset --network ropsten`
4. Run `npm install`
5. Run `npm run build`
6. Run Ipfs
7. on command prompt ./ipfs add -r public
8. Then go inside st folder `cd st`
9. Run `./ipfs add -r publicc`

To publish on ipfs

10. Then on web browser, https://gateway.ipfs.io/ipfs/COPY PUBLIC HASH HERE
// This will publish on ipfs

Note: To publish on IPNS

10. On command prompt ./ipfs name publish COPY PUBLIC HASH HERE
11. Then on web browser, https://gateway.ipfs.io/ipns/COPY PEERID HASH HERE
// This will publish on ipns

To use Pinata as a pinning service for ipfs

Go to https://pinata.cloud/
Go to Pinata Upload tab.
Upload both public folder and st/publicc to pinata.
Them in Pin explorer tab, you will hash for both folders, click on the hash, It will open the website.




TO INSTALL IPFS
choco install ipfs-desktop
https://github.com/ipfs-shipyard/ipfs-desktop

