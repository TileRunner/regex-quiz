import './App.css';
import {useState, useEffect} from 'react';
import InputWord from './inputWord';
import Button from 'react-bootstrap/Button';

function App() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);

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
          if (line.length && line.search(tabpattern) < 0) {
            // new question
            if (question.length) {
              // finish previous question
              quiz.push({question: question, answers: answers, guesses: []}); // no guesses yet
              answers = [];
            }
            question = line;
          } else if (line.length && line.search(tabpattern) === 0) {
            // answer
            let answer = line.substring(1);
            answers.push(answer);
          }
        });
        // finish previous question
        quiz.push({question: question, answers: answers, guesses: []}); // no guesses yet
        setData(quiz);
        setDone(false);
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
      setData(newdata);
    }
  }
  return (
    <div>
      <header>
        <h1>Regex Quiz</h1>
        <h2>This site is under construction</h2>
        {!done && <Button onClick={() => {setDone(true);}}>Lock in your guesses</Button>}
        {done && <Button onClick={() => {getDataTxt();}}>Restart the quiz</Button>}
        {data && data.length && data.map((item,index) =>
        <div key={`item${index}`}>
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
          </div>
          {done && <div>Answers:
            {item.answers && item.answers.map((answer,answerindex) =>
              <p className='answer' key={`item${index}answer${answerindex}`}>{answerindex+1}: {answer}
              {item.guesses.indexOf(answer) < 0 && <span className='missed'>(missed)</span>}
              </p>)}
          </div>}
        </div>)}
      </header>
    </div>
  );
}

export default App;
