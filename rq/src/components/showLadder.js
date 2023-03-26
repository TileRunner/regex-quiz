import './showLadder.css';

const ShowLadder = ({data, currentIndex, done}) => {
    function rungClass(item,index) {
        let i = data.length - 1 - index; // Easier to think with i increasing as currentIndex increases
        if (i < currentIndex) {
            return 'rungGood';
        }
        if (i === currentIndex) {
            if (!done) {
                return 'rungTBD';
            }
            // Check for errors
            let errors = false;
            item.guesses.forEach((guess) => {
                if (item.answers.indexOf(guess) < 0) {
                    errors = true;
                }
            });
            item.answers.forEach((answer) => {
                if (item.guesses.indexOf(answer) < 0) {
                    errors = true;
                }
            });
            if (errors) {
                return 'rungBad';
            }
            return 'rungPerfect';
        }
        return 'rungTBD';
    }
    return (<div className="ladder">
        {data.map((item, index) =>
            <div key={`rung${index}`}
             className={`${rungClass(item,index)}`}/>
        )}
    </div>);
}

export default ShowLadder;