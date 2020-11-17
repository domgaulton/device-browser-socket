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
      <React.Fragment>
        <QRCode code={fireStore.pageId} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div style={{position: 'absolute', color: 'white'}}>
          <p>We Are Live!</p>
          <p>{fireStore.orientation.alpha}</p>
          <p>{fireStore.orientation.beta}</p>
          <p>{fireStore.orientation.gamma}</p>
        </div>
        <Three x={fireStore.orientation.beta} y={fireStore.orientation.gamma} z={fireStore.orientation.alpha} />
      </React.Fragment>
    )
  );
}

export default App;
