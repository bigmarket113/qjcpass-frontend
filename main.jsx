
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [event, setEvent] = useState('Glory Day 25');
  const [qrCode, setQrCode] = useState(null);

  const handleReserve = async () => {
    // Rediriger vers paiement Wave
    window.open("https://wave.com/pay/+2250141105707", "_blank");

    // Appel backend après paiement
    const res = await fetch("https://qjcpass-api.onrender.com/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, event })
    });
    const data = await res.json();
    setQrCode(data.qr_code_url);
  };

  return (
    <div>
      <h1>🎟️ QJC PASS</h1>
      <p>Réserve ton billet pour {event}</p>
      <input type="text" placeholder="Nom complet" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleReserve}>Réserver et Payer via Wave</button>
      {qrCode && (
        <div>
          <h3>🎫 Ton QR Code :</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
