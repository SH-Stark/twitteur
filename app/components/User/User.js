import React, { PropTypes } from 'react';
import { userContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css';
import { TweetContainer } from 'containers';

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  tweetIds: PropTypes.array.isRequired,
}

export default function User (props) {
  return props.noUser === true
  ? <p className={header}>{'This user does not exist.'}</p>
  : <div>
    {props.isFetching === true
      ? <p className={header}>{'Loading'}</p>
      : <div>
        <div className={userContainer}>
          <div>{props.name}</div>
        </div>
        {props.tweetIds.map((id) => (
          <TweetContainer tweetId={id} key={id}/>
        ))}
        {props.tweetIds.length === 0
          ? <p className={header}>
            {`It looks like ${props.name.split(' ')[0]} hasn't made any tweet yet.}`}
          </p>
          : null}
        </div>
      }
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
  }
