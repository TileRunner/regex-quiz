import './showPotluckList.css';

const ShowPotluckList=({potluckList, setPotluckIndex, setPotluckDesc}) => {
    return <div className='potluckListDiv'>
      <h1>Potluck List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {potluckList.map((p) => <tr key={`potluckListItem${p.id}`}>
            <td>{p.desc}</td>
            <td>{p.lexicon}</td>
            <td><button className='btn btn-primary' onClick={() => { setPotluckIndex(p.id); setPotluckDesc(p.desc); } }>Select</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowPotluckList;