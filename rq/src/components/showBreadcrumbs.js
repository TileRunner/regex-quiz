const ShowBreadcrumbs = ({lindex, ldesc, setLindex, setQindex, qindex, qdesc}) => {
    return <ul className="list-group list-group-horizontal">
      <li className="list-group-item list-group-item-info">Level {lindex}: {ldesc}</li>
      <li className="list-group-item list-group-item-secondary"><button className='btn btn-dark' onClick={() => { setLindex(-1); setQindex(-1); } }>Quit this level</button></li>
      {qindex > -1 && <li className="list-group-item list-group-item-info">Quiz: {qdesc}</li>}
      {qindex > -1 && <li className="list-group-item list-group-item-secondary"><button className='btn btn-dark' onClick={() => { setQindex(-1); } }>Quit this quiz</button></li>}
    </ul>;
  }
  
export default ShowBreadcrumbs;  