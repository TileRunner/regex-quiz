import {useState, useEffect} from 'react';
import './potluck.css';
import ShowPotluckList from './showPotluckList';
import EatPotluck from './eatPotluck';
import setFromJsonFile from '../../functions/setFromJsonFile';

const Potluck=() => {
    const [potluckList, setPotluckList] = useState([]);
    const [potluckIndex, setPotluckIndex] = useState(-1);
    const [potluckDesc, setPotluckDesc] = useState('Potluck not selected');
    const getPotluckList=()=>{
        setFromJsonFile('potlucks/potluckList.json', setPotluckList, true);
    }

    useEffect(()=>{
        getPotluckList();
    },[])
    
    return (<div className='potluck'>
        {potluckIndex > -1 &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{potluckDesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setPotluckIndex(-1); } }>Quit this potluck</button>
                </li>
            </ul>
        }
        {potluckList && potluckList.length && potluckIndex < 0 &&
            <ShowPotluckList potluckList={potluckList} setPotluckIndex={setPotluckIndex} setPotluckDesc={setPotluckDesc} />
        }
        {potluckIndex > -1 &&
            <EatPotluck filename={`potlucks/${potluckList[potluckIndex].lexicon}/${potluckList[potluckIndex].filename}`}/>
        }
    </div>);
}

export default Potluck;