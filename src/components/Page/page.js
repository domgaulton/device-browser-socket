import React, { useState, useEffect, useContext } from 'react';
import { FirebaseConsumer } from "../../context/FirebaseProvider";
import Three from '../Three/three'

function Page(props) {
  const [deviceDetection, setDeviceDetection] = useState(false);
  const [orientation, setLocalOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })
  const pageId = props.match.params.pageId;
  const { fireStore, setPageActive, setOrientation } = useContext(FirebaseConsumer);

  const acceptDevice = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          if (window.DeviceOrientationEvent) {
            setDeviceDetection(true);
            window.addEventListener('deviceorientation', handleOrientation, false);
          } else  { 
            alert('no device');
          }
        }
      })
      .catch(console.error)
    } else {
      if (window.DeviceOrientationEvent) {
        setDeviceDetection(true);
        window.addEventListener('deviceorientation', handleOrientation, false);
      } else  { 
        alert('no device');
      }
    }
  };

  useEffect(() => {
    setPageActive(pageId);
  }, [setPageActive, pageId]);

  useEffect(() => {
    if ( !fireStore.lastUpdate ) {
      setOrientation(pageId, orientation)
    } else {
      const interval = setInterval(() => {
        setOrientation(pageId, orientation)
      }, 1500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [fireStore.lastUpdate, setOrientation]);

  const handleOrientation = event => {
    let { alpha, beta, gamma } = event;
    alpha = Math.round(alpha)
    beta = Math.round(beta)
    gamma = Math.round(gamma)
    setLocalOrientation({alpha, beta, gamma})
  }

  return (
    <div>
      <div style={{position: 'absolute', color: 'white'}}>
        <button disabled={deviceDetection} onClick={acceptDevice}>{!deviceDetection ? 'Allow Motion Detection' : 'Motion Accepted'}</button>
        <h1>{pageId}</h1>
        <p>{fireStore.orientation.alpha}</p>
        <p>{fireStore.orientation.beta}</p>
        <p>{fireStore.orientation.gamma}</p>
        <p>Local</p>
        <p>{`alpha: ${orientation.alpha}`}</p>
        <p>{`beta: ${orientation.beta}`}</p>
        <p>{`gamma: ${orientation.gamma}`}</p>
      </div>
      <Three x={orientation.beta} y={orientation.gamma} z={orientation.alpha} />
    </div>
  );
}

export default Page;