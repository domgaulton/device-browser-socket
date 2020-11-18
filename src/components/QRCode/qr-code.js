import React, {useState} from 'react';
import QRCode from "react-qr-code";

function QRCodeWrapper(props) {
  const [displayUrl, setDisplayUrl] = useState(false)
  const url = `${process.env.REACT_APP_URL}${props.code}`
  return (
    <div className="dbs-qr-code" onClick={() => setDisplayUrl(!displayUrl)}>
      <QRCode value={url}  />
      {displayUrl && <h2><a href={url}>{props.code}</a></h2>}
    </div>
  );
}

export default QRCodeWrapper;
