function loadQuiz(quizpath, takeLoadedQuiz) {
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
            let tabpattern = /\t/; // tab character search
            let letterpattern = /[A-Z]/; // any letter
            let question = ""; // the regular expression (that is the question)
            let pictogram = ""; // pictogram (optional) used to show the possible answers in a grid
            let answers = [];
            let quiz = []; // array of {question, answers[], guesses[]}
            let lines = mytext.split(/\r?\n/); // split file into array of lines
            let nextid=1; // make an identifier
            lines.forEach(line => {
                if (line.search(letterpattern) > -1) {
                    // Has letters; must be a question, a pictogram, or an answer
                    if (line.search(tabpattern) === 0) {
                        // answer (starts with tab, followed by answer)
                        let answer = line.substring(1);
                        answers.push(answer);
                    } else if (line.startsWith(":")) {
                        // pictogram (starts with colon, followed by pictogram)
                        pictogram = line.substring(1);
                    } else {
                        // new question (does not start with tab or colon)
                        if (question.length) {
                            // finish previous question
                            answers.sort();
                            quiz.push({id: nextid, question: question, pictogram: pictogram, answers: answers, guesses: []}); // no guesses yet
                            nextid++;
                            answers = [];
                            pictogram = "";
                        }
                        question = line;
                    }
                }
            });
            // finish previous question
            answers.sort();
            quiz.push({id: nextid, question: question, pictogram: pictogram, answers: answers, guesses: []}); // no guesses yet
            // give caller the quiz
            takeLoadedQuiz(quiz);
        });

}
export default loadQuiz;