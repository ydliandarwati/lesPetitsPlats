import { recipes } from './recipes.js';
import { recipeFactory } from './recipeFactory.js';
import { showRecipesCount } from './utils.js';
import { updateFilters } from './filterItems.js';
import { filteredRecipesByTags, searchByTags } from './tagManager.js';

let search_keywords = '';

document.addEventListener('DOMContentLoaded', () => {
	// as soon as page is loaded ...
	const searchInput = document.querySelector('.header-input_searchbar'); // fetch search input text
	const tagContainer = document.querySelector('.addedTags'); // fetch list of all selected tags
  
	// listen for chages in search input --> apply filters then --> shown recipes get updated
	searchInput.addEventListener('input', () => {
		search_keywords = searchInput.value.trim().toLowerCase();
		applyFilters();
	});
	
	// add event listener to the tag container to listen for changes
	// then update filteredRecipesByTags
	tagContainer.addEventListener('change', () => {
		// update the filtered recipes by tags
		let filteredRecipes = searchByTags();
		if (filteredRecipes) {
			// eslint-disable-next-line no-import-assign
			filteredRecipesByTags = filteredRecipes;
		}

		// check if the search query is valid
		if (search_keywords && search_keywords.length >= 3) {
		// apply the search query to the filtered recipes
			filteredRecipes = searchRecipes(search_keywords, filteredRecipes);
		}

		// ppdate the recipe section with the filtered recipes
		updateRecipResults(filteredRecipes);
	});
});

// simple version using loops
// search recipes by name, ingredients, or description
export function searchRecipes(query, inputRecipes) {
	const matchedRecipes = [];
	const keywords = query.split(' '); // split the query to get all keywords
	// For each recipe, check if all the search terms are found in the recipe name, description, or ingredients
	for (let i = 0; i < inputRecipes.length; i++) {
		const { name, ingredients, description } = inputRecipes[i];

		// create a long string to search into from name + description + ingredients
		let reference_text = name.toLowerCase() + ' ' + description.toLowerCase();
		for (let j = 0; j < ingredients.length; j++) {
			reference_text += ' ' + ingredients[j].ingredient.toLowerCase();
		}

		let find_flag= true;
		// loop over all keywords, to find them in recipe (reference text)
		for (let j = 0; j < keywords.length; j++) {
			const keyword = keywords[j].toLowerCase();

			let termFound = false;
			// scan reference text from left to right, to find keywords
			for (let k = 0; k <= reference_text.length - keyword.length; k++) {
				// terminate search if keyword is found
				if (reference_text.substring(k, k + keyword.length) === keyword) {
					termFound = true;
					break;
				}
			}
			// if a keyword not found, no need to continue, as that recipe shouldn't be displayed
			if (!termFound) {
				find_flag= false;
				break;
			}
		}
		// if all keywords found, fing_flag is true, then add the recipe to the matched recipes
		if (find_flag) {
			matchedRecipes.push(inputRecipes[i]);
		}
	}
	return matchedRecipes; // return recipes which includes the keywords
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
	// current recipes are all contents that should be shown, based on user input (tag, search query)
	// Originally, it is equal to recipes from js file, but then get modified wrt user input
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
