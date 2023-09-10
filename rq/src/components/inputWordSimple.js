import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
const InputWordSimple = ({handleSubmitWord}) => {
    const [myword, setMyword] = useState('');

    async function mysubmit(event) {
        event.preventDefault();
        setMyword('');
        handleSubmitWord(myword.toUpperCase().trim());
    }

    return (<div>
    <Form onSubmit={mysubmit}>
        <InputGroup>
            <Form.Control
            type="text"
            value={myword}
            onChange={e => { setMyword(e.target.value); } }
            placeholder="Your word..."
            autoComplete='false'
            />
            <Button variant="primary" type='submit'>Submit</Button>
        </InputGroup>
    </Form>
    </div>);
}

export default InputWordSimple;