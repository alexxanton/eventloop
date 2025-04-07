import React from 'react';
import QRCode from 'react-qr-code';

const MiComponente = () => {
  return (
    <div>
      <h1>Generador de Código QR</h1>
      <QRCode value="https://mi-sitio-web.com" />
    </div>
  );
}

export default MiComponente;


