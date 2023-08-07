import {useState, useEffect} from 'react';
import './doubleSixes.css';
import ShowDoubleSixesList from './showDoubleSixesList';
import SolveDoubleSixes from './solveDoubleSixes';
import setFromJsonFile from '../../functions/setFromJsonFile';

const DoubleSixes=() => {
    const [doubleSixesList, setDoubleSixesList] = useState([]);
    const [doubleSixesIndex, setDoubleSixesIndex] = useState(-1);
    const [doubleSixesDesc, setDoubleSixesDesc] = useState('Item not selected');
    const getDoubleSixesList=()=>{
        setFromJsonFile('doublesixes/doubleSixesList.json', setDoubleSixesList, true);
    }

    useEffect(()=>{
        getDoubleSixesList();
    },[])
    
    return (<div className='doubleSixes'>
        {doubleSixesIndex > -1 &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{doubleSixesDesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setDoubleSixesIndex(-1); } }>Quit this item</button>
                </li>
            </ul>
        }
        {doubleSixesList && doubleSixesList.length && doubleSixesIndex < 0 &&
            <ShowDoubleSixesList doubleSixesList={doubleSixesList} setDoubleSixesIndex={setDoubleSixesIndex} setDoubleSixesDesc={setDoubleSixesDesc} />
        }
        {doubleSixesIndex > -1 &&
            <SolveDoubleSixes filename={`doublesixes/${doubleSixesList[doubleSixesIndex].lexicon}/${doubleSixesList[doubleSixesIndex].filename}`}/>
        }
    </div>);
}

export default DoubleSixes;