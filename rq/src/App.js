import './App.css';
import {useState, useEffect} from 'react';
import TakeQuiz from './components/takeQuiz';
import { Button, Table } from 'react-bootstrap';

function App() {
  const [qlist, setQlist] = useState([]);
  const [qindex, setQindex] = useState(-1);
  const [llist, setLlist] = useState([]);
  const [lindex, setLindex] = useState(-1);

  const getQuizzes=()=>{
    fetch('quizzes/llist.json'
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
        setLlist(myJson);
      });
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
        <h1>Quiz Level List</h1>
        {llist && llist.length && <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Level</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {llist.filter((l) => l.level === lindex || lindex < 0).map((l) => <tr key={`level${l.level}`}>
                <td>{l.level}</td>
                <td>{l.desc}</td>
                <td>
                    {lindex === l.level ?
                    <Button onClick={() => {setLindex(-1);}}>Quit this level</Button>
                    :
                    <Button onClick={() => {setLindex(l.level);}}>Select this level</Button>
                    }
                  </td>
              </tr>)}
            </tbody>
          </Table>
        </div>}
        {qlist && qlist.length && lindex > -1 && <div>
          <h1>Quiz List</h1>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Description</th>
                <th>Lexicon</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {qlist.filter((q,qi) => q.level === lindex && (qi === qindex || qindex < 0)).map((q) =>
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
          {qindex > -1 && <TakeQuiz filename={`quizzes/${qlist[qindex].lexicon}/${qlist[qindex].filename}`}></TakeQuiz>}
        </div>}
      </header>
    </div>
  );
}

export default App;
