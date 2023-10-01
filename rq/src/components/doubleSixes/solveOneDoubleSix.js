import './solveOneDoubleSix.css';
import InputWordSimple from '../inputWordSimple';
import { useState } from 'react';

const SolveOneDoubleSix=({data, setItemid, currentId, maxId}) => {
    const [guesses, setGuesses] = useState([]);
    const [solved, setSolved] = useState(false);
    function handleSubmitWord(word) {
        if (word.toUpperCase().trim().length !== 6) {
            alert(`${word.toUpperCase().trim()} should be 6 letters long.`);
            return;
        }
        let newGuesses = [...guesses];
        if (newGuesses.indexOf(word) < 0) {
            newGuesses.push(word);
            newGuesses.sort();
            setGuesses(newGuesses);
        }
        let unsolved = false;
        data.answers.forEach(element => {
            if (newGuesses.indexOf(element.word1) < 0) {unsolved = true;}
            if (newGuesses.indexOf(element.word2) < 0) {unsolved = true;}
        });
        setSolved(!unsolved);
    }
    return(
        <div className='solveOneDoubleSix'>
            <h1>Goal: Rearrange the letters in the phrase into two six-letter words.</h1>
            <button onClick={() => {setItemid(-1);}}>Return to question list</button>
            {currentId < maxId && <button onClick={() => {setItemid(currentId+1); setGuesses([]); setSolved(false);}}>Next question</button>}
            <div className='phrasediv'>
                <span className='solvephrase'>{data.phrase}</span>
            </div>
            <table className='table table-sm'>
                <tbody>
                    {data.answers.map((answer,index) =>
                        <tr key={index}>
                            <td className={guesses.indexOf(answer.word1) > -1 ? 'wordSolved' : 'wordUnsolved'}>{answer.word1}</td>
                            <td className={guesses.indexOf(answer.word2) > -1 ? 'wordSolved' : 'wordUnsolved'}>{answer.word2}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='doubleSixesInputWordDiv'>
                <InputWordSimple handleSubmitWord={handleSubmitWord} blankForNext={false}/>
            </div>
            {solved && <h1>Solved!</h1>}
            {!solved && <p className='showGuesses'>Guesses: {guesses.join(", ")}</p>}
        </div>
    )
}

export default SolveOneDoubleSix;