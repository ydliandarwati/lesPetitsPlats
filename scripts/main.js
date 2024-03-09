import { recipes } from './recipes.js';
import { recipeFactory } from './recipeFactory.js';
import { showAppareilsOptions, showIngredientsOptions, showUtensilsOptions } from './filterItems.js';

// Initializes the page with default settings and loads content.
document.addEventListener('DOMContentLoaded', () => {
  launchPage();
});

// launch page with filter and contents
function launchPage() {
	showFilterOptions();

	// add recipes cards
	const recipesSection = document.querySelector('.recipeSection');
	recipes.forEach((recipe) => {
	const recipeCard = recipeFactory(recipe);
	recipesSection.appendChild(recipeCard);
	});

}

// show filter items and populates the dropdown lists.
function showFilterOptions() {
  showIngredientsOptions();
  showAppareilsOptions();
  showUtensilsOptions();
}

