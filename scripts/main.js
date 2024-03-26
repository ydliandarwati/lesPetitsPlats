import { recipes } from './recipes.js';
import { recipeFactory } from './recipeFactory.js';
import { clearFields, showRecipesCount } from './utils.js';
import { showAppareilsOptions, showIngredientsOptions, showUtensilsOptions } from './filterItems.js';
import './tagManager.js'; // handle tags, add/remove, searc, update, ...


// initialize the page and load filters (based on data file)
document.addEventListener('DOMContentLoaded', () => {
	// clear search field when page loaded
	// and put filter like original version after refresh
	clearFields(['dropdown-search-ingredients','dropdown-search-appareils','dropdown-search-utensils', 'input_searchbar']);
	
	// show filter items and populates the dropdown lists for 3 filters
	showIngredientsOptions();
	showAppareilsOptions();
	showUtensilsOptions();

	// add recipe cards to recipeSection
	const recipesSection = document.querySelector('.recipeSection');
	recipes.forEach((recipe) => {
		const recipeCard = recipeFactory(recipe); // create recipe card
		recipesSection.appendChild(recipeCard); // add card to html
	});

	// show recipes number. This is the original total number and will change based on user's search/filter 
	showRecipesCount();
}
);
