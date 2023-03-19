import '../App.css';
import {useState, useEffect} from 'react';
import InputWord from './inputWord';

const TakeQuiz=({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [results, setResults] = useState({correct: 0, wrong: 0, missed: 0, points: 0});
    const [autoclear, setAutoclear] = useState(true); // Whether to blank out guess input box after submit
    const [skipped, setSkipped] = useState([]); // ids of questions user wants to skip

    // Get the data from a text file in the public folder
    const getDataTxt=(quizpath)=>{
        fetch(quizpath
        ,{
            headers : {
            'Content-Type': 'application/text',
            'Accept': 'application/text'
            }
        }
        )
        .then(function(response){
            return response.text();
        })
        .then(function(mytext) {
            let tabpattern = /\t/; // tab character search
            let letterpattern = /[A-Z]/; // any letter
            let question = ""; // the regular expression (that is the question)
            let pictogram = ""; // pictogram (optional) used to show the possible answers in a grid
            let answers = [];
            let quiz = []; // array of {question, answers[], guesses[]}
            let lines = mytext.split(/\r?\n/); // split file into array of lines
            let nextid=1; // make an identifier
            lines.forEach(line => {
                if (line.search(letterpattern) > -1) {
                    // Has letters; must be a question, a pictogram, or an answer
                    if (line.search(tabpattern) === 0) {
                        // answer (starts with tab, followed by answer)
                        let answer = line.substring(1);
                        answers.push(answer);
                    } else if (line.startsWith(":")) {
                        // pictogram (starts with colon, followed by pictogram)
                        pictogram = line.substring(1);
                    } else {
                        // new question (does not start with tab or colon)
                        if (question.length) {
                            // finish previous question
                            answers.sort();
                            quiz.push({id: nextid, question: question, pictogram: pictogram, answers: answers, guesses: []}); // no guesses yet
                            nextid++;
                            answers = [];
                            pictogram = "";
                        }
                        question = line;
                    }
                }
            });
            // finish previous question
            answers.sort();
            quiz.push({id: nextid, question: question, pictogram: pictogram, answers: answers, guesses: []}); // no guesses yet
            setData(quiz);
            setCurrentIndex(0);
            setDone(false);
            setResults({correct: 0, wrong: 0, missed: 0, points: 0});
        });
    }

    useEffect(()=>{
        getDataTxt(filename);
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

    function finishQuiz() {
        let correct = 0;
        let wrong = 0;
        let missed = 0;
        let points = 0;
        data.forEach((item) => {
            if (skipped.indexOf(item.id) < 0) {
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

    function markAsSkipped(skipid) {
        let newskipped = JSON.parse(JSON.stringify(skipped));
        newskipped.push(skipid);
        setSkipped(newskipped);
        if (currentIndex + 1 < data.length) {
            setCurrentIndex(currentIndex+1);
        }
    }
    function markAsUnSkipped(skipid) {
        let newskipped = JSON.parse(JSON.stringify(skipped));
        newskipped.splice(skipped.indexOf(skipid),1);
        setSkipped(newskipped);
    }

    const QuizInProgress = <div>
        {data && data.length && data.map((item,index) =>
            <div key={`item${item.id}`}>
            {index === currentIndex && <div className='questiondiv'>
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item list-group-item-danger">
                        {skipped.indexOf(item.id) < 0 ?
                            <button className='btn btn-dark' onClick={()=>markAsSkipped(item.id)}>Skip</button>
                        :
                            <button className='btn btn-dark' onClick={()=>markAsUnSkipped(item.id)}>Un-Skip</button>
                        }
                    </li>
                    <li class="list-group-item list-group-item-secondary">
                        {currentIndex === 0 ?
                            <button className='btn btn-dark' disabled>Prev</button>
                        :
                            <button className='btn btn-dark' active onClick={() => setCurrentIndex(currentIndex-1)}>Prev</button>
                        }
                    </li>
                    <li class="list-group-item list-group-item-secondary">
                        {currentIndex + 1 === data.length ?
                            <button className='btn btn-dark' disabled>Next</button>
                        :
                            <button className='btn btn-dark' onClick={() => setCurrentIndex(currentIndex+1)}>Next</button>
                        }
                    </li>
                    <li class="list-group-item list-group-item-primary"><span className='rexlabel'>Regex {index+1} of {data.length}:</span><span className='rex'>{item.question}</span></li>
                    <li class="list-group-item list-group-item-dark">
                        <button className='btn btn-success' onClick={() => {finishQuiz();}}>Lock in your guesses</button>
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
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item list-group-item-info"><span className='correct' data-bs-toggle="tooltip" title="You gain 1 point per correct answer">Correct</span></li>
            <li class="list-group-item list-group-item-primary">{results.correct}</li>
            <li class="list-group-item list-group-item-info"><span className='wrong' data-bs-toggle="tooltip" title="You lose 2 points per wrong answer">Wrong</span></li>
            <li class="list-group-item list-group-item-primary">{results.wrong}</li>
            <li class="list-group-item list-group-item-info"><span className='missed' data-bs-toggle="tooltip" title="You lose no points for missed answers">Missed</span></li>
            <li class="list-group-item list-group-item-primary">{results.missed}</li>
            <li class="list-group-item list-group-item-info">Total Points:</li>
            <li class="list-group-item list-group-item-primary">{results.points} out of {results.correct + results.missed}</li>
            <li class="list-group-item list-group-item-dark">
                <button className='btn btn-dark' onClick={() => { getDataTxt(filename); } }>Restart the quiz</button>
            </li>
        </ul>
        {data.map((item,index) =>
            <div key={`item${index}`} className='qadiv'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <span className='rexlabel'>Regex {index+1} of {data.length}:</span><span className='rex'>{item.question}</span>
                            {skipped.indexOf(item.id) > -1 && <span> Skipped</span>}
                        </div>
                    </div>
                    {skipped.indexOf(item.id) < 0 && <div className='row'>
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
    </div>;
    return ( <div>
        {done ? QuizDone : QuizInProgress}
    </div>);
}

export default TakeQuiz;
