// src/web3.js
import Web3 from 'web3';
import concertTicketABI from './concertTicketABI.json';
import { contractAddress } from './contractAddress';

let web3;
let concertTicketContract;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    concertTicketContract = new web3.eth.Contract(concertTicketABI, contractAddress);
} else {
    console.error("Metamask not found! Install or enable Metamask to interact with the blockchain.");
}

export { web3, concertTicketContract };