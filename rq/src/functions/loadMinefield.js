function loadMinefield(minefieldPath, takeLoadedMinefield) {
    fetch(minefieldPath
        ,{
            headers : {
            'Content-Type': 'application/text',
            'Accept': 'application/text'
            }
        }
        )
        .then(function(response){
            return response.text();
        })
        .then(function(mytext) {
            let minefield = []; // array of {id: number, word: 'good or bad word', value: bool, clicked: false}
            let lines = mytext.split(/\r?\n/); // split file into array of lines
            let nextid=1; // make an identifier
            lines.forEach(line => {
                if (line.indexOf(',') > -1) {
                    let splitline = line.split(',');
                    // Randomize which appears first but keep the two together
                    if (Math.random() <= 0.5) {
                        minefield.push({id: nextid, word: splitline[0], valid: true, clicked: false});
                        nextid++;
                        minefield.push({id: nextid, word: splitline[1], valid: false, clicked: false});
                        nextid++;    
                    } else {
                        minefield.push({id: nextid, word: splitline[1], valid: false, clicked: false});
                        nextid++;
                        minefield.push({id: nextid, word: splitline[0], valid: true, clicked: false});
                        nextid++;
                    }
                }
            });
            // give caller the minefield
            takeLoadedMinefield(minefield);
        });

}
export default loadMinefield;