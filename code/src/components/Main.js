/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import GetThoughts from './GetThoughts';
import UserInput from './UserInput';

const Main = () => {
  const [getThoughts, setGetThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  /* const [loading, setLoading] = useState(false); */

  const APIurl = 'https://happy-thoughts-technigo.herokuapp.com/thoughts'

  const fetchAPI = () => {
    /* setLoading(true) */
    fetch(APIurl)
      .then((res) => res.json())
      .then((data) => setGetThoughts(data))
      .catch((error) => console.error(error))
      .finally(() => console.log('no errors')/* setLoading(false) */)
  }

  useEffect(() => {
    fetchAPI()
    /*   const interval = setInterval(() => {
        fetchAPI()
      }, 60000)
      // This line is clearing the interval when user f.ex. changes window or exit app
      return () => clearInterval(interval) */
  }, []);

  const handleNewThoughtChange = (event) => {
    setNewThought(event.target.value)
  }

  const handleCleanUp = () => {
    setNewThought('')
    fetchAPI()
    /* setLoading(false) */
  }

  const handleOnFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newThought
      })
    }
    /* setLoading(true) */
    fetch(APIurl, options)
      .then((res) => res.json())
      .then((updatedThought) => {
        setNewThought((previousThoughts) => [updatedThought, ...previousThoughts])
      })
      .finally(() => handleCleanUp())
  }

  const handleLikeButtonOnClick = (_id) => {
    fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`, {
      method: 'POST'
    })
      .then((res) => res.json())
      .then(() => {
        fetchAPI()
      })
  }

  /*   if (loading) {
      return (
        // eslint-disable-next-line react/self-closing-comp
        <div className="loader"><div></div></div>
      )
    } */

  return (
    <>
      <UserInput
        handleNewThoughtChange={handleNewThoughtChange}
        handleOnFormSubmit={handleOnFormSubmit}
        newThought={newThought} />
      <GetThoughts
        getThoughts={getThoughts}
        handleLikeButtonOnClick={handleLikeButtonOnClick} />
    </>
  )
};
export default Main;

