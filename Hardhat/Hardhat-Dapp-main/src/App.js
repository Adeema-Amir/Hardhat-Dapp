/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import contract from "./Lock.sol/Lock.json";

function App() {
  const { ethereum } = window;
  const [address, setAddress] = useState('Connect Wallet');
  const [balance, setBalnce] = useState('');
  const [greeting, setGreeting] = useState('');

  const contractAddress = "0x383Bfd0605411451879B0f2Ae425eeAb5Cf802A5";

  const alchemyProvider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/S9LIRx84q709zuJvCPZhjvQ_wix27p_8"
  );
  const walletProvider = new ethers.providers.Web3Provider(
    ethereum
  );

  const getContractData = new ethers.Contract(
    contractAddress,
    contract.abi,
    alchemyProvider
  )

  const sendContracttx = new ethers.Contract(
    contractAddress,
    contract.abi,
    (walletProvider.getSigner())
  )

  useEffect(() => {
    ethereum.on("accountsChanged", (accounts) => {

      setAddress(accounts[0]);
      const getbal = async () => {
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], 'latest']
        })
        setBalnce(ethers.utils.formatEther(balance));
      }
      getbal();
    })
    ethereum.on("chainChanged", (chain) => {
      console.log(chain);
    });
  });

  const getGreeting = async () => {
    const data = await getContractData.greet();
    setGreeting(data);
  };

  const setData = async () => {
    // const sendData = await sendContracttx.setGreeting("السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ", {
    //   value: ethers.utils.parseEther('0.1')
    // })
    const sendData = await sendContracttx.setGreeting("السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ");
  };

  const chainChange = async (chain) => {
    // await ethereum.request({
    //   method: "wallet_addEthereumChain",
    //   params: [
    //     {
    //       chainId: `0x13881`,
    //       // chainId: `0x${Number(80001).toString(16)}`,
    //       chainName: "Polygon Testnet",
    //       nativeCurrency: {
    //         name: "MATIC",
    //         symbol: "MATIC",
    //         decimals: 18,
    //       },
    //       rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    //       blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    //     }
    //   ]
    // });
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: `0x13881`,
        }
      ]
    });
  };


  const sendTx = async () => {
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          to: '0x8F6b10E06e307a5d17493F02E2f4B03DB7606018',
          from: address,
          // value: '0xDE0BCB3A7640000',
          value: `0x${(parseInt(ethers.utils.parseEther('0.1'))).toString(16)}`,
          chainId: '0x3'
        }
      ]
    })
  };

  const requsetAccount = async () => {
    // await ethereum.request({
    //   method: "wallet_requestPermissions",
    //   params: [{
    //     eth_accounts: {}
    //   }]
    // });

    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    // console.log(accounts);
    setAddress(accounts[0]);
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], 'latest']
    })
    setBalnce(ethers.utils.formatEther(balance));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <a
          className="App-link"
          onClick={requsetAccount}
        >
          {address}
        </a>
        <br />
        <a
          className="App-link"
        >
          {balance}
        </a>
        <br />
        <a
          className="App-link"
          onClick={sendTx}
        >
          Send Transaction
        </a>
        <br />
        <a
          className="App-link"
          onClick={getGreeting}
        >
          Get Greeting
        </a>
        <br />
        <a
          className="App-link"
          onClick={setData}
        >
          Set Greeting
        </a>
        <br />
        <a
          className="App-link"
        >
          {greeting}
        </a>
        <br />
        <a
          className="App-link"
          onClick={chainChange}
        >
          Add Chain
        </a>
        <br />
      </header>
    </div>
  );
}

export default App;

// Deployed Address:
// 0x383Bfd0605411451879B0f2Ae425eeAb5Cf802A5