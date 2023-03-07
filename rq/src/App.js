import './App.css';
import {useState, useEffect} from 'react';
import TakeQuiz from './components/takeQuiz';
import { Button, Table } from 'react-bootstrap';

function App() {
  const [llist, setLlist] = useState([]);
  const [lindex, setLindex] = useState(-1);
  const [ldesc, setLdesc] = useState('No level selected.');
  const [qlist, setQlist] = useState([]);
  const [qindex, setQindex] = useState(-1);
  const [qdesc, setQdesc] = useState('No quiz selected.');

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
        myJson.forEach((element, index) => {
          element.id = index;
        });
        setQlist(myJson);
      });
  }

  useEffect(()=>{
    getQuizzes();
  },[])
  return (
    <div>
      <header>
        {lindex > -1 && <div>
          Quiz level {lindex}: {ldesc} <Button onClick={() => {setLindex(-1);}}>Quit this level</Button>
          {qindex > -1 && <div>
            Quiz: {qdesc} <Button onClick={() => {setQindex(-1);}}>Quit this quiz</Button>
          </div>}
        </div>}
        {llist && llist.length && lindex < 0 && <div>
          <h1>Quiz Level List</h1>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Level</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {llist.map((l) => <tr key={`level${l.level}`}>
                <td>{l.level}</td>
                <td>{l.desc}</td>
                <td><Button onClick={() => {setLindex(l.level); setLdesc(l.desc)}}>Select this level</Button></td>
              </tr>)}
            </tbody>
          </Table>
        </div>}
        {qlist && qlist.length && lindex > -1 && qindex < 0 && <div>
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
              {qlist.filter(q => q.level === lindex).map((q) =>
                <tr key={`quizlistitem${q.id}`}>
                  <td>{q.desc}</td>
                  <td>{q.lexicon}</td>
                  <td><Button onClick={() => {setQindex(q.id); setQdesc(q.desc);}}>Take this quiz</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>}
        {lindex > -1 && qindex > -1 && <TakeQuiz filename={`quizzes/${qlist[qindex].lexicon}/${qlist[qindex].filename}`}></TakeQuiz>}
      </header>
    </div>
  );
}

export default App;
