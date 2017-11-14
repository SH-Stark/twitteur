import React, { PropTypes } from 'react';
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css';
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css';
import { TweetContainer, RepliesContainer } from 'containers';
import { formatReply } from 'helpers/utils';

function Reply ({submit}) {
  function handleSubmit(e) {
    if (Reply.ref.value.length === 0) {
      return
    }
    submit(Reply.ref.value, e);
    Reply.ref.value = '';
  }
  return (
    <div className={replyTextAreaContainer}>
      <textarea
        ref={(ref) => Reply.ref = ref}
        className={replyTextArea}
        maxLength={140}
        placeholder='Your Response'
        type='text' />

      <button onClick={handleSubmit} className={darkBtn}>
        {'Submit'}
      </button>
    </div>
  )
}

TweetDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
}

export default function TweetDetails ({ tweetId, isFetching, authedUser, error, addAndHandleReply }) {
  return (
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
            <div className={content}>
              <TweetContainer tweetId={tweetId} hideLikeCount={false} hideReplyBtn={true} />
              <Reply submit={(replyText) => addAndHandleReply(tweetId, formatReply(authedUser, replyText))} />
            </div>
            <div className={repliesContainer}>
              <RepliesContainer tweetId={tweetId} />
            </div>
          </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
