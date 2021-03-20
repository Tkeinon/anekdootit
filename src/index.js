import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const TopVoted = ( { TopVotedAnecdote }) => {
    return (
        <div>
            <h1>
                {TopVotedAnecdote.anecdote}
            </h1>
            <div>has votes {TopVotedAnecdote.votes}</div>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState( 0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

    const randomAnecdote = () => setSelected(Math.floor(Math.random() * 6))

    const voteButton = () => {
        console.log("Vote button pressed", selected.anecdote, selected.points)
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    const getTopVotedAnecdote = (anecdotes) => {
        let votes = Math.max(...points)
        let anecdote = anecdotes[points.indexOf(votes)]
        return { anecdote: anecdote, votes: votes }
    }

    return (
        <div>
            <h1>{props.anecdotes[selected]}</h1>
            <p>Anecdote has {points[selected]} votes</p>
            <Button onClick={randomAnecdote} text="Random Anecdote"/>
            <Button onClick={voteButton} text={"Vote"} />
            <TopVoted TopVotedAnecdote={getTopVotedAnecdote(anecdotes)} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
