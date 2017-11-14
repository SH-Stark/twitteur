import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Feed } from 'components'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends React.Component {
  static propTypes = {
    tweetIds: PropTypes.array.isRequired,
    newTweetsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewTweetsAvailable: PropTypes.func.isRequired,
  }
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed
        tweetIds={this.props.tweetIds}
        newTweetsAvailable={this.props.newTweetsAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewTweetsAvailable={this.props.resetNewTweetsAvailable} />
    )
  }
}

function mapStateToProps ({ feed }) {
  const { newTweetsAvailable, error, isFetching, tweetIds } = feed
  return {
    newTweetsAvailable,
    error,
    isFetching,
    tweetIds,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(feedActionCreators, dispatch)
)(FeedContainer)
