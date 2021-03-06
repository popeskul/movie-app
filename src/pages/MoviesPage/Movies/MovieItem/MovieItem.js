import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IMAGE_URL } from '../../../../api/api';
import ToggleFavorite from '../../../../components/UIComponents/ToggleFavorite';
import ToggleWatchlist from '../../../../components/UIComponents/ToggleWatchlist';

export default class MovieItem extends Component {
  static propTypes = {
    item: PropTypes.object,
  };

  render() {
    const { item } = this.props;

    return (
      <div className="card card" style={{ width: '100%' }}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="card-img-top card-img--height"
            src={`${IMAGE_URL}/w500${item.backdrop_path || item.poster_path}`}
            alt=""
          />
        </Link>
        <div className="card-body">
          <Link to={`/movie/${item.id}`}>
            <h6 className="card-title">{item.title}</h6>
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div className="card-footer__link">
            <ToggleFavorite id={item.id} />
          </div>
          <div className="card-footer__link">
            <ToggleWatchlist id={item.id} />
          </div>
        </div>
      </div>
    );
  }
}
