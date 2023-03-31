import './showMinefieldList.css';

const ShowMinefieldList=({mlist, setMindex, setMdesc}) => {
    return <div className='minefieldlistdiv'>
      <h1>Minefield List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mlist.map((m) => <tr key={`minefieldlistitem${m.id}`}>
            <td>{m.desc}</td>
            <td>{m.lexicon}</td>
            <td><button className='btn btn-primary' onClick={() => { setMindex(m.id); setMdesc(m.desc); } }>Select</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowMinefieldList;