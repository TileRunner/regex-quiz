function setQuizInfo(setQlist) {
    fetch('quizzes/qlist.json'
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
        myJson.forEach((element, index) => {
          element.id = index;
        });
        setQlist(myJson);
      });

}

export default setQuizInfo;