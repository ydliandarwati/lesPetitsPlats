import { recipes } from './recipes.js';
import { capitalizeFirstLetter } from './utils.js';

// Fill the dropdown list with elements
function fillDropdown(ulSelector, itemsSet, type) {
	const ulElement = document.querySelector(ulSelector);
	ulElement.textContent = '';

	// For each item in the provided set, create a new list item (li) and append it to the ul
	itemsSet.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = item;
		li.setAttribute('data-type', type);
		ulElement.appendChild(li);
	});
}

// show ingredients options for dropdown menu
export function showIngredientsOptions() {
	// Create a new Set to store ingredients
	let ingredientsSet = new Set();
	// Loop through all recipes
	recipes.forEach((_recipe) => {
		// For each recipe, loop through its ingredients
		_recipe.ingredients.forEach((_ingredient) => {
		// Add the ingredient name to the set
			ingredientsSet.add(_ingredient.ingredient.toLowerCase());
		});
	});

	ingredientsSet = Array.from(ingredientsSet)
		.map(capitalizeFirstLetter) 		// capitalise first letter (for UI)
		.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));  // then sort;
	
	// fill dropdown list using the prepared list of options
	fillDropdown(
		'#dropdown-search-ingredients + .fa-solid + ul',
		ingredientsSet,
		'ingredient'
	);
}

// show appliances options for dropdown menu
export function showAppareilsOptions() {
	// Create a new Set to store appliances
	let appliancesSet = new Set();

	// Loop through all recipes and extracting appliance information
	recipes.forEach((_recipe) => {
		appliancesSet.add(_recipe.appliance.toLowerCase());
	});

	appliancesSet = Array.from(appliancesSet)
		.map(capitalizeFirstLetter)
		.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

	// fill dropdown list using the prepared list of options
	fillDropdown(
		'#dropdown-search-appareils + .fa-solid + ul',
		appliancesSet,
		'appliance'
	);
}

// show utensils options for dropdown menu
export function showUtensilsOptions() {
	// Create a new Set to store ustensils
	let ustensilsSet = new Set();

	// Loop through all recipes and extracting ustensils information
	recipes.forEach((_recipe) => {
		_recipe.ustensils.forEach((ustensil) => {
			ustensilsSet.add(ustensil.toLowerCase());
		});
	});

	ustensilsSet = Array.from(ustensilsSet)
		.map(capitalizeFirstLetter)
		.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

	// fill dropdown list using the prepared list of options
	fillDropdown(
		'#dropdown-search-utensils + .fa-solid + ul',
		ustensilsSet,
		'ustensil'
	);
}


// update dropdown lists based on the recipes that matched the search criteria
export function updateFilters(matchedRecipes) {
	// sets to store unique values of ingredient, utensil, and appliance
	const ingredientsSet = new Set();
	const ustensilesSet = new Set();
	const appareilsSet = new Set();
  
	// iterate over all matched recipes --> add ingredinets + utensils + appliance to sets
	matchedRecipes.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			ingredientsSet.add(ingredient.ingredient.toLowerCase());
		});
		recipe.ustensils.forEach((ustensiles) => {
			ustensilesSet.add(ustensiles.toLowerCase());
		});
		appareilsSet.add(recipe.appliance.toLowerCase());
	});
  
	// now, we pass these sets to another function to update the filter lists, to show only these sets
	updateFiltersList(document.getElementById('list-ingredients'), ingredientsSet, 'ingredient');
	updateFiltersList(document.getElementById('list-utensils'), ustensilesSet, 'ustensil');
	updateFiltersList(document.getElementById('list-appareils'), appareilsSet, 'appliance');
}
	
// Update the dropdown list with the elements of the matched recipes
export function updateFiltersList(listElement, itemsSet, itemType) {
	listElement.textContent = ''; // empty the filter
  
	// then fill it (similar to the initial version in fillDropdown)
	// Convert itemsSet to an array, sort it, and capitalize the first letter of each item
	const sortedItems = Array.from(itemsSet)
		.map(capitalizeFirstLetter)
		.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
  
	// create and append list items (li elements) for each item in the sorted items list
	sortedItems.forEach((item) => {
		const li_element = document.createElement('li');
		li_element.textContent = item;
		li_element.setAttribute('data-type', itemType);
		listElement.appendChild(li_element);
	});
}
