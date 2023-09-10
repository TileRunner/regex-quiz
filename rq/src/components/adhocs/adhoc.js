import {useState, useEffect} from 'react';
import './adhoc.css';
import ShowAdhocList from './showAdhocList';
import SolveAdhoc from './solveAdhoc';
import setFromJsonFile from '../../functions/setFromJsonFile';

const Adhoc=() => {
    const [adhocList, setAdhocList] = useState([]);
    const [adhocLexicon, setAdhocLexicon] = useState('');
    const [adhocFile, setAdhocFile] = useState('');
    const [adhocDesc, setAdhocDesc] = useState('Adhoc not selected');
    const getAdhocList=()=>{
        setFromJsonFile('adhocs/adhocList.json', setAdhocList, true);
    }

    useEffect(()=>{
        getAdhocList();
    },[])
    
    return (<div className='adhoc'>
        {adhocFile &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{adhocDesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setAdhocLexicon(''); setAdhocFile(''); } }>Quit this adhoc</button>
                </li>
            </ul>
        }
        {adhocList && adhocList.length && !adhocFile &&
            <ShowAdhocList adhocList={adhocList} setAdhocLexicon={setAdhocLexicon} setAdhocFile={setAdhocFile} setAdhocDesc={setAdhocDesc} />
        }
        {adhocLexicon && adhocFile &&
            <SolveAdhoc filename={`adhocs/${adhocLexicon}/${adhocFile}`}/>
        }
    </div>);
}

export default Adhoc;