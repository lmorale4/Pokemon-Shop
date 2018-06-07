import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navbar } from './components';
import Routes from './routes';

import { fetchPokemon } from './store/pokemon';
import { fetchReviews } from './store/review'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // filteredPokemon: []
      searchedName: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchPokemon();
    this.props.fetchReviews();
  }

  handleSearchChange(event) {
    // this.setState({
    //   filteredPokemon: this.props.pokemon.filter(pokemon => pokemon.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    // })
    this.setState({
      searchedName: event.target.value,
    });
    if (this.props.location.pathname !== '/pokemon') {
      this.props.history.push('/pokemon');
    }
  }

  render() {
    return (
      <div>
        <Navbar handleSearchChange={this.handleSearchChange} />
        <Routes searchedName={this.state.searchedName} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    pokemon: state.pokemon,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchPokemon: () => dispatch(fetchPokemon()),
    fetchReviews: () => dispatch(fetchReviews())
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
);
