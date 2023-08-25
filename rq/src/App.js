import './App.css';
import {isMobile} from 'react-device-detect';
import {useState, useEffect} from 'react';
import ShowBreadcrumbs from './components/showBreadcrumbs';
import setFromJsonFile from './functions/setFromJsonFile';
import Ladder from './components/ladders/ladder';
import Minefield from './components/minefields/minefield';
import ShowQuizLevelList from './components/showQuizLevelList';
import ShowQuizList from './components/showQuizList';
import TakeQuiz from './components/takeQuiz';
import Potluck from './components/potlucks/potluck';
import DoubleSixes from './components/doubleSixes/doubleSixes';

const MODE_HOME = 'Home';
const MODE_REGEX = 'Regex Quizzes';
const MODE_LADDER = 'Ladders';
const MODE_MINEFIELD = 'Minefields';
const MODE_POTLUCK = 'Potlucks';
const MODE_DOUBLESIXES = 'Double Sixes';

function App() {
  const [mode, setMode] = useState(MODE_HOME);
  const [llist, setLlist] = useState([]);
  const [lindex, setLindex] = useState(-1);
  const [ldesc, setLdesc] = useState('No level selected.');
  const [qlist, setQlist] = useState([]);
  const [qindex, setQindex] = useState(-1);
  const [qdesc, setQdesc] = useState('No quiz selected.');
  const [mlist, setMlist] = useState([]);
  const [mindex, setMindex] = useState(-1);
  const [mdesc, setMdesc] = useState('No minefield selected');

  const getQuizzes=()=>{
    if (!isMobile) {
      setFromJsonFile('quizzes/qlist.json', setQlist, true);
      setFromJsonFile('quizzes/llist.json', setLlist, false);
    }
    setFromJsonFile('minefields/mlist.json', setMlist, true);
  }

  useEffect(()=>{
    getQuizzes();
  },[])
  const ShowRegexMode = <div>
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
            {mode !== MODE_HOME &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_HOME) }}>Home</button>
                </div>
            }
            {mode !== MODE_REGEX && !isMobile &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_REGEX) }}>Switch to {MODE_REGEX}</button>
                </div>
            }
            {mode !== MODE_LADDER && !isMobile &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_LADDER) }}>Switch to {MODE_LADDER}</button>
                </div>
            }
            {mode !== MODE_MINEFIELD &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_MINEFIELD) }}>Switch to {MODE_MINEFIELD}</button>
                </div>
            }
            {mode !== MODE_POTLUCK &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_POTLUCK) }}>Switch to {MODE_POTLUCK}</button>
                </div>
            }
            {mode !== MODE_DOUBLESIXES &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_DOUBLESIXES) }}>Switch to {MODE_DOUBLESIXES}</button>
                </div>
            }
          </div>
        {mode === MODE_HOME && <div>
          <a href="http://www.scrabbleplayers.org"><img border="0" src="http://www.scrabbleplayers.org/pix/logo-only-160px.png" alt="[NASPA Logo]"/></a>
          <span className='ackNASPA'>NWL20 used with permission from NASPA</span>
        </div>}
        {mode === MODE_REGEX && ShowRegexMode}
        {mode === MODE_LADDER && <Ladder/>}
        {mode === MODE_MINEFIELD && <Minefield mlist={mlist} mindex={mindex} setMindex={setMindex} mdesc={mdesc} setMdesc={setMdesc} />}
        {mode === MODE_POTLUCK && <Potluck/>}
        {mode === MODE_DOUBLESIXES && <DoubleSixes/>}
      </header>
    </div>
  );
}

export default App;
