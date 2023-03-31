import './minefield.css';
import ShowMinefieldList from './showMinefieldList';
import WalkMinefield from './walkMinefield';

const Minefield=({mlist, mindex, setMindex, mdesc, setMdesc}) => {
    return (<div className='minefield'>
        {mindex > -1 &&
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item list-group-item-info">{mdesc}</li>
                <li className="list-group-item list-group-item-info">
                    <button className='btn btn-dark' onClick={() => { setMindex(-1); } }>Quit this minefield</button>
                </li>
            </ul>
        }
        {mlist && mlist.length && mindex < 0 &&
            <ShowMinefieldList mlist={mlist} setMindex={setMindex} setMdesc={setMdesc} />
        }
        {mindex > -1 &&
            <WalkMinefield filename={`minefields/${mlist[mindex].lexicon}/${mlist[mindex].filename}`}/>
        }
    </div>);
}

export default Minefield;