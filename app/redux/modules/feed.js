import { addListener } from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/api'
import { addMultipleTweets } from 'redux/modules/tweets'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_TWEET_ID_TO_FEED = 'ADD_NEW_TWEET_ID_TO_FEED'
const RESET_NEW_TWEETS_AVAILABLE = 'RESET_NEW_TWEETS_AVAILABLE'

function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError (error) {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

function settingFeedListenerSuccess (tweetIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    tweetIds,
  }
}


function addNewTweetIdToFeed (tweetId) {
  return {
    type: ADD_NEW_TWEET_ID_TO_FEED,
    tweetId,
  }
}

export function resetNewTweetsAvailable () {
  return {
    type: RESET_NEW_TWEETS_AVAILABLE,
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true;
  return function (dispatch, getState) {
    if (getState().listeners.feed === true) {
      return
    }

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())
    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultipleTweets(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewTweetIdToFeed(sortedIds[0]))
      initialFetch = false
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

const initialState = {
  newTweetsAvailable: false,
  newTweetsToAdd: [],
  isFetching: false,
  error: '',
  tweetIds: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        tweetIds: action.tweetIds,
        newTweetsAvailable: false,
      }
    case ADD_NEW_TWEET_ID_TO_FEED :
      return {
        ...state,
        newTweetsToAdd: [action.tweetId, ...state.newTweetsToAdd],
        newTweetsAvailable: true,
      }
    case RESET_NEW_TWEETS_AVAILABLE :
      return {
        ...state,
        tweetIds: [...state.newTweetsToAdd, ...state.tweetIds],
        newTweetsToAdd: [],
        newTweetsAvailable: false,
      }
    default :
      return state
  }
}
