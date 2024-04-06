import { recipes } from './recipes.js';
import { recipeFactory } from './recipeFactory.js';
import { showRecipesCount } from './utils.js';
import { updateFilters } from './filterItems.js';
import { filteredRecipesByTags } from './tagManager.js';

let search_keywords = ''; // to make it global 

document.addEventListener('DOMContentLoaded', () => {
	// as soon as page is loaded ...
	const searchInput = document.querySelector('.header-input_searchbar'); // fetch search input text
  
	// listen for changes in search input --> apply filters then --> shown recipes get updated
	searchInput.addEventListener('input', () => {
		search_keywords = searchInput.value.trim().toLowerCase();
		applyFilters();
	});
});

// advanced version using filter, map, every, includes functions
// search recipes by name, ingredients, or description
export function searchRecipes(query, inputRecipes = recipes) {
	// split search query to get all keywords
	const keywords = query.split(' ');
	// filter the recipes: if return value is true (keywords found), the recipe is kept, otherwise removed from returning list
	return inputRecipes.filter(({ name, ingredients, description }) => {
		//make the reference text to search from, using name, description and ingredients
		const reference_text =
		[name, description].map((text) => text.toLowerCase()).join(' ') +
		' ' +
		ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()).join(' ');
		// return true if all keywords are found in the reference text
		return keywords.every((keyword) =>
			reference_text.includes(keyword.toLowerCase()),
		);
	});
}
  
// update the recipe section with the matched recipes
export function updateRecipResults(matchedRecipes) {
	const recipeSection = document.querySelector('.recipeSection');
	recipeSection.textContent = '';
	// display an error message if no recipe is found
	if (matchedRecipes.length === 0) {
		const errorMessage = document.createElement('p');
		errorMessage.classList.add('errorMessage');
		errorMessage.textContent = `Aucune recette ne contient ‘${document
			.querySelector('.header-input_searchbar')
			.value.trim()}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
		recipeSection.appendChild(errorMessage);
	} else {
		matchedRecipes.forEach((recipe) => {
			const recipeCard = recipeFactory(recipe);
			recipeSection.appendChild(recipeCard);
		});
	}

	showRecipesCount(matchedRecipes); // show number of found recipes
	updateFilters(matchedRecipes); // update filters based on matched recipes
}

// Apply the filters to the recipes
export function applyFilters() {
	// current recipes are all contents that should be shown, based on user input (tag, search query) Originally, it is equal to recipes from js file, but then get modified wrt user input
	let currentRecipes = recipes; 

	// First, we apply tag filtering
	// If no tag is chosen, we skip this step, because filteredRecipesByTags will be empty in that case
	if (filteredRecipesByTags.length > 0) {
		currentRecipes = filteredRecipesByTags;
	}

	// Then, we apply search query filtering as soon as search query is not empty with more than 2 characters
	// the main search function is searchRecipes
	if (search_keywords && search_keywords.length >= 3) {
		currentRecipes = searchRecipes(search_keywords, currentRecipes);
	}

	// Now, having the filtered list of recipes, we update the recipe section with the filtered recipes
	updateRecipResults(currentRecipes);
}
