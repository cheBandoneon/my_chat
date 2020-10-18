import React from 'react';
import './avatar.css';

function Avatar(props) {
  const {url} = props;

  return(
    <div className="avatar" style={{backgroundImage: `url(${url})`}}>
    </div>
  )
}

export default Avatar;