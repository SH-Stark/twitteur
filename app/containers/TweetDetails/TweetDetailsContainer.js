import React, { PropTypes } from 'react';
import { TweetDetails } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tweetActionCreators from 'redux/modules/tweets';
import * as likeCountActionCreators from 'redux/modules/likeCount';
import * as repliesActionCreators from 'redux/modules/replies';

class TweetDetailsContainer extends React.Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    tweetId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    tweetAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleTweet: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.initLikeFetch(this.props.tweetId)
    if (this.props.tweetAlreadyFetched === false) {
      this.props.fetchAndHandleTweet(this.props.tweetId)
    } else {
      this.props.removeFetching()
    }
  }
  render () {
    return (
      <TweetDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        tweetId={this.props.tweetId}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    )
  }
}

function mapStateToProps ({ tweets, likeCount, users }, props) {
  return {
    isFetching: tweets.isFetching || likeCount.isFetching,
    error: tweets.error,
    authedUser: users[users.authedId].info,
    tweetId: props.routeParams.tweetId,
    tweetAlreadyFetched: !!tweets[props.routeParams.tweetId]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...tweetActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetDetailsContainer);
