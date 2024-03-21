import { recipes } from './recipes.js';
import { recipeFactory } from './recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './filterItems.js';
import { filteredRecipesByTags, searchByTags } from './tagManager.js';

export let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
	// as soon as page is loaded ...
	const searchInput = document.querySelector('.header-input_searchbar'); // fetch search input text
	const tagContainer = document.querySelector('.addedTags'); // fetch list of all selected tags
  
	// listen for chages in search input --> apply filters then --> shown recipes get updated
	searchInput.addEventListener('input', () => {
		currentSearchQuery = searchInput.value.trim().toLowerCase();
		applyFilters();
	});
	
	// Add event listener to the tag container to listen for changes
	// then update filteredRecipesByTags
	tagContainer.addEventListener('change', () => {
		// Update the filtered recipes by tags
		let filteredRecipes = searchByTags();
		if (filteredRecipes) {
			filteredRecipesByTags = filteredRecipes;
		}

		// Check if the search query is valid
		if (currentSearchQuery && currentSearchQuery.length >= 3) {
		// Apply the search query to the filtered recipes
			filteredRecipes = searchRecipes(currentSearchQuery, filteredRecipes);
		}

		// Update the recipe section with the filtered recipes
		updateRecipResults(filteredRecipes);
	});
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query, recipesToFilter = recipes) {
	const matchedRecipes = [];
	const searchTerms = query.split(' ');
	// For each recipe, check if all the search terms are found in the recipe name, description, or ingredients
	for (let i = 0; i < recipesToFilter.length; i++) {
		const { name, ingredients, description } = recipesToFilter[i];

		let searchableText = name.toLowerCase() + ' ' + description.toLowerCase();
		// Add all the ingredients to the searchable text
		for (let j = 0; j < ingredients.length; j++) {
			searchableText += ' ' + ingredients[j].ingredient.toLowerCase();
		}

		let allTermsFound = true;
		// Check if all the search terms are found in the searchable text
		for (let j = 0; j < searchTerms.length; j++) {
			const term = searchTerms[j].toLowerCase();

			let termFound = false;
			// Check if the search term is found in the searchable text
			for (let k = 0; k <= searchableText.length - term.length; k++) {
				// If the search term is found, break the loop
				if (searchableText.substring(k, k + term.length) === term) {
					termFound = true;
					break;
				}
			}
			// If the search term is not found, break the loop
			if (!termFound) {
				allTermsFound = false;
				break;
			}
		}
		// If all the search terms are found, add the recipe to the matched recipes
		if (allTermsFound) {
			matchedRecipes.push(recipesToFilter[i]);
		}
	}
	return matchedRecipes;
}

// Update the recipe section with the matched recipes
export function updateRecipResults(matchedRecipes) {
	if (!matchedRecipes) {
		console.error('matchedRecipes is undefined');
		return; // Exit the function if matchedRecipes is undefined
	}
	const recipeSection = document.querySelector('.recipeSection');
	recipeSection.textContent = '';
	// If no recipe is found, display an error message
	if (matchedRecipes.length === 0) {
		const errorMessage = document.createElement('p');
		errorMessage.classList.add('errorMessage');
		errorMessage.textContent = `Aucune recette ne contient ‘${document
			.querySelector('.header-input_searchbar')
			.value.trim()}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
		recipeSection.appendChild(errorMessage);
		// Else, display the matched recipes
	} else {
		matchedRecipes.forEach((recipe) => {
			const recipeCard = recipeFactory(recipe);
			recipeSection.appendChild(recipeCard);
		});
	}

	updateRecipeCount(matchedRecipes);
	updateListOptions(matchedRecipes);
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
	if (currentSearchQuery && currentSearchQuery.length >= 3) {
		currentRecipes = searchRecipes(currentSearchQuery, currentRecipes);
	}

	// Now, having the filtered list of recipes, we update the recipe section with the filtered recipes
	updateRecipResults(currentRecipes);
}
