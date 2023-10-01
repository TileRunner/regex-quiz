import { useEffect, useState } from "react";
import setFromJsonFile from "../../functions/setFromJsonFile";
import InputWordSimple from "../inputWordSimple";

const TakeAdhocQuiz=({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [results, setResults] = useState({});
    const [showDeleteButtons, setShowDeleteButtons] = useState(false); // whether to show delete buttons next to guess words
    const [showHints, setShowHints] = useState(false); // whether to show hints
    useEffect(()=>{
        // Get the data array from a json array file in the public folder
        function getAdhocData() {
            function tagData(temp) {
                temp.forEach((item, index) => {item.id = index + 1; item.guesses=[];});
                setData(temp);
                setCurrentIndex(0);
            }
            setFromJsonFile(filename, tagData, false);
        }
        getAdhocData();
    },[filename]);
    function handleSubmitWord(word) {
        if (data[currentIndex].guesses.indexOf(word) < 0) {
            let newdata = [...data];
            newdata[currentIndex].guesses.push(word);
            newdata[currentIndex].guesses.sort();
            setData(newdata);
        }
    }
    function removeGuess(questionIndex, guessIndex) {
        let newdata = [...data];
        newdata[questionIndex].guesses.splice(guessIndex,1);
        setData(newdata);
    }
    function finishQuiz() {
        let newresults = {correct: 0, wrong: 0, missed: 0, points: 0, possible: 0};
        data.forEach((item) => {
            newresults.possible += item.answers.length;
            item.guesses.forEach((guess) => {
                if (item.answers.indexOf(guess) < 0) {
                    newresults.wrong++;
                    newresults.points += - 2;
                } else {
                    newresults.correct++;
                    newresults.points++;
                }
            });
            item.answers.forEach((answer) => {
                if (item.guesses.indexOf(answer) < 0) {
                    newresults.missed++;
                }
            });
        });
        setResults(newresults);
        setDone(true);
    }
    const QuizInProgress = <div>
        {data && data.length && data.map((item,index) =>
            <div key={index}>
            {index === currentIndex && <div className='questiondiv'>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item list-group-item-secondary">
                        {currentIndex === 0 ?
                            <button className='btn btn-dark' disabled>Prev</button>
                        :
                            <button className='btn btn-dark' onClick={() => setCurrentIndex(currentIndex-1)}>Prev</button>
                        }
                    </li>
                    <li className="list-group-item list-group-item-secondary">
                        {currentIndex + 1 === data.length ?
                            <button className='btn btn-dark' disabled>Next</button>
                        :
                            <button className='btn btn-dark' onClick={() => setCurrentIndex(currentIndex+1)}>Next</button>
                        }
                    </li>
                    <li className="list-group-item list-group-item-primary"><span className='rexlabel'>Question {item.id} of {data.length}:</span><span className='rex'>{item.question}</span></li>
                    <li className="list-group-item list-group-item-dark">
                        <button className='btn btn-success' onClick={() => {finishQuiz();}}>Lock in your guesses</button>
                    </li>
                </ul>
                <div className='guessdiv' key={index}>
                    <InputWordSimple
                        handleSubmitWord={handleSubmitWord} blankForNext={false}
                        />
                    {item.guesses && item.guesses.length > 0 && <div className='qadiv'>
                        <div className='checkboxes'>
                            <span className={showDeleteButtons ? 'optionsCheckbox On' : 'optionsCheckbox'} onClick={() => {setShowDeleteButtons(!showDeleteButtons)}}>
                                <label>Edit</label>
                            </span>
                            {item.hint && <span className={showHints ? 'optionsCheckbox On' : 'optionsCheckbox'} onClick={() => {setShowHints(!showHints)}}>
                                <label>Hint</label>
                            </span>}
                        </div>
                        {showHints && <div>{item.hint}</div>}
                        {item.guesses.map((guess,guessindex) =>
                            <p className='guess' key={guessindex}>
                                <span className='numlabel'>{guessindex+1}</span>: {guess}
                                {showDeleteButtons && <button className="removeButton" onClick={() => {removeGuess(index,guessindex);}}></button>}
                            </p>
                        )}
                    </div>}
                </div>
            </div>}
        </div>)}
    </div>;

    const QuizDone = <div className='resultsdiv'>
        <table>
            <tbody>
                <tr>
                    <td>
                        {data.map((item,index) =>
                            <div key={`item${item.id}`} className='qadiv'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='rexlabel'>Question {item.id}:</span><span className='rex'>{item.question}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <h3>Guesses</h3>
                                            {item.guesses && item.guesses.map((guess,guessindex) =>
                                                <p className='guess' key={`item${index}guess${guessindex}`}>
                                                    <span className='numlabel'>{guessindex+1}</span>: {guess}
                                                    <span className={item.answers.indexOf(guess) < 0 ? 'wrong' : 'correct'}/>
                                                </p>)}
                                        </div>
                                        <div className='col'>
                                            <h3>Answers</h3>
                                            {item.answers && item.answers.map((answer,answerindex) =>
                                                <p className='answer' key={`item${index}answer${answerindex}`}>
                                                    <span className='numlabel'>{answerindex+1}</span>: {answer}
                                                    <span className={item.guesses.indexOf(answer) < 0 ? 'missed' : 'correct'}/>
                                                </p>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </td>
                    <td className='overallresults'>
                        <table className='qadiv'>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Count</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className='correct' data-bs-toggle="tooltip" title="You gain 1 point per correct answer">Correct</span></td>
                                    <td>{results.correct}</td>
                                    <td>{results.correct}</td>
                                </tr>
                                <tr>
                                    <td><span className='wrong' data-bs-toggle="tooltip" title="You lose 2 points per wrong answer">Wrong</span></td>
                                    <td>{results.wrong}</td>
                                    <td>{results.wrong*-2}</td>
                                </tr>
                                <tr>
                                    <td><span className='missed' data-bs-toggle="tooltip" title="You lose no points for missed answers">Missed</span></td>
                                    <td>{results.missed}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Total Points:</td>
                                    <td>{results.points}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Possible Points:</td>
                                    <td>{results.possible}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>;
    return ( <div>
        {done ? QuizDone : QuizInProgress}
    </div>);
}

export default TakeAdhocQuiz;