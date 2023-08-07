function loadDoubleSixesQuiz(quizpath, takeLoadedQuiz) {
    fetch(quizpath
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
            let letterpattern = /[A-Z]/; // any letter
            let quiz = []; // array of {question, answers[], guesses[]}
            let lines = mytext.split(/\r?\n/); // split file into array of lines
            let nextid=0; // make an identifier
            lines.forEach(line => {
                if (line.search(letterpattern) > -1) {
                    /* Has letters; must be an info line. Samples to show format:
                    ABSOLUTIZING: LAZING + SUBITO
                    BREAKFAST TEA: ABAKAS + FETTER, ABATER + FAKEST
                    */
                    nextid++;
                    let split1 = line.split(":");
                    let phrase = split1[0];
                    let solutions = split1[1].split(",");
                    let answers = [];
                    solutions.forEach(solution => {
                        let words = solution.split("+");
                        answers.push({word1:words[0].trim(), word2:words[1].trim()});
                    });
                    quiz.push({id: nextid, phrase: phrase, answers: answers});
                }
            });
            // give caller the quiz
            takeLoadedQuiz(quiz);
        });

}
export default loadDoubleSixesQuiz;