import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import {
  updateAuth,
  onLogOut,
  toggleModalLogin,
  updateFavoriteMovies,
  updateMoviesWatchlist,
} from '../../redux/auth/auth.actions';
import MoviesPage from '../../pages/MoviesPage';
import MoviePage from '../../pages/MoviePage';
import Header from './../Header';
import Login from '../Login';
import CallApi from './../../api/api';

export const AppContext = React.createContext();

class App extends Component {
  getFavoriteMovies = ({ user, session_id }) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
      },
    }).then(data => {
      this.props.updateFavoriteMovies(data.results);
    });
  };

  getMoviesWatchlist = ({ user, session_id }) => {
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
      },
    }).then(data => {
      this.props.updateMoviesWatchlist(data.results);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { user, session_id } = this.props;
    // const { loadingFavoriteMovies, loadingMoviesWatchlist } = this.state;

    if (!_.isEqual(prevProps.user, user)) {
      // console.log(prevState.user, user);
      // this.getFavoriteMovies({ user, session_id });
      // this.getMoviesWatchlist(user, session_id);
    }

    // delete movies on logout
    if (!session_id && prevState.session_id) {
      this.props.onLogOut();
    }

    // if (prevState.loadingFavoriteMovies !== loadingFavoriteMovies) {
    //   this.getFavoriteMovies(user, session_id);
    // }

    // if (prevState.loadingMoviesWatchlist !== loadingMoviesWatchlist) {
    //   this.getMoviesWatchlist(user, session_id);
    // }
  }

  componentDidMount() {
    const { session_id } = this.props;

    if (session_id && session_id !== 'null') {
      CallApi.get(`/account`, {
        params: {
          session_id,
        },
      }).then(user => {
        this.props.updateAuth({ user, session_id });
        this.getFavoriteMovies({ user, session_id });
        this.getMoviesWatchlist({ user, session_id });
      });
    }
  }

  render() {
    const {
      user,
      session_id,
      showLoginModal,
      updateAuth,
      onLogOut,
      toggleModalLogin,
      favoriteMovies,
      moviesWatchlist,
    } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateAuth: updateAuth,
          onLogOut: onLogOut,
          toggleModalLogin: toggleModalLogin,
          showLoginModal: showLoginModal,
          favoriteMovies: favoriteMovies,
          moviesWatchlist: moviesWatchlist,
          getFavoriteMovies: this.props.getFavoriteMovies,
          getMoviesWatchlist: this.props.getMoviesWatchlist,
        }}
      >
        <Router>
          <div className="wrapper">
            <div className="content">
              <Header />

              <Switch>
                <Route path="/movie/:id" component={MoviePage} />
                <Route exec path="/" component={MoviesPage} />
              </Switch>
            </div>
          </div>

          <Login />
        </Router>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  showLoginModal: PropTypes.bool,
  favoriteMovies: PropTypes.array,
  moviesWatchlist: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    showLoginModal: state.auth.showLoginModal,
    favoriteMovies: state.auth.favoriteMovies,
    moviesWatchlist: state.auth.moviesWatchlist,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     updateAuth: bindActionCreators(updateAuth, dispatch),
//     onLogOut: bindActionCreators(onLogOut, dispatch),
//     toggleModalLogin: bindActionCreators(toggleModalLogin, dispatch),
//   };
// };
const mapDispatchToProps = {
  updateAuth,
  onLogOut,
  toggleModalLogin,
  updateFavoriteMovies,
  updateMoviesWatchlist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
