import {useState, useEffect} from 'react';
import './phoneygrams.css';
import ShowPhoneygramsList from './showPhoneygramsList';
import SolvePhoneygrams from './solvePhoneygrams';
import setFromJsonFile from '../../functions/setFromJsonFile';

const Phoneygrams=() => {
    const [phoneygramsList, setPhoneygramsList] = useState([]);
    const [phoneygramsIndex, setPhoneygramsIndex] = useState(-1);
    const [phoneygramsDesc, setPhoneygramsDesc] = useState('Item not selected');
    const getPhoneygramsList=()=>{
        setFromJsonFile('phoneygrams/phoneygramList.json', setPhoneygramsList, true);
    }

    useEffect(()=>{
        getPhoneygramsList();
    },[])
    
    return (<div className='phoneygrams'>
        {phoneygramsIndex > -1 &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{phoneygramsDesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setPhoneygramsIndex(-1); } }>Quit this item</button>
                </li>
            </ul>
        }
        {phoneygramsList && phoneygramsList.length && phoneygramsIndex < 0 &&
            <ShowPhoneygramsList phoneygramsList={phoneygramsList} setPhoneygramsIndex={setPhoneygramsIndex} setPhoneygramsDesc={setPhoneygramsDesc} />
        }
        {phoneygramsIndex > -1 &&
            <SolvePhoneygrams filename={`phoneygrams/${phoneygramsList[phoneygramsIndex].lexicon}/${phoneygramsList[phoneygramsIndex].filename}`}/>
        }
    </div>);
}

export default Phoneygrams;