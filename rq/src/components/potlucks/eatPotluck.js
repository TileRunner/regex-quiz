import './eatPotluck.css';
import { useState, useEffect } from "react";
import setFromJsonFile from '../../functions/setFromJsonFile';


const RESULT_GOOD = "🍪 That was yummy!! 🍪";
const RESULT_BAD = "🤢 I ate something bad!! 🤢";
const RESULT_UNEATEN = "🥺 I missed out 🥺";

const EatPotluck = ({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [result, setResult] = useState("");

    useEffect(()=>{
        // Get the data from a json file in the public folder
        function getDataTxt() {
            function tagData(temp) {
                temp.forEach((item) => {item.clicked=false;});
                temp.sort(() => Math.random() - 0.5);
                setData(temp);
                setCurrentIndex(0);
            }
            setFromJsonFile(filename, tagData, true);
        }
        getDataTxt();
    },[filename]);

    function handleWordClick(index, validInvalid) {
        if (done || data[index].clicked) {
            return;
        }
        let newDone = false;
        let newdata = JSON.parse(JSON.stringify(data));
        newdata[index].clicked = true;
        let numclicked = 0;
        newdata.forEach(element => {
            if (element.clicked) {
                numclicked++;
            }
        });
        if (newdata[index].valid !== validInvalid || numclicked === data.length) {
            newDone = true;
            setDone(true);
            if (newdata[index].valid !== validInvalid) {
                setResult(newdata[index].valid ? RESULT_UNEATEN.replace('out','out on ' + data[index].word) : RESULT_BAD);
            } else {
                setResult(RESULT_GOOD);
            }
        }
        setData(newdata);
        if (!newDone && numclicked < data.length) {
            setCurrentIndex(currentIndex+1);
        }
    }
    function resetPotluck() {
        let newdata = JSON.parse(JSON.stringify(data));
        newdata.forEach(element => {
            element.clicked = false;
        });
        setData(newdata);
        setDone(false);
        setResult("");
        setCurrentIndex(0);
    }

    return (<div>
        <h1>Click on the <span className="valid"/> for valid words, and the <span className='invalid'/> for invalid words</h1>
        {currentIndex > -1 && data.map((item,index) => <div key={index}>
            {(index < currentIndex || (index === currentIndex && done)) && <div key={`clicked${index}`} className='showWord clicked'>
                {data[index].valid && <span className='valid'/>}
                <span className='word'>{data[index].word}</span>
                {!data[index].valid && <span className='invalid'/>}
            </div>}
            {!done && index === currentIndex && <div key={`unclicked${index}`} className='showWord unclicked'>
                <button
                onClick={() => { handleWordClick(index, true); } }
                >
                    <span className='valid'/>
                </button>
                <span className='word'>{data[index].word}</span>
                <button
                onClick={() => { handleWordClick(index, false); } }
                >
                    <span className='invalid'/>
                </button>
            </div>}
        </div>)}
        {result && <div>
            <h1>{result}</h1>
            <button className='btn btn-dark' onClick={() => {resetPotluck();}}>Play Again</button>
        </div>}
        </div>);
}

export default EatPotluck