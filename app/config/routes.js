import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer, UserContainer, TweetDetailsContainer } from 'containers';

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='feed' component={FeedContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer}/>
        <Route path='/:uid' component={UserContainer} onEnter={checkAuth} />
        <Route path='tweetDetail/:tweetId' component={TweetDetailsContainer} onEnter={checkAuth} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth}/>
      </Router>
    </Router>
  )
}
