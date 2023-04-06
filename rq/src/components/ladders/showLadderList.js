import './showLadderList.css';

const ShowLadderList=({ladderList, setLadderIndex, setLadderDesc}) => {
    return <div className='showLadderList'>
      <h1>Ladder List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ladderList.map((ladder) => <tr key={`ladderlistitem${ladder.id}`}>
            <td>{ladder.desc}</td>
            <td>{ladder.lexicon}</td>
            <td><button className='btn btn-primary' onClick={() => { setLadderIndex(ladder.id); setLadderDesc(ladder.desc); } }>Select</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowLadderList;