import {useState, useEffect} from 'react';
import loadDoubleSixesQuiz from '../../functions/loadDoubleSixesQuiz';
import './solveDoubleSixes.css';
import SolveOneDoubleSix from './solveOneDoubleSix';

const SolveDoubleSixes=({filename}) => {
    const [data, setData] = useState([]);
    const [itemid, setItemid] = useState(-1);
    useEffect(()=>{
        // Get the data from a text file in the public folder
        function getDataTxt() {
            function takeLoadedQuiz(quiz) {
                setData(quiz);
            }
            loadDoubleSixesQuiz(filename, takeLoadedQuiz);
        }
        getDataTxt();
    },[filename])
    return(<div>
        {itemid < 0 ? <div>
            <h1>Goal: Rearrange the letters in the phrase into two six-letter words.</h1>
            <h2>For now you can check the answers yourself. I haven't coded that far yet.</h2>
            <table className='table table-striped table-bordered table-hover table-dark'>
                <thead>
                    <tr>
                        <th>Phrase</th>
                        <th>#Answers</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length && data.map((item) =>
                    <tr key={item.id}>
                        <td className='phrase'>{item.phrase}</td>
                        <td>{item.answers.length}</td>
                        <td><button onClick={() => {setItemid(item.id);}}>SOLVE</button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        : <SolveOneDoubleSix data={data.filter(item => {return item.id === itemid})[0]} setItemid={setItemid}/>
        }
    </div>)
}

export default SolveDoubleSixes;