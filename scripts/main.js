import {  showAppareilsOptions, showIngredientsOptions, showUtensilsOptions } from './filterItems.js';

// Initializes the page with default settings and loads content.
document.addEventListener('DOMContentLoaded', () => {
  launchPage();
});

// launch page with filter and contents
function launchPage() {
  showFilterOptions();
}

// show filter items and populates the dropdown lists.
function showFilterOptions() {
  showIngredientsOptions();
  showAppareilsOptions();
  showUtensilsOptions();
}

