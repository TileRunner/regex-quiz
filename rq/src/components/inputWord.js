import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
const InputWord = ({handleSubmit, handleRemoveGuess, questionIndex, question, pictogram, autoclear}) => {
    const [myword, setMyword] = useState('');
    const [showHelp, setShowHelp] = useState(false);
    const handleShowHelp = () => setShowHelp(true);
    const handleCloseHelp = () => setShowHelp(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClearErrorMessage = () => setErrorMessage('');

    async function mysubmit(event) {
        event.preventDefault();
        var re = new RegExp("^" + question + "$", "g");
        if (!re.test(myword.toUpperCase())) {
            alert(`${myword.toUpperCase()} does not fully match regular expression ${question}`);
            return;
        }
        if (autoclear) {
            setMyword('');
        }
        handleSubmit(questionIndex, myword);
    }
    async function myremove(event) {
        event.preventDefault();
        handleRemoveGuess(questionIndex, myword);
        setMyword('');
    }

    return (<div>
    <Modal
    show={errorMessage !== ''}
    onHide={handleClearErrorMessage}
    animation={false}
    centered
    backdrop='static'
    >
        <Modal.Header closeButton>
            <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {errorMessage}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClearErrorMessage}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    <Offcanvas show={showHelp} onHide={handleCloseHelp} placement='bottom'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Help</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <p>Enter all valid words that match the regular expression <span className='rex'>{question}</span></p>
            <p>The guide below shows how this regular expression works.</p>
            <table>
                <thead>
                    <tr>
                        <th>Syntax</th>
                        <th>Meaning</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    {question.indexOf('?') > -1 && <tr>
                        <td>?</td>
                        <td>The previous item is optional</td>
                        <td>CAR?T is matched by CAT and CART</td>
                    </tr>}
                    {question.indexOf('[') > -1 && <tr>
                        <td>[ABC]</td>
                        <td>One of the letters inside the square brackets appears next</td>
                        <td>C[AOU]B is matched by CAB, COB, and CUB</td>
                    </tr>}
                    {question.indexOf('[^') > -1 && <tr>
                        <td>[^ABC]</td>
                        <td>Any letter other than the letters inside the square brackets appears next</td>
                        <td>C[^A]B is matched by COB and CUB but not CAB</td>
                    </tr>}
                    {question.indexOf('|') > -1 && <tr>
                        <td>(A|B|C)</td>
                        <td>The next sequence of letters is one of the pipe delimited values</td>
                        <td>C(A|O|UR)B is matched by CAB, COB, and CURB</td>
                    </tr>}
                    {question.indexOf('.') > -1 && <tr>
                        <td>.</td>
                        <td>Any letter</td>
                        <td>The valid answers for C.B would be CAB, COB, and CUB.</td>
                    </tr>}
                    {question.indexOf('{') > -1 && <tr>
                        <td>&#123;x,y&#125;</td>
                        <td>The previous item occurs x to y times</td>
                        <td>HM&#123;1,3&#125; is matched by HM, HMM, and HMMM</td>
                    </tr>}
                </tbody>
            </table>
        </Offcanvas.Body>
    </Offcanvas>
    <Form onSubmit={mysubmit}>
        <InputGroup>
            <Button variant="outline-secondary" onClick={() => {setMyword('')}}>Clear</Button>
            <Form.Control
            type="text"
            value={myword}
            onChange={e => { setMyword(e.target.value); } }
            placeholder="Your word..."
            autoComplete='false'
            />
            <Button variant="primary" type='submit'>Submit</Button>
            <Button variant='danger' onClick={myremove}>Remove</Button>
            <Button variant="info" onClick={handleShowHelp}>Help</Button>
        </InputGroup>
    </Form>
    {pictogram && pictogram.length && <div className='pictogramdiv'>
        <div className='row'>
            {pictogram.split("&").map((x,xi) =>
                <div className='col' key={`xi${xi}`}>
                    {x.split("|").map((y,yi) =>
                        <div className='row' key={`yi${yi}`}>
                            {y}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>}
    </div>);
}

export default InputWord;