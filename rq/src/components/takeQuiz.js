import '../App.css';
import {useState, useEffect} from 'react';
import InputWord from './inputWord';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, ListGroup } from 'react-bootstrap';

const TakeQuiz=({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [results, setResults] = useState({correct: 0, wrong: 0, missed: 0, points: 0});

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
            let question = "";
            let answers = [];
            let quiz = []; // array of {question, answers[], guesses[]}
            let lines = mytext.split(/\r?\n/); // split file into array of lines
            lines.forEach(line => {
                if (line.length > 1 && line.search(tabpattern) < 0) {
                // new question
                if (question.length) {
                    // finish previous question
                    answers.sort();
                    quiz.push({question: question, answers: answers, guesses: []}); // no guesses yet
                    answers = [];
                }
                question = line;
                } else if (line.length > 1 && line.search(tabpattern) === 0) {
                // answer
                let answer = line.substring(1);
                answers.push(answer);
                }
            });
            // finish previous question
            answers.sort();
            quiz.push({question: question, answers: answers, guesses: []}); // no guesses yet
            setData(quiz);
            setCurrentIndex(0);
            setDone(false);
            setResults({correct: 0, wrong: 0, missed: 0, points: 0});
        });
    }

    useEffect(()=>{
        getDataTxt(filename);
    },[filename])

    async function submitGuess(questionIndex, guess) {
        let guesses = data[questionIndex].guesses;
        let testword = guess.toUpperCase();
        if (testword && guesses.indexOf(testword) < 0) {
            let newdata = JSON.parse(JSON.stringify(data));
            newdata[questionIndex].guesses.push(testword);
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
        });
        setResults({correct: correct, wrong: wrong, missed: missed, points: points});
        setDone(true);
    }

    return ( <div>
        {done && <ListGroup horizontal>
            <ListGroup.Item variant='info'>Correct:</ListGroup.Item>
            <ListGroup.Item variant='primary'>{results.correct}</ListGroup.Item>
            <ListGroup.Item variant='info'>Wrong:</ListGroup.Item>
            <ListGroup.Item variant='primary'>{results.wrong}</ListGroup.Item>
            <ListGroup.Item variant='info'>Missed:</ListGroup.Item>
            <ListGroup.Item variant='primary'>{results.missed}</ListGroup.Item>
            <ListGroup.Item variant='info'>Total Points:</ListGroup.Item>
            <ListGroup.Item variant='primary'>{results.points} out of {results.correct + results.missed}</ListGroup.Item>
            <ListGroup.Item variant='dark'><Button variant='dark' onClick={() => {getDataTxt(filename);}}>Restart the quiz</Button></ListGroup.Item>
        </ListGroup>}
        {data && data.length && data.map((item,index) =>
            <div key={`item${index}`}>
            {done ? <Container fluid>
                <Row>
                    <Col md="3"><h2>Regular expression {index+1}:</h2></Col>
                    <Col md="auto"><span className='rex'>{item.question}</span></Col>
                </Row>
                <Row>
                <Col md="3">
                    <h3>Guesses</h3>
                    {item.guesses && item.guesses.map((guess,guessindex) =>
                        <p className='guess' key={`item${index}guess${guessindex}`}>{guessindex+1}: {guess}
                        {done && item.answers.indexOf(guess) < 0 && <span className='wrong'>(wrong)</span>}
                        </p>)}
                </Col>
                <Col md="auto">
                    <h3>Answers</h3>
                    {item.answers && item.answers.map((answer,answerindex) =>
                        <p className='answer' key={`item${index}answer${answerindex}`}>{answerindex+1}: {answer}
                        {item.guesses.indexOf(answer) < 0 && <span className='missed'>(missed)</span>}
                        </p>)}
                </Col>
                </Row>
            </Container> : index === currentIndex && <div>
                <ListGroup horizontal>
                    <ListGroup.Item variant='secondary'><Button variant='dark' disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex-1)}>Prev</Button></ListGroup.Item>
                    <ListGroup.Item variant='primary'>{index+1} of {data.length}: <span className='rex'>{item.question}</span></ListGroup.Item>
                    <ListGroup.Item variant='secondary'><Button variant='dark' disabled={currentIndex + 1 === data.length} onClick={() => setCurrentIndex(currentIndex+1)}>Next</Button></ListGroup.Item>
                    <ListGroup.Item variant='dark'><Button variant='success' onClick={() => {finishQuiz();}}>Lock in your guesses</Button></ListGroup.Item>
                </ListGroup>
                <div>Guesses:
                    <InputWord key={`item${index}guessinput`}
                        handleSubmit={submitGuess}
                        questionIndex={index}
                        question={item.question}/>
                    <div>
                        {item.guesses && item.guesses.map((guess,guessindex) =>
                            <span className='guess' key={`item${index}guess${guessindex}`}>
                                <span>{guessindex+1}:&nbsp;{guess},&nbsp;</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>}
        </div>)}
    </div>);
}

export default TakeQuiz;
