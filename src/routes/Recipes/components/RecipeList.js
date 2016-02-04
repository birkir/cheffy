import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import assign from 'object-assign';

import { recipesActions } from 'modules/recipes';

export class RecipeList extends Component {

	static propTypes = {
    recipes: PropTypes.array.isRequired,
    registerListeners: PropTypes.func.isRequired
	};

  componentWillMount () {
    this.props.registerListeners();
  }

	render () {

    const { recipes } = this.props;

		return (
			<div className="recipe-list">
				<h1>List of recipes</h1>
				<ul>
				{recipes.map(recipe => (
					<li key={recipe.key}>
						<Link to={`/recipe/${recipe.key}`}>{recipe.name}</Link>
					</li>
				))}
				</ul>
			</div>
		);
	}
}

export default connect(state => ({
  recipes: state.recipes.list
}), assign({}, recipesActions))(RecipeList);