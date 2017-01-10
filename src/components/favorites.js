import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import { toggleFavorite, getFavorites, saveFavorites } from '../actions/index';

class Favorites extends Component {
  componentWillMount() {
    this.props.getFavorites(localStorage.email);
  }

  renderList() {
    return this.props.favorites.map((favorite) => {
      if (!favorite.favorite) {
        return (
          <li
            onClick={() => {
              this.props.toggleFavorite(favorite)
              this.props.saveFavorites(localStorage.email, this.props.favorites)
              }
            }
            key={favorite.name}
            className="favorite-item">
            {favorite.name}
          </li>
        )
      } else {
        return (
          <li
            onClick={() => {
              this.props.toggleFavorite(favorite)
              this.props.saveFavorites(localStorage.email, this.props.favorites)
              }
            }
            key={favorite.name}
            className="favorite-item">
            {favorite.name}
            <span className="float-right">
              <Glyphicon glyph="ok" />
            </span>
          </li>
        )
      }
    })
  }

  render() {
    return (
      <div>
        <ul className="favorites-list">
          {this.renderList()}
        </ul>
        <div>
          <button
            onClick={() => browserHistory.push('/dashboard')}
            className="float-right btn btn-secondary">
            Save
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources,
    favorites: state.favorites
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleFavorite, getFavorites, saveFavorites }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
