import './showPhoneygramsList.css';

const ShowPhoneygramsList=({phoneygramsList, setPhoneygramsIndex, setPhoneygramsDesc}) => {
    return <div className='showPhoneygramsList'>
      <h1>Phoneygrams List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {phoneygramsList.map((phoneygramsItem) => <tr key={`${phoneygramsItem.id}`}>
            <td>{phoneygramsItem.desc}</td>
            <td>{phoneygramsItem.lexicon}</td>
            <td><button className='btn btn-primary' onClick={() => { setPhoneygramsIndex(phoneygramsItem.id); setPhoneygramsDesc(phoneygramsItem.desc); } }>Select</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowPhoneygramsList;