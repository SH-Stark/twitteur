/users
  uid
    name
    uid
    avatar

/notifications
  uid
    notificationId
      type
      author
      authorAvatar
      uid (of author)
      tweetId
      timestamp

/tweets
  isFetching,
  error,
  tweetId
    avatar
    tweetId
    name
    text
    timestamp
    uid (of tweet author)

/likeCount
  tweetId
    0

/usersDucks
  uid
    tweetId
      avatar
      tweetId
      name
      text
      timestamp
      uid (of tweet author)

/replies
  tweetId
    replyId
      name
      comment
      uid
      timestamp
      avatar

/usersLikes
  uid
    tweetId: true
