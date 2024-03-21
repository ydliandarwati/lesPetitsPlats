import { recipes } from './recipes.js';
import { recipeFactory } from './recipeFactory.js';
import { clearFields } from './utils.js';
import { showAppareilsOptions, showIngredientsOptions, showUtensilsOptions } from './filterItems.js';
import { addTag } from './tagManager.js';


// Initializes the page with default settings and loads content.
document.addEventListener('DOMContentLoaded', () => {
	// clear search field when page loaded
	document.getElementById('input_searchbar').value = '';
	//to put filter like original version after refresh
	clearFields(['dropdown-search-ingredients','dropdown-search-appareils','dropdown-search-utensils']);
	
	// load options of 3 filters
	loadFilterOptions();

	// add recipe cards to recipeSection
	const recipesSection = document.querySelector('.recipeSection');
	recipes.forEach((recipe) => {
	//create card
		const recipeCard = recipeFactory(recipe);
		//add card to html
		recipesSection.appendChild(recipeCard);
	});
}
);


// show filter items and populates the dropdown lists.
function loadFilterOptions() {
	showIngredientsOptions();
	showAppareilsOptions();
	showUtensilsOptions();
}

