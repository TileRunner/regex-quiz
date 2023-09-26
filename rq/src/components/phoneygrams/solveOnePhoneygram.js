import './solveOnePhoneygram.css';
import InputWordSimple from '../inputWordSimple';
import { useState } from 'react';

const SolveOnePhoneygram=({data, setItemid, currentId, maxId}) => {
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
            if (newGuesses.indexOf(element) < 0) {unsolved = true;}
        });
        setSolved(!unsolved);
    }
    return(
        <div className='solveOnePhoneygram'>
            <h1>Goal: Enter the valid anagrams of the phoneygram.</h1>
            <button onClick={() => {setItemid(-1);}}>Return to phoneygram list</button>
            {currentId < maxId && <button onClick={() => {setItemid(currentId+1); setGuesses([]); setSolved(false);}}>Next phoneygram</button>}
            <div className='phoneygramdiv'>
                Phoneygram:<span className='solvephoneygram'> {data.phoneygram}</span>
            </div>
            <table className='table table-sm'>
                <tbody>
                    {data.answers.map((answer,index) =>
                        <tr key={index}>
                            <td className={guesses.indexOf(answer) > -1 ? 'wordSolved' : 'wordUnsolved'}>{answer}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='phoneygramsInputWordDiv'>
                <InputWordSimple handleSubmitWord={handleSubmitWord}/>
            </div>
            {solved && <h1>Solved!</h1>}
            {!solved && <p className='showGuesses'>Guesses: {guesses.join(", ")}</p>}
        </div>
    )
}

export default SolveOnePhoneygram;