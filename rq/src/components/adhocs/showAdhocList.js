import './showAdhocList.css';

const ShowAdhocList=({adhocList, setAdhocLexicon, setAdhocFile, setAdhocDesc}) => {
    return <div className='adhocListDiv'>
      <h1>Ad hoc List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Dropdowns</th>
          </tr>
        </thead>
        <tbody>
          {adhocList.map((p) => <tr key={`adhocListItem${p.id}`}>
            <td>{p.desc}</td>
            <td>{p.lexicon}</td>
            <td>
            <div className='dropdown'>
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                Dropdown
                </button>
                <ul className='dropdown-menu'>
                {p.set.map((p2) =>
                    <li key={p2.filename}>
                    <button className='btn btn-primary dropdown-item' onClick={() => { setAdhocLexicon(p.lexicon); setAdhocFile(p2.filename); setAdhocDesc(p2.desc); } }>{p2.desc}</button>
                    </li>
                )}
                </ul>
            </div>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowAdhocList;