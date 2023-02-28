import './App.css';
import {useState, useEffect} from 'react';
import InputWord from './inputWord';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [results, setResults] = useState({correct: 0, wrong: 0, missed: 0, points: 0});

  // Get the data from a text file in the public folder
  const getDataTxt=()=>{
    fetch('RegexQuiz.txt'
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
    getDataTxt();
  },[])
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
  return (
    <div>
      <header>
        <h1>Regex Quiz</h1>
        {!done && <Button onClick={() => {finishQuiz();}}>Lock in your guesses</Button>}
        {done && <div>
          <h2>Correct: {results.correct}, Wrong: {results.wrong}, Missed: {results.missed}, Total Points: {results.points}</h2>
          <Button onClick={() => {getDataTxt();}}>Restart the quiz</Button>
        </div>}
        {data && data.length && data.map((item,index) =>
          <div key={`item${index}`}>
            {done ? <div>
              <div className='question'>Regular expression {index+1}: <span className='rex'>{item.question}</span></div>
              <Row>
                <Col>
                  <div>
                    <h2>Guesses</h2>
                    {item.guesses && item.guesses.map((guess,guessindex) =>
                      <p className='guess' key={`item${index}guess${guessindex}`}>{guessindex+1}: {guess}
                      {done && item.answers.indexOf(guess) < 0 && <span className='wrong'>(wrong)</span>}
                      </p>)}
                  </div>
                </Col>
                <Col>
                  <div>
                    <h2>Answers</h2>
                    {item.answers && item.answers.map((answer,answerindex) =>
                      <p className='answer' key={`item${index}answer${answerindex}`}>{answerindex+1}: {answer}
                      {item.guesses.indexOf(answer) < 0 && <span className='missed'>(missed)</span>}
                      </p>)}
                  </div>
                </Col>
              </Row>
            </div> : index === currentIndex && <div>
              <div className='question'>Regular expression {index+1}: <span className='rex'>{item.question}</span></div>
              <div>Guesses:
                <InputWord key={`item${index}guessinput`}
                  handleSubmit={submitGuess}
                  questionIndex={index}
                  question={item.question}/>
                {item.guesses && item.guesses.map((guess,guessindex) =>
                  <p className='guess' key={`item${index}guess${guessindex}`}>{guessindex+1}: {guess}
                  {done && item.answers.indexOf(guess) < 0 && <span className='wrong'>(wrong)</span>}
                  </p>)}
                {currentIndex > 0 && <Button onClick={() => setCurrentIndex(currentIndex-1)}>Previous</Button>}
                {currentIndex + 1 < data.length && <Button onClick={() => setCurrentIndex(currentIndex+1)}>Next</Button>}
              </div>
            </div>}
          </div>)}
      </header>
    </div>
  );
}

export default App;
