import './walkMinefield.css';
import { useState, useEffect } from "react";
import loadMinefield from '../../functions/loadMinefield';

const RESULT_GOOD = "❤️❤️ SUCCESS! ❤️❤️";
const RESULT_BAD = "💥💥 KABOOM!! 💥💥";

const WalkMinefield = ({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [result, setResult] = useState("");

    useEffect(()=>{
        // Get the data from a text file in the public folder
        function getDataTxt() {
            function takeLoadedMinefield(minefield) {
                setData(minefield);
                setDone(false);
            }
            loadMinefield(filename, takeLoadedMinefield);
        }
        getDataTxt();
    },[filename]);

    function getWordClass(index) {
        if (data[index].clicked) {
            if (!data[index].valid) {
                return "btn btn-danger wordButton explosion";
            }
            return "btn btn-success wordButton heart";
        }
        if (done && !data[index].valid) {
            if (result === RESULT_BAD) {
                return "btn btn-danger wordButton";
            } else {
                return "btn btn-danger wordButton defused";
            }
        }
        return "btn btn-warning wordButton";
    }

    function handleWordClick(index) {
        if (done || data[index].clicked) {
            return;
        }
        let newdata = JSON.parse(JSON.stringify(data));
        newdata[index].clicked = true;
        let numclicked = 0;
        newdata.forEach(element => {
            if (element.clicked) {
                numclicked++;
            }
        });
        if (!newdata[index].valid || numclicked + numclicked === data.length) {
            setDone(true);
            if (!newdata[index].valid) {
                setResult(RESULT_BAD);
            } else {
                setResult(RESULT_GOOD);
            }
        }
        setData(newdata);
    }
    function resetMinefield() {
        let newdata = JSON.parse(JSON.stringify(data));
        newdata.forEach(element => {
            element.clicked = false;
        });
        setData(newdata);
        setDone(false);
        setResult("");
    }

    return (<div>
        <h1>Click on the valid words to clear the minefield</h1>
        {data && data.length && data.map((item, index) =>
            <button
             key={`item${item.id}`}
             className={`${getWordClass(index)}`}
             onClick={() => { handleWordClick(index); } }
             >
                {item.word}
            </button>
        )}
        {result && <div>
            <h1>{result}</h1>
            <button className='btn btn-dark' onClick={() => {resetMinefield();}}>Play Again</button>
        </div>}
        </div>);
}

export default WalkMinefield