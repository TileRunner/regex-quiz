function setFromJsonFile(path, setData, assignIds) {
    fetch(path
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
        if (assignIds) {
            myJson.forEach((element, index) => {
                element.id = index;
            });
        }
        setData(myJson);
      });
}

export default setFromJsonFile;