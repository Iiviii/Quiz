import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from '../FlashcardList';
import '../App.css'
import logo from '../Images/Swift-Digital-Logo.png'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php?amount=10', {
      params: {
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return (
    <>
        <header className="header">
            <Link to="/">
                <img className="logo" src={logo}></img>
            </Link>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="category-title" htmlFor="category">Category: </label>
                    <select id="category" ref={categoryEl}>
                        {categories.map(category => {
                        return <option value={category.id} key={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn">Start</button>
                </div>
            </form>
        </header>
      
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default Home;