import {useState, useEffect} from 'react';
import './ladder.css';
import ShowLadderList from './showLadderList';
import ClimbLadder from './climbLadder';
import setFromJsonFile from '../../functions/setFromJsonFile';

const Ladder=() => {
    const [ladderList, setLadderList] = useState([]);
    const [ladderIndex, setLadderIndex] = useState(-1);
    const [ladderDesc, setLadderDesc] = useState('Ladder not selected');
    const getLadderList=()=>{
        setFromJsonFile('ladders/ladderList.json', setLadderList, true);
    }

    useEffect(()=>{
        getLadderList();
    },[])
    
    return (<div className='ladder'>
        {ladderIndex > -1 &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{ladderDesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setLadderIndex(-1); } }>Quit this ladder</button>
                </li>
            </ul>
        }
        {ladderList && ladderList.length && ladderIndex < 0 &&
            <ShowLadderList ladderList={ladderList} setLadderIndex={setLadderIndex} setLadderDesc={setLadderDesc} />
        }
        {ladderIndex > -1 &&
            <ClimbLadder filename={`ladders/${ladderList[ladderIndex].lexicon}/${ladderList[ladderIndex].filename}`}/>
        }
    </div>);
}

export default Ladder;