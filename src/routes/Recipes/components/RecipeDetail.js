import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import assign from 'object-assign';

import { recipesActions } from 'modules/recipes';

export class RecipeDetail extends Component {

	static propTypes = {
    recipe: PropTypes.array.isRequired,
    registerListeners: PropTypes.func.isRequired
	};

  componentWillMount () {
    this.props.registerListeners(this.props.params.recipeId);
  }

	render () {

		const { recipe } = this.props;

		if (!recipe) {
			return (<h3>loading...</h3>);
		}

		return (
			<div className="recipe-detail">
				<h1>Recipe: {recipe.name}</h1>
				<Link to="/recipes">Go back</Link>
			</div>
		);
	}

}

export default connect(state => ({
  recipe: state.recipes.selected
}), assign({}, recipesActions))(RecipeDetail);