import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([]);
  const getData=()=>{
    fetch('data.json'
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson);
      });
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div>
      <header>
        <h1>Regex Quiz</h1>
        <h2>This site is under construction</h2>
        {data && data.length && data.map((item,index) =>
        <div key={`item${index}`}>
          <p>Regular expression {index+1}: <span className='rex'>{item.question}</span></p>
          <p>Answers:
            {item.answers && item.answers.length && item.answers.map((answer,answerindex) =>
            <p className='answer' key={`item${index}answer${answerindex}`}>{answerindex+1}: {answer} </p>)}
          </p>
        </div>)}
      </header>
    </div>
  );
}

export default App;
