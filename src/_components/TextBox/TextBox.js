import React, {useState} from 'react';
import './textbox.css';

function TextBox(props) {

  const [textBoxVal, setTextBoxVal] = useState('');

  const onFormSubmit = async (e) => {
    e && e.preventDefault();

    props.sendMessage(textBoxVal);
    setTextBoxVal('');
  }

  const onKeyDown = (e) => {
    if( e.key == 'Enter' && ! ( e.shiftKey && e.key == 'Enter' ) ) {
      e.preventDefault();
      onFormSubmit();
    }
  }

  return(
    <form className="chat-form" onSubmit={(e)=> onFormSubmit(e)}>
      <textarea className="chat-form__textarea" placeholder="Please type.." onKeyDown={e=> onKeyDown(e)} onChange={e=> setTextBoxVal(e.target.value)} value={textBoxVal}></textarea>
    </form>
  )
}

export default TextBox;