import {useState, useEffect} from 'react';
import loadDoubleSixesQuiz from '../../functions/loadDoubleSixesQuiz';
import './solveDoubleSixes.css';

const SolveDoubleSixes=({filename}) => {
    const [data, setData] = useState([]);
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
        <h1>Goal: Rearrange the letters in the phrase into two six-letter words.</h1>
        <h2>For now you can check the answers yourself. I haven't coded that far yet.</h2>
        <table className='table table-striped table-bordered table-hover table-dark'>
            <thead>
                <tr>
                    <th>Phrase</th>
                    <th>#Answers</th>
                </tr>
            </thead>
            <tbody>
                {data && data.length && data.map((item) =>
                <tr key={item.id}>
                    <td className='phrase'>{item.phrase}</td>
                    <td>{item.answers.length}</td>
                </tr>
                )}
            </tbody>
        </table>
    </div>)
}

export default SolveDoubleSixes;