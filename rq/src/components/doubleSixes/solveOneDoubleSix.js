import './solveOneDoubleSix.css';
import InputWordSimple from '../inputWordSimple';
import { useState } from 'react';

const SolveOneDoubleSix=({data, setItemid}) => {
    const [guesses, setGuesses] = useState([]);
    const [solved, setSolved] = useState(false);
    function handleSubmitWord(word) {
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
            <div className='phrasediv'>
                <span className='solvephrase'>{data.phrase}</span>
            </div>
            <table className='table'>
                <tbody>
                    {data.answers.map((answer,index) =>
                        <tr key={index}>
                            <td className={guesses.indexOf(answer.word1) > -1 ? 'wordSolved' : 'wordUnsolved'}>{answer.word1}</td>
                            <td className={guesses.indexOf(answer.word2) > -1 ? 'wordSolved' : 'wordUnsolved'}>{answer.word2}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                <InputWordSimple handleSubmitWord={handleSubmitWord}/>
            </div>
            {solved && <h1>Solved!</h1>}
            {!solved && <p>Guesses: {guesses.join(",")}</p>}
        </div>
    )
}

export default SolveOneDoubleSix;