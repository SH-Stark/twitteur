import React, { PropTypes } from 'react';
import { Authenticate } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'redux/modules/users';

class AuthenticateContainer extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  handleAuth = (e) => {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('feed'))
  }
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  }
}

export default connect(
  ({ users }) => ({ isFetching: users.isFetching, error: users.error }),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer);
