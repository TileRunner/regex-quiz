import './showQuizList.css';

const ShowQuizList=({qlist, lindex, setQindex, setQdesc}) => {
    return <div className='quizlistdiv'>
      <h1>Quiz List</h1>
      <table className='table table-striped table-bordered table-hover table-dark'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Lexicon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {qlist.filter(q => q.level === lindex).map((q) => <tr key={`quizlistitem${q.id}`}>
            <td>{q.desc}</td>
            <td>{q.lexicon}</td>
            <td><button className='btn btn-primary' onClick={() => { setQindex(q.id); setQdesc(q.desc); } }>Select</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
  
export default ShowQuizList;