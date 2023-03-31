import { useState, useEffect } from "react";
import loadMinefield from '../functions/loadMinefield';

const WalkMinefield = ({filename}) => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);

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

    return (<div>
        <h1>Not Implemented {filename} {done}</h1>
        {data && data.length && data.map((item, index) =>
            <button key={`item${item.id}`} className={`btn ${item.clicked ? "btn-dark" : "btn-primary"}`}
            onClick={() => {let newdata = JSON.parse(JSON.stringify(data)); newdata[index].clicked=true; setData(newdata);}}>
                {item.word}
            </button>
        )}
        </div>);
}

export default WalkMinefield