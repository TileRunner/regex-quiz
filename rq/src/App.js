import './App.css';
import {useState, useEffect} from 'react';
import setListInfo from './functions/setListInfo';
import setQuizInfo from './functions/setQuizInfo';
import ShowQuizLevelList from './components/showQuizLevelList';
import ShowQuizList from './components/showQuizList';
import TakeQuiz from './components/takeQuiz';

function App() {
  const [llist, setLlist] = useState([]);
  const [lindex, setLindex] = useState(-1);
  const [ldesc, setLdesc] = useState('No level selected.');
  const [qlist, setQlist] = useState([]);
  const [qindex, setQindex] = useState(-1);
  const [qdesc, setQdesc] = useState('No quiz selected.');

  const getQuizzes=()=>{
    setListInfo(setLlist);
    setQuizInfo(setQlist);
  }

  useEffect(()=>{
    getQuizzes();
  },[])
  return (
    <div>
      <header>
        {lindex > -1 && <ul className="list-group list-group-horizontal">
          <li className="list-group-item list-group-item-info">Level {lindex}: {ldesc}</li>
          <li className="list-group-item list-group-item-secondary"><button className='btn btn-dark' onClick={() => {setLindex(-1); setQindex(-1);}}>Quit this level</button></li>
          {qindex > -1 && <li class="list-group-item list-group-item-info">Quiz: {qdesc}</li>}
          {qindex > -1 && <li class="list-group-item list-group-item-secondary"><button className='btn btn-dark' onClick={() => {setQindex(-1);}}>Quit this quiz</button></li>}
        </ul>}
        {llist && llist.length && lindex < 0 &&
          <ShowQuizLevelList llist={llist} setLindex={setLindex} setLdesc={setLdesc}/>
        }
        {qlist && qlist.length && lindex > -1 && qindex < 0 && 
          <ShowQuizList qlist={qlist} lindex={lindex} setQindex={setQindex} setQdesc={setQdesc}/>
        }
        {lindex > -1 && qindex > -1 && <TakeQuiz filename={`quizzes/${qlist[qindex].lexicon}/${qlist[qindex].filename}`}></TakeQuiz>}
      </header>
    </div>
  );
}

export default App;
