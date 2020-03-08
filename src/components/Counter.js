import React, { Fragment, useState, useEffect, useReducer } from 'react'
import firebase from '../firebase'

const db = firebase.firestore()

const useCount = initialCount => {
  const [count, setCount] = useState(initialCount)
  useEffect(() => {
    const unsubscribe = db.collection('counts').doc('fuNy1J41kQqtUAT10i3O')
      .onSnapshot(doc => {
        console.log("onSnapshot", doc.id)
        console.log(doc.data().count)
        setCount(doc.data().count)
      })
    return () => unsubscribe()
  }, [])
  return count
}

export default () => {
  const count = useCount(0)
  const handleGet = () => {
    db.collection('counts').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
      })
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
  }
  const handleAdd = () => {
    db.collection("counts").add({
      count: 0
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    })
  }
  const handleSet = () => {
    db.collection("counts").doc("fuNy1J41kQqtUAT10i3O")
    .set({
      count: 1988
    })
    .then(() => {
      console.log("Document Updated!")
    })
    .catch(err => {
      console.error("Something went wrong", err)
    })
  }
  return (
    <Fragment>
      <h1>{count}</h1>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSet}>Set</button>
      <button onClick={handleGet}>Get</button>
    </Fragment>
  )
}