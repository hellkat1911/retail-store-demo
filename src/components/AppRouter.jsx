import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopNav from './TopNav';
import Home from '../views/Home';
import ProductPage from '../views/ProductPage';
import SearchResults from '../views/SearchResults';

const AppRouter = props => {
  return (
    <Router>
      <TopNav />
      <div id="app-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/search" component={SearchResults} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
