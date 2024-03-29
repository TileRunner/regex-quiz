import '../../App.css';
import './climbLadder.css';
import {useState, useEffect} from 'react';
import loadQuiz from '../../functions/loadQuiz';
import InputWord from '../inputWord';
import ShowLadder from './showLadder';

const ClimbLadder=({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [results, setResults] = useState({correct: 0, wrong: 0, missed: 0, points: 0});
    const [autoclear, setAutoclear] = useState(true); // Whether to blank out guess input box after submit


    function reclimbLadder() {
        // Restart
        let newdata = JSON.parse(JSON.stringify(data));
        newdata.forEach((item) => {
            item.guesses=[];
        });
        setData(newdata);    
        setCurrentIndex(0);
        setDone(false);
        setResults({correct: 0, wrong: 0, missed: 0, points: 0});
    }

    useEffect(()=>{
        // Get the data from a text file in the public folder
        function getDataTxt() {
            function takeLoadedQuiz(quiz) {
                setData(quiz);
                setCurrentIndex(0);
                setDone(false);
                setResults({correct: 0, wrong: 0, missed: 0, points: 0});
            }
            loadQuiz(filename, takeLoadedQuiz);
        }
        getDataTxt();
    },[filename])

    function submitGuess(questionIndex, guess) {
        let guesses = data[questionIndex].guesses;
        let testword = guess.toUpperCase();
        if (testword && guesses.indexOf(testword) < 0) {
            let newdata = JSON.parse(JSON.stringify(data));
            newdata[questionIndex].guesses.push(testword);
            newdata[questionIndex].guesses.sort();
            setData(newdata);
        }
    }

    function removeGuess(questionIndex, guess) {
        let guesses = data[questionIndex].guesses;
        let testword = guess.toUpperCase();
        if (testword && guesses.indexOf(testword) > -1) {
            let newdata = JSON.parse(JSON.stringify(data));
            newdata[questionIndex].guesses.splice(newdata[questionIndex].guesses.indexOf(testword),1);
            newdata[questionIndex].guesses.sort();
            setData(newdata);
        }
    }

    function finishQuestion() {
        // Check for errors
        let item = data[currentIndex];
        let errors = false;
        item.guesses.forEach((guess) => {
            if (item.answers.indexOf(guess) < 0) {
                errors = true;
            }
        });
        item.answers.forEach((answer) => {
            if (item.guesses.indexOf(answer) < 0) {
                errors = true;
            }
        });
        // If they missed any or got any wrong then quiz finishes.
        if (errors) {
            finishQuiz();
        } else {
            // If they were on the last question then they finished the ladder.
            if (currentIndex + 1 === data.length) {
                finishQuiz();
            } else {
                // Go to next question.
                setCurrentIndex(currentIndex + 1);
            }
        }
    }

    function finishQuiz() {
        let correct = 0;
        let wrong = 0;
        let missed = 0;
        let points = 0;
        data.forEach((item, index) => {
            if (index <= currentIndex) {
                item.guesses.forEach((guess) => {
                    if (item.answers.indexOf(guess) < 0) {
                        wrong++;
                        points = points - 2;
                    } else {
                        correct++;
                        points++;
                    }
                });
                item.answers.forEach((answer) => {
                    if (item.guesses.indexOf(answer) < 0) {
                        missed++;
                    }
                });
            }
        });
        setResults({correct: correct, wrong: wrong, missed: missed, points: points});
        setDone(true);
    }

    const QuizInProgress = <div>
        {data && data.length && data.map((item,index) =>
            <div key={`item${item.id}`}>
            {index === currentIndex && <div className='questiondiv'>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item list-group-item-primary"><span className='rexlabel'>Regex {index+1} of {data.length}:</span><span className='rex'>{item.question}</span></li>
                    <li className="list-group-item list-group-item-dark">
                        <button className='btn btn-success' onClick={() => {finishQuestion();}}>Lock in your guesses</button>
                    </li>
                </ul>
                <div className='guessdiv'>
                    <div className='checkboxes'>
                        <div className={autoclear ? 'optionsCheckbox On' : 'optionsCheckbox'}
                            onClick={() => {setAutoclear(!autoclear)}}>
                            <label>Auto clear input after submit</label>
                        </div>
                    </div>
                    <InputWord key={`item${index}guessinput`}
                        handleSubmit={submitGuess}
                        handleRemoveGuess={removeGuess}
                        questionIndex={index}
                        question={item.question}
                        pictogram={item.pictogram}
                        autoclear={autoclear}
                        />
                    {item.guesses && item.guesses.length > 0 && <div className='qadiv'>
                        <p>Target: {item.answers.length} answers</p>
                        {item.guesses.map((guess,guessindex) =>
                            <p className='guess' key={`item${index}guess${guessindex}`}>
                                <span className='numlabel'>{guessindex+1}</span>: {guess}
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
                                            <span className='rexlabel'>Regex {index+1} of {data.length}:</span><span className='rex'>{item.question}</span>
                                        </div>
                                    </div>
                                    {index <= currentIndex && <div className='row'>
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
                                    </div>}
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
                                    <td><span className='wrong' data-bs-toggle="tooltip" title="You lose 2 points per wrong answer">Wrung</span></td>
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
                                    <td>{results.correct + results.missed}</td>
                                </tr>
                            </tbody>
                        </table>
                        <ul className="list-group list-group-horizontal">
                            <li className='list-group-item list-group-item-secondary'>
                                <button
                                 className='btn btn-dark'
                                 onClick={() => { reclimbLadder(true); } }
                                 data-bs-toggle="tooltip" title="This clears your guesses"
                                 >Reclimb Ladder</button>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>;
    return ( <div>
        <table>
            <tbody>
                <tr>
                    <td>
                        {done ? QuizDone : QuizInProgress}
                    </td>
                    <td className='laddertd'>
                        <ShowLadder data={data} currentIndex={currentIndex} done={done}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>);
}

export default ClimbLadder;