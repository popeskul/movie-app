import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    with_genres: PropTypes.array,
    onChangeFilters: PropTypes.func.isRequired,
  };

  onClick = page => () => {
    this.props.onChangeFilters({
      target: { name: 'page', value: page },
    });
  };

  render() {
    const { page, total_pages } = this.props;

    return (
      <div className="mb-3 mt-3">
        <div className="btn-group d-flex mb-3">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={this.onClick(page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={this.onClick(page + 1)}
          >
            Вперед
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <strong>{page}</strong> <span className="ml-2 mr-2">из</span>
          <strong>{total_pages}</strong>
        </div>
      </div>
    );
  }
}
