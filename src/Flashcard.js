import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
    const [isActive, setActive] = useState(false);
    const frontEl = useRef()

    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <div className="card">
            <div className="front" ref={frontEl}>
                <div className="question">{flashcard.question}</div>
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option" key={option}>{option}</div>
                    })}
                </div>
                <div className="answer">
                    <p>click down to find anwer: </p>
                    <div 
                    id="bg"
                    className={isActive ? 'red': null} 
                    onClick={toggleClass}
                    >
                        {flashcard.answer}
                    </div>
                </div>
            </div>
        </div>
    )
}