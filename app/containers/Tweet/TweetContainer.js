import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tweet } from 'components';
import * as usersLikesActions from 'redux/modules/usersLikes';

const { func, object, bool, number } = PropTypes;

const TweetContainer = React.createClass({
  propTypes: {
    tweet: object.isRequired,
    handleClick: func,
    hideLikeCount: bool.isRequired,
    hideReplyBtn: bool.isRequired,
    isLiked: bool.isRequired,
    numberOfLikes: number,
    addAndHandleLike: func.isRequired,
    handleDeleteLike: func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getDefaultProps () {
    return {
      hideReplyBtn: false,
      hideLikeCount: true,
    }
  },
  goToProfile (e) {
    e.stopPropagation()
    this.context.router.push('/' + this.props.tweet.uid)
  },
  handleClick (e) {
    e.preventDefault()
    this.context.router.push('/tweetDetail/' + this.props.tweet.tweetId)
  },
  render () {
    return (
      <Tweet
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props} />
    )
  },
})

function mapStateToProps ({tweets, likeCount, usersLikes}, props) {
  return {
    tweet: tweets[props.tweetId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.tweetId] === true,
    numberOfLikes: likeCount[props.tweetId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetContainer)
