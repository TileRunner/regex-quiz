function setListInfo(setLlist) {
    fetch('quizzes/llist.json'
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setLlist(myJson);
      });
}

export default setListInfo;