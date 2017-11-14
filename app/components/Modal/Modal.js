import React, { PropTypes } from 'react';
import { default as ReactModal } from 'react-modal';
import {
  newTweetTop, pointer, newTweetInputContainer,
  newTweetInput, submitTweetBtn, darkBtn
} from './styles.css';

import { formatTweet } from 'helpers/utils';

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, func, bool } = PropTypes;

Modal.PropTypes = {
  tweetText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateTweetText: func.isRequired,
  tweetFanout: func.isRequired
}

export default function Modal (props) {
  function submitTweet () {
    props.tweetFanout(formatTweet(props.tweetText, props.user));
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'New Tweet'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newTweetTop}>
          <span>{'Compose new Tweet'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newTweetInputContainer}>
          <textarea
            onChange={(e) => props.updateTweetText(e.target.value)}
            value={props.tweetText}
            maxLength={140}
            type='text'
            className={newTweetInput}
            placeholder="What's on your mind ?" />
        </div>
        <button
          className={submitTweetBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitTweet}>
          {'Tweet'}
        </button>
      </ReactModal>
    </span>
  );
}
