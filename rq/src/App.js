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
import Adhoc from './components/adhocs/adhoc';
import Phoneygrams from './components/phoneygrams/phoneygrams';

const MODE_HOME = 'Home';
const MODE_REGEX = 'Regex Quizzes';
const MODE_LADDER = 'Ladders';
const MODE_MINEFIELD = 'Minefields';
const MODE_POTLUCK = 'Potlucks';
const MODE_DOUBLESIXES = 'Double Sixes';
const MODE_ADHOC = 'Ad hoc quizzes';
const MODE_PHONEYGRAMS = 'Phoneygrams';

const Home = <div>
  <a href="http://www.scrabbleplayers.org"><img border="0" src="http://www.scrabbleplayers.org/pix/logo-only-160px.png" alt="[NASPA Logo]" /></a>
  <span className='ackNASPA'>NWL2020 AND NWL2023 used with permission from NASPA</span>
  <div className='p-2 bg-secondary text-white'>
    <p>The original concept for this site was to use it for trivia contests at long tournaments.
      I wanted to use the Regular Expressions as the questions, and individuals or teams would
      get one point per correct word, and lose two points per phony. The Regex Quizzes mode best reflects this original intention.
      {isMobile && <span>Not supported on mobile phones.</span>}
    </p>
    <p>
      The Ladders mode is the first offshoot. It is a more brutal format in that you have to reclimb the ladder
      from the bottom rung as soon as you make a mistake. The idea is to keep trying until you successfully
      climb the ladder, hopefully helping you cement the words as you go.
      {isMobile && <span>Not supported on mobile phones.</span>}
    </p>
    <p>
      The Minefields idea is to help in the fight against plausible phonies.
      Each quiz shows you pairs of words, one phony and one valid, and you click on the valid words.
      If you click on the phony, the minefield explodes (no fancy graphics).
    </p>
    <p>
      The Potluck quizzes are similar to minefields. It shows one candidate word at a time,
      and you have to decide whether it is valid or phony. Any mistakes and the quiz ends.
      It will show all the valid words wen the quiz ends.
      There may be multiple valid words with the same letters, but only one phony per alphagram.
      The current set of quizzes reflects all the mistakes I am making this year (2023) as I revise
      all 2-8 letter words in a year.
    </p>
    <p>
      The Double Six quizzes are challenging puzzles (for me at least), where you have to use the 12
      letters shown and split them into two six letter words.
    </p>
    <p>
      The Ad hoc quizzes are for free format questions that do not fit the other quiz types.
      You are shown the question and you type in the valid words to answer.
      {isMobile && <span>Not supported on mobile phones.</span>}
    </p>
    <p>
      The Phoneygram quizzes are for plausible or obvious phoneys with valid anagrams.
      You are shown the phoneygram and you type in the valid anagrams to answer.
    </p>
  </div>
  <div className='p-2 bg-danger text-white'>
    <p>If you are a developer and would like to help with this site, you can go to my&nbsp;
      <a className='' href="https://tilerunner.github.io/">Home</a> site to find my contact info.
      It is written in React.
    </p>
  </div>
</div>;

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
            {mode !== MODE_ADHOC && !isMobile &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_ADHOC) }}>Switch to {MODE_ADHOC}</button>
                </div>
            }
            {mode !== MODE_PHONEYGRAMS &&
                <div className='p-2 bg-primary'>
                  <button className='btn btn-primary btn-dark' onClick={() => { setMode(MODE_PHONEYGRAMS) }}>Switch to {MODE_PHONEYGRAMS}</button>
                </div>
            }
          </div>
        {mode === MODE_HOME && Home}
        {mode === MODE_REGEX && ShowRegexMode}
        {mode === MODE_LADDER && <Ladder/>}
        {mode === MODE_MINEFIELD && <Minefield mlist={mlist} mindex={mindex} setMindex={setMindex} mdesc={mdesc} setMdesc={setMdesc} />}
        {mode === MODE_POTLUCK && <Potluck/>}
        {mode === MODE_DOUBLESIXES && <DoubleSixes/>}
        {mode === MODE_ADHOC && <Adhoc/>}
        {mode === MODE_PHONEYGRAMS && <Phoneygrams/>}
      </header>
    </div>
  );
}

export default App;
