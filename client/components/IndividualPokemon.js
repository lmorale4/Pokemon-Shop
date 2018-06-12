import React from "react";
import { connect } from "react-redux";
import ReactStars from "react-stars";
import { withRouter, Link } from "react-router-dom";
import EditPokemon from "./EditPokemon";
import { removePokemon } from "../store/pokemon";

import Reviews from "./Review/Reviews";

class IndividualPokemon extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleUpdate: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    if (window.confirm("Are you sure you wish to delete this Pokemon?"))
      this.props.history.push("/pokemon");

    this.props.removePokemon(this.props.selectedPokemon.id);
  }

  handleToggle() {
    if (this.state.toggleUpdate === true) {
      this.setState({
        toggleUpdate: false
      });
    } else {
      this.setState({
        toggleUpdate: true
      });
    }
  }

  render() {
    const pokemon = this.props.selectedPokemon || {};
    const { reviews, avg } = this.props;
    const loading = <p>This page is either loading or not available...</p>;
    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col">
            <img src={pokemon.imageUrl} />
          </div>
          <div className="col">
            <h1 className="font">{pokemon.name}</h1>
            <div className="container-body">
            <ReactStars
              count={5}
              value={Number(avg)}
              size={24}
              edit={false}
              color2="#ffd700"
            />
            <p>
              Type:{" "}
              {pokemon.type &&
                pokemon.type.map(type => (
                  <span key={type} className={`badge ${type.toLowerCase()}`}>
                    {type}
                  </span>
                ))}
            </p>
            {!this.state.toggleUpdate ? (
              <div>
                <p>Level: {pokemon.level}</p>
                <p>
                  Price: {pokemon.price}{" "}
                  <img
                    className="currency img-fluid"
                    src="/PokeBallCurrency.png"
                  />
                </p>
                <p>{pokemon.description}</p>
              </div>
            ) : (
              <EditPokemon
                handleToggle={this.handleToggle}
                selectedPokemon={this.props.selectedPokemon}
                this
              />
            )}
            <div className="input-group">
              <input
                type="number"
                min="1"
                onChange={this.props.handleQuantityChange}
                className="form-control"
                placeholder="1"
              />
              <button
                type="button"
                className="btn btn-info"
                onClick={this.props.handleClick}
              >
                Add To Cart
              </button>
            </div>
            {this.props.isAdmin ? (
              <div>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.handleToggle}
                >
                  EDIT POKEMON
                </button>
              </div>
            ) : (
              ""
            )}
            {this.props.isAdmin ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={this.handleDelete}
              >
                DELETE POKEMON
              </button>
            ) : (
              ""
            )}
            </div>
          </div>
        </div>
        <div className="row">
          <Reviews selectedPokemon={pokemon} reviews={reviews} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = +ownProps.match.params.id;
  const reviews = state.reviews.filter(review => review.pokemonId === id) || [];

  const avg =
    reviews.length &&
    reviews
      .map(review => Number(review.rating))
      .reduce((accumulator, currentValue) => accumulator + currentValue) /
      reviews.length;

  return {
    selectedPokemon: state.pokemon.find(pokemon => pokemon.id === id),
    reviews,
    avg,
    isAdmin: state.user.admin
  };
};

const mapDispatchToProps = () => {
  return dispatch => ({
    removePokemon: pokemonId => dispatch(removePokemon(pokemonId))
  });
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IndividualPokemon)
);
