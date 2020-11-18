import React, { useEffect, useContext } from 'react';
import QRCode from '../QRCode/qr-code';
import { FirebaseConsumer } from "../../context/FirebaseProvider";
import Three from '../Three/three'

function App(props) {
  const { fireStore, createPage } = useContext(FirebaseConsumer);

  useEffect(() => {
    const dateId = Date.now().toString();
    createPage(dateId);
  }, [createPage]);

  return (
    !fireStore.pageActive ? (
      <div className="dbs-qr-code" style={{ position: 'absolute', top: '0', right: '0', bottom: '10%', left: '0' }}>
        <h4>Use a device with motion detection to scan the QR code below</h4>
        <QRCode code={fireStore.pageId} />
      </div>
    ) : (
      <React.Fragment>
        <div style={{position: 'absolute', color: 'white'}}>
          <h2>{!fireStore.deviceReady ? 'Awaiting Device...' : 'We Are Live!'}</h2>
          <p>alpha: {fireStore.orientation.alpha}</p>
          <p>beta: {fireStore.orientation.beta}</p>
          <p>gamma: {fireStore.orientation.gamma}</p>
        </div>
        <Three x={fireStore.orientation.beta} y={fireStore.orientation.gamma} z={fireStore.orientation.alpha} />
      </React.Fragment>
    )
  );
}

export default App;
