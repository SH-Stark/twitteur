import React, { PropTypes } from 'react';
import { container, title, slogan } from './styles.css';

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Twitteur'}</p>
      <p className={slogan}>{`What's on your mind mate ?`}</p>
    </div>
  )
}
