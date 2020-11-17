import React from 'react';
import QRCode from "react-qr-code";

function QRCodeWrapper(props) {
  const url = `${process.env.REACT_APP_URL}${props.code}`
  return (
    <div className="dbs-qr-code">
      <QRCode value={url} />
      <h2><a href={url}>{props.code}</a></h2>
    </div>
  );
}

export default QRCodeWrapper;
