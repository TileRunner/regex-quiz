import {useState, useEffect} from 'react';
import './potluck.css';
import ShowPotluckList from './showPotluckList';
import EatPotluck from './eatPotluck';
import setFromJsonFile from '../../functions/setFromJsonFile';

const Potluck=() => {
    const [potluckList, setPotluckList] = useState([]);
    const [potluckLexicon, setPotluckLexicon] = useState('');
    const [potluckFile, setPotluckFile] = useState('');
    const [potluckDesc, setPotluckDesc] = useState('Potluck not selected');
    const getPotluckList=()=>{
        setFromJsonFile('potlucks/potluckList.json', setPotluckList, true);
    }

    useEffect(()=>{
        getPotluckList();
    },[])
    
    return (<div className='potluck'>
        {potluckFile &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{potluckDesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setPotluckLexicon(''); setPotluckFile(''); } }>Quit this potluck</button>
                </li>
            </ul>
        }
        {potluckList && potluckList.length && !potluckFile &&
            <ShowPotluckList potluckList={potluckList} setPotluckLexicon={setPotluckLexicon} setPotluckFile={setPotluckFile} setPotluckDesc={setPotluckDesc} />
        }
        {potluckLexicon && potluckFile &&
            <EatPotluck filename={`potlucks/${potluckLexicon}/${potluckFile}`}/>
        }
    </div>);
}

export default Potluck;