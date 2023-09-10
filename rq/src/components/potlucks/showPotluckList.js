import './showPotluckList.css';

const ShowPotluckList=({potluckList, setPotluckLexicon, setPotluckFile, setPotluckDesc}) => {
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
            {p.set ?
              <td>
                <div className='dropdown'>
                  <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                    Dropdown
                  </button>
                  <ul className='dropdown-menu'>
                    {p.set.map((p2) =>
                      <li key={p2.filename}>
                        <button className='btn btn-primary dropdown-item' onClick={() => { setPotluckLexicon(p.lexicon); setPotluckFile(p2.filename); setPotluckDesc(p2.desc); } }>{p2.desc}</button>
                      </li>
                    )}
                  </ul>
                </div>
              </td>
            :
              <td><button className='btn btn-primary' onClick={() => { setPotluckLexicon(p.lexicon); setPotluckFile(p.filename); setPotluckDesc(p.desc); } }>Select</button></td>
            }
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowPotluckList;