// src/ConcertTicketApp.js
import React, { useEffect, useState } from 'react';
import { concertTicketContract } from '../../src/web3';  // Import the contract instance you exported in the previous step

function ConcertTicketApp() {
    const [ticketPrice, setTicketPrice] = useState(null);

    useEffect(() => {
        const fetchTicketPrice = async () => {
            const price = await concertTicketContract.methods.getTicketPrice().call();
            setTicketPrice(price);
        };

        fetchTicketPrice();
    }, []);

    return (
        <div>
            <h1>Concert Ticket DApp</h1>
            <p>Ticket Price: {ticketPrice ? ticketPrice : 'Loading...'}</p>
            {/* You can add more functionality here as needed */}
        </div>
    );
}

export default ConcertTicketApp;
