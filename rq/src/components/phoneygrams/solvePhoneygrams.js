import {useState, useEffect} from 'react';
import setFromJsonFile from '../../functions/setFromJsonFile';
import './solvePhoneygrams.css';
import SolveOnePhoneygram from './solveOnePhoneygram';

const SolvePhoneygrams=({filename}) => {
    const [data, setData] = useState([]);
    const [itemid, setItemid] = useState(-1);
    useEffect(()=>{
        // Get the data from a text file in the public folder
        function getDataTxt() {
            setFromJsonFile(filename, setData, true);
        }
        getDataTxt();
    },[filename])
    return(<div>
        {itemid < 0 ? <div>
            <h1>Goal: Enter the valid anagrams of the phoneygram.</h1>
            <table className='table table-striped table-bordered table-hover table-dark'>
                <thead>
                    <tr>
                        <th>Phoneygram</th>
                        <th>#Answers</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length && data.map((item) =>
                    <tr key={item.id}>
                        <td className='phoneygram'>{item.phoneygram}</td>
                        <td>{item.answers.length}</td>
                        <td><button onClick={() => {setItemid(item.id);}}>SOLVE</button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        : <SolveOnePhoneygram data={data.filter(item => {return item.id === itemid})[0]} setItemid={setItemid} currentId={itemid} maxId={data.length}/>
        }
    </div>)
}

export default SolvePhoneygrams;