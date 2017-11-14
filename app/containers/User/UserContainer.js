import React, { PropTypes, Component } from 'react';
import { User } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActionCreators from 'redux/modules/users';
import * as usersTweetsActionCreators from 'redux/modules/usersTweets';
import { staleUser, staleTweets } from 'helpers/utils';

class UserContainer extends Component {
  static propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    tweetIds: PropTypes.array.isRequired,
    fetchAndHandleUsersTweets: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedTweets: PropTypes.number.isRequired,
  }
  componentDidMount () {
    const uid = this.props.routeParams.uid;
    if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid);
    }

    if (this.props.noUser === true || staleTweets(this.props.lastUpdatedTweets))
    this.props.fetchAndHandleUsersTweets(uid);
  }
  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        tweetIds={this.props.tweetIds}
      />
    )
  }
}

function mapStateToProps ({ users, usersTweets }, props) {
  const specificUsersTweets = usersTweets[props.routeParams.uid];
  const user = users[props.routeParams.uid];
  const noUser = typeof user === 'undefined';
  return {
    noUser,
    name: noUser ? '' : user.info.name,
    isFetching: users.isFetching || usersTweets.isFetching,
    error: users.error || usersTweets.error,
    tweetIds: specificUsersTweets ? specificUsersTweets.tweetIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedTweets: specificUsersTweets ? specificUsersTweets.lastUpdated : 0,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersTweetsActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
