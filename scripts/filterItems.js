import { recipes } from './recipes.js';
import { capitalizeFirstLetter } from './utils.js';

// Populate dropdown list with elements
function populateDropdown(ulSelector, itemsSet, type) {
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
  populateDropdown(
    '#dropdown-search-ingredients + .fa-solid + ul',
    ingredientsSet,
    'ingredient',
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
  populateDropdown(
    '#dropdown-search-appareils + .fa-solid + ul',
    appliancesSet,
    'appliance',
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
  populateDropdown(
    '#dropdown-search-utensils + .fa-solid + ul',
    ustensilsSet,
    'ustensil',
  );
}
