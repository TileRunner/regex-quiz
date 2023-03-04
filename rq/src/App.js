import './App.css';
import {useState, useEffect} from 'react';
import TakeQuiz from './components/takeQuiz';
import { Button, Table } from 'react-bootstrap';

function App() {
  const [qlist, setQlist] = useState([]);
  const [qindex, setQindex] = useState(-1);

  const getQuizzes=()=>{
    fetch('quizzes/qlist.json'
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
        setQlist(myJson);
      });
  }

  useEffect(()=>{
    getQuizzes();
  },[])
  return (
    <div>
      <header>
        <h1>Quiz List</h1>
        {qlist && qlist.length && <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Description</th>
                <th>Lexicon</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {qlist.filter((q,qi) => qi === qindex || qindex < 0).map((q,qi) =>
                <tr key={`quizlistitem${q.id}`}>
                  <td>{q.desc}</td>
                  <td>{q.lexicon}</td>
                  <td>
                    {qindex === q.id ?
                    <Button onClick={() => {setQindex(-1);}}>Quit this quiz</Button>
                    :
                    <Button onClick={() => {setQindex(q.id);}}>Take this quiz</Button>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {qindex > -1 && <TakeQuiz filename={`quizzes/${qlist[qindex].filename}`}></TakeQuiz>}
        </div>}
      </header>
    </div>
  );
}

export default App;
