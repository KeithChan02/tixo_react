import React, { useState, useEffect } from 'react';
import getWeb3 from './utils/getWeb3';
import getContract from './utils/getContract';
import concertTicketABI from './concertTicketABI.json';   


const contractAddress = "0x4Afd882870AE8Aa44cd785B0977Fa5C86dB5d872";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [ticketId, setTicketId] = useState('');
  const [price, setPrice] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('FLR');
  const [merchandiseId, setMerchandiseId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [eventId, setEventId] = useState('');
  const [organizerAddress, setOrganizerAddress] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [refundTicketId, setRefundTicketId] = useState('');


  // Initialize web3, contract, and accounts
  const initialize = async () => {
    const web3Instance = await getWeb3();
    const contractInstance = getContract(web3Instance, concertTicketABI, contractAddress);
    const accountsInstance = await web3Instance.eth.getAccounts();

    setWeb3(web3Instance);
    setContract(contractInstance);
    setAccounts(accountsInstance);
  };

  const buyTicket = async () => {
    try {
      await contract.methods.buyTicket(ticketId, price, cryptocurrency).send({ from: accounts[0] });
      console.log("Ticket purchased successfully!");
    } catch (error) {
      console.error("Error buying ticket:", error);
    }
  };

  const purchaseMerchandise = async () => {
    try {
      await contract.methods.purchaseMerchandise(merchandiseId, quantity).send({ from: accounts[0], value: web3.utils.toWei(price, 'ether') });
      console.log("Merchandise purchased successfully!");
    } catch (error) {
      console.error("Error purchasing merchandise:", error);
    }
  };

  const donate = async () => {
    try {
      await contract.methods.donateToOrganizer(eventId).send({ from: accounts[0], value: web3.utils.toWei(donationAmount, 'ether') });
      console.log("Donation made successfully!");
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  const follow = async () => {
    try {
      await contract.methods.followOrganizer(organizerAddress).send({ from: accounts[0] });
      console.log("Followed organizer successfully!");
    } catch (error) {
      console.error("Error following organizer:", error);
    }
  };

  const unfollow = async () => {
    try {
      await contract.methods.unfollowOrganizer(organizerAddress).send({ from: accounts[0] });
      console.log("Unfollowed organizer successfully!");
    } catch (error) {
      console.error("Error unfollowing organizer:", error);
    }
  };

  const refundTicket = async () => {
    try {
      if (!web3 || !accounts || !contract) return;

      // Call the refundTicket function from the smart contract
      await contract.methods.refundTicket(refundTicketId).send({
        from: accounts[0]
      });

      console.log("Refund successful");
    } catch (error) {
      console.error("Error refunding ticket:", error);
    }
  };


  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <h1>Welcome to Tixo!</h1>

      <div>
        <h2>Buy a Ticket</h2>
        <input type="text" placeholder="Ticket ID" onChange={e => setTicketId(e.target.value)} />
        <input type="text" placeholder="Price" onChange={e => setPrice(e.target.value)} />
        <select onChange={e => setCryptocurrency(e.target.value)}>
          <option value="FLR">FLR</option>
          {/* Add other cryptocurrencies if needed */}
        </select>
        <button onClick={buyTicket}>Buy Ticket</button>
      </div>

      <div>
        <h2>Purchase Merchandise</h2>
        <input type="text" placeholder="Merchandise ID" onChange={e => setMerchandiseId(e.target.value)} />
        <input type="number" placeholder="Quantity" onChange={e => setQuantity(e.target.value)} />
        <button onClick={purchaseMerchandise}>Purchase</button>
      </div>

      <div>
        <h2>Donate</h2>
        <input type="text" placeholder="Event ID" onChange={e => setEventId(e.target.value)} />
        <input type="text" placeholder="Amount" onChange={e => setDonationAmount(e.target.value)} />
        <button onClick={donate}>Donate</button>
      </div>

      <div>
        <h2>Follow/Unfollow Organizer</h2>
        <input type="text" placeholder="Organizer Address" onChange={e => setOrganizerAddress(e.target.value)} />
        <button onClick={follow}>Follow Organizer</button>
        <button onClick={unfollow}>Unfollow Organizer</button>
      </div>

      <div>
        <h2>Refund Ticket</h2>
        <input type="text" placeholder="Ticket ID to refund" onChange={e => setRefundTicketId(e.target.value)} />
        <button onClick={refundTicket}>Refund Ticket</button>
      </div>

    </div>
  );
}

export default App;
