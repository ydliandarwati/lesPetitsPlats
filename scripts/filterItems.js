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

	// Convert the set to an array
	ingredientsSet = new Set(
		[...ingredientsSet]
		// transform each element,
			.map(capitalizeFirstLetter)
		// then sort it
			.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
	);
	// Calls the function to fill the ingredients dropdown with items from the set
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

	// Convert the set to an array
	appliancesSet = new Set(
		[...appliancesSet]
		// transform each element,
			.map(capitalizeFirstLetter)
		// then sort it
			.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
	);

	// Calls the function to fill the appliances dropdown with items from the set
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

	// Convert the set to an array
	ustensilsSet = new Set(
		[...ustensilsSet]
		// transform each element,
			.map(capitalizeFirstLetter)
		// then sort it
			.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
	);

	// Calls the function to fill the ustensils dropdown with items from the set
	fillDropdown(
		'#dropdown-search-utensils + .fa-solid + ul',
		ustensilsSet,
		'ustensil'
	);
}


// update dropdown lists based on the recipes that matched the search criteria
export function updateListOptions(matchedRecipes) {
	// Create sets to store unique ingredient, utensil, and appliance values.
	const ingredientsSet = new Set();
	const ustensilesSet = new Set();
	const appareilsSet = new Set();
  
	// Iterate over each recipe that matched the search.
	matchedRecipes.forEach((recipe) => {
		// Add each ingredient from the recipe to the ingredients set.
		recipe.ingredients.forEach((ingredient) => {
			ingredientsSet.add(ingredient.ingredient.toLowerCase());
		});
		// Add each utensil from the recipe to the utensils set
		recipe.ustensils.forEach((ustensiles) => {
			ustensilesSet.add(ustensiles.toLowerCase());
		});
		// Add the appliance from the recipe to the appliances set
		appareilsSet.add(recipe.appliance.toLowerCase());
	});
  
	// Call a function to update the UI list element for each category
	updateListElement(
		document.getElementById('list-ingredients'),
		ingredientsSet,
		'ingredient',
	);
	updateListElement(
		document.getElementById('list-utensils'),
		ustensilesSet,
		'ustensil',
	);
	updateListElement(
		document.getElementById('list-appareils'),
		appareilsSet,
		'appliance',
	);
}
	
// Update the dropdown list with the elements of the matched recipes
export function updateListElement(listElement, itemsSet, itemType) {
	if (!listElement) {
		return;
	}
	listElement.textContent = '';
  
	// Convert itemsSet to an array, sort it, and capitalize the first letter of each item
	const sortedItems = Array.from(itemsSet)
		.map(capitalizeFirstLetter)
		.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
  
	// Create and append list items (li elements) for each item in the sorted items list
	sortedItems.forEach((item) => {
		const liElement = document.createElement('li');
		liElement.textContent = item;
	
		// Add data-type attribute
		liElement.setAttribute('data-type', itemType);
	
		// Add the created list item to the dropdown list
		listElement.appendChild(liElement);
	});
}
