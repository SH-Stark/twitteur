import { ref } from 'config/constants';

function saveToTweets (tweet) {
  const tweetId = ref.child('tweets').push().key;
  const tweetPromise = ref.child(`tweets/${tweetId}`).set({...tweet, tweetId});

  return {
    tweetId,
    tweetPromise
  }
}

function saveToUsersTweets (tweet, tweetId) {
  return ref.child(`usersTweets/${tweet.uid}/${tweetId}`)
    .set({...tweet, tweetId})
}

function saveLikeCount (tweetId) {
  return ref.child(`likeCount/${tweetId}`)
    .set(0);
}

export function saveTweet (tweet) {
  const { tweetId, tweetPromise } = saveToTweets(tweet);

  return Promise.all([
    tweetPromise,
    saveToUsersTweets(tweet, tweetId),
    saveLikeCount(tweetId)
  ]).then(() => ({...tweet, tweetId}))
}

export function listenToFeed (cb, errorCB) {
  ref.child('tweets').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp)
    cb({feed, sortedIds})
  }, errorCB)
}


export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, tweetId) {
  return ref.child(`usersLikes/${uid}/${tweetId}`).set(true)
}

export function deleteFromUsersLikes (uid, tweetId) {
  return ref.child(`usersLikes/${uid}/${tweetId}`).set(null)
}

export function incrementNumberOfLikes (tweetId) {
  return ref.child(`likeCount/${tweetId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (tweetId) {
  return ref.child(`likeCount/${tweetId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchUsersTweets (uid) {
  return ref.child(`usersTweets/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchTweet (tweetId) {
  return ref.child(`tweets/${tweetId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchLikeCount (tweetId) {
  return ref.child(`likeCount/${tweetId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function postReply (tweetId, reply) {
  const replyId = ref.child(`replies/${tweetId}`).push().key;
  const replyWithId = {...reply, replyId};
  const replyPromise = ref.child(`replies/${tweetId}/${replyId}`).set(replyWithId);

  return {
    replyWithId,
    replyPromise
  }
}

export function fetchReplies (tweetId) {
  return ref.child(`replies/${tweetId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
