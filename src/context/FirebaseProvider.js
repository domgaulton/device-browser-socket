import React, { useState } from 'react';
import { firestore } from "../firebase/firebase";
// import { withRouter } from "react-router";

const Context = React.createContext();
export const FirebaseConsumer = Context;

const pageCollection = process.env.REACT_APP_FIREBASE_PAGE_COLLECTION;

function FirebaseProvider(props) {

  const handleCreateRoom = (pageId) => {
    firestore.collection(pageCollection).doc(pageId).set({
      fireStore: {
        pageId,
        pageActive: false,
        orientation: {
          alpha: 0,
          beta: 0,
          gamma: 0,
        },
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
          fireStore: {
            ...pageState.fireStore,
            ...update,
          }
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
        ...pageState.fireStore,
        pageId,
        pageActive: true,
      }
    })
    // .then(() => {
    //   firestore.collection(pageCollection).doc(pageId)
    //   .onSnapshot({
    //     includeMetadataChanges: true
    //   },response => {
    //     const update = response.data().fireStore;
    //     setPageState(prevState => ({
    //       ...prevState,
    //       fireStore: update,
    //     }))
    //   });
    // })
  }

  const handleSetOrientation = (pageId, orientation) => {
    const {alpha, beta, gamma} = orientation;
    console.log(pageId, alpha, beta, gamma);
    const timeNow = Date.now().toString();
    const collection = firestore.collection(pageCollection).doc(pageId)
    collection.update({
      fireStore: {
        ...pageState.fireStore,
        pageId,
        pageActive: true,
        lastUpdate: timeNow,
        orientation,
      }
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

  const [pageState, setPageState] = useState({
    fireStore: {
      pageId: '',
      pageActive: false,
      orientation: {
        alpha: 0,
        beta: 0,
        gamma: 0,
      },
    },
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


