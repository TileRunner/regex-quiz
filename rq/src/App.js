import './App.css';
import {useState, useEffect} from 'react';
import ShowBreadcrumbs from './components/showBreadcrumbs';
import setListInfo from './functions/setListInfo';
import setQuizInfo from './functions/setQuizInfo';
import CarlsLadder from './components/carlsLadder';
import ShowQuizLevelList from './components/showQuizLevelList';
import ShowQuizList from './components/showQuizList';
import TakeQuiz from './components/takeQuiz';

const MODE_REGULAR = 'Regular';
const MODE_LADDER = 'Carl\'s Ladder';

function App() {
  const [mode, setMode] = useState(MODE_REGULAR);
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
  const ShowRegularMode = <div>
    {lindex > -1 &&
      <ShowBreadcrumbs lindex={lindex} ldesc={ldesc} setLindex={setLindex} setQindex={setQindex} qindex={qindex} qdesc={qdesc} />}
    {llist && llist.length && lindex < 0 &&
      <ShowQuizLevelList llist={llist} setLindex={setLindex} setLdesc={setLdesc} />}
    {qlist && qlist.length && lindex > -1 && qindex < 0 &&
      <ShowQuizList qlist={qlist} lindex={lindex} setQindex={setQindex} setQdesc={setQdesc} />}
    {lindex > -1 && qindex > -1 &&
      <TakeQuiz filename={`quizzes/${qlist[qindex].lexicon}/${qlist[qindex].filename}`}></TakeQuiz>}
  </div>;
  return (
    <div>
      <header>
          <div className='d-flex bg-info text-black'>
            <div className='p-2 bg-primary'>Quiz Mode Selected: {mode}</div>
            {mode !== MODE_REGULAR &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_REGULAR) }}>Switch to {MODE_REGULAR}</button>
                </div>
            }
            {mode !== MODE_LADDER &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_LADDER) }}>Switch to {MODE_LADDER}</button>
                </div>
            }
          </div>
        {mode === MODE_REGULAR && ShowRegularMode}
        {mode === MODE_LADDER && <CarlsLadder/>}
      </header>
    </div>
  );
}

export default App;
