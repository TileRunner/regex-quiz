import './showDoubleSixesList.css';

const ShowDoubleSixesList=({doubleSixesList, setDoubleSixesIndex, setDoubleSixesDesc}) => {
    return <div className='showDoubleSixesList'>
      <h1>Double Sixes List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doubleSixesList.map((doubleSixesItem) => <tr key={`${doubleSixesItem.id}`}>
            <td>{doubleSixesItem.desc}</td>
            <td>{doubleSixesItem.lexicon}</td>
            <td><button className='btn btn-primary' onClick={() => { setDoubleSixesIndex(doubleSixesItem.id); setDoubleSixesDesc(doubleSixesItem.desc); } }>Select</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowDoubleSixesList;