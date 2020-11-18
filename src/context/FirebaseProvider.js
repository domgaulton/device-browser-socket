import React, { useState } from 'react';
import { firestore } from "../firebase/firebase";

const Context = React.createContext();
export const FirebaseConsumer = Context;

const pageCollection = process.env.REACT_APP_FIREBASE_PAGE_COLLECTION;

function FirebaseProvider(props) {

  const handleCreateRoom = (pageId) => {
    firestore.collection(pageCollection).doc(pageId).set({
      fireStore: {
        pageId,
        deviceReady: false,
        pageActive: false,
      }, 
    })
    .then(() => {
      firestore.collection(pageCollection).doc(pageId)
      .onSnapshot({
        includeMetadataChanges: true
      },response => {
        const update = response.data().fireStore;
        setPageState(prevState => ({
          ...prevState,
          fireStore: update,
        }))
      });
    })
    .catch(error => {
      // console.error("Error writing document: ", error);
      console.log(error)
    });
  }

  const handleSetPageActive = (pageId) => {
    const collection = firestore.collection(pageCollection).doc(pageId)
    collection.update({
      fireStore: {
        pageId,
        deviceReady: false,
        pageActive: true,
        orientation: {},
      }, 
    })
    .then(() => {
      firestore.collection(pageCollection).doc(pageId)
      .onSnapshot({
        includeMetadataChanges: true
      },response => {
        const update = response.data().fireStore;
        setPageState(prevState => ({
          ...prevState,
          fireStore: update,
        }))
      });
    })
  }

  const handleSetOrientation = (pageId, orientation) => {
    const collection = firestore.collection(pageCollection).doc(pageId)
    collection.update({
      fireStore: {
        pageId,
        pageActive: true,
        deviceReady: true,
        orientation,
      },
    })
  }

  const [pageState, setPageState] = useState({
    fireStore: {},
    createPage: (pageId) => handleCreateRoom(pageId),
    setPageActive: (pageId) => handleSetPageActive(pageId),
    setOrientation: (pageId, orientation) => handleSetOrientation(pageId, orientation),
  });

  return (
    <Context.Provider value={pageState}>
      {props.children}
    </Context.Provider>
  );
}

export default FirebaseProvider;


