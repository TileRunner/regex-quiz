import './showQuizLevelList.css';

const ShowQuizLevelList=({llist, setLindex, setLdesc}) => {
    return <div className='levellistdiv'>
      <h1>Quiz Level List</h1>
      <table className='table table-dark table-striped table-hover table-bordered'>
        <thead>
          <tr>
            <th>Level</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {llist.map((l) => <tr key={`level${l.level}`}>
            <td>{l.level}</td>
            <td>{l.desc}</td>
            <td><button className='btn btn-primary' onClick={() => { setLindex(l.level); setLdesc(l.desc); } }>Select</button></td>
          </tr>)}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowQuizLevelList;  