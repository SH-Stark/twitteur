import { bindActionCreators } from 'redux';
import { Modal } from 'components';
import { connect } from 'react-redux';
import * as modalActionCreators from 'redux/modules/modal';
import * as tweetsActionCreators from 'redux/modules/tweets';

function mapStateToProps ({ modal, users }) {
  const tweetTextLength = modal.tweetText.length;
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    tweetText: modal.tweetText,
    isOpen: modal.isOpen,
    isSubmitDisabled: tweetTextLength <= 0 || tweetTextLength > 140,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...modalActionCreators, ...tweetsActionCreators}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
