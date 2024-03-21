import { updateListElement } from './filterItems.js';
import { applyFilters, updateRecipResults } from './searchMain.js';
import { recipes } from './recipes.js';

const addedTags = new Set();
let selectedTags = { ingredient: [], appliance: [], ustensil: [] };
document.addEventListener('DOMContentLoaded', () => {

	// add listener for each ul element (filter option)
	document.querySelectorAll('.dropdown-content ul').forEach((li) => {
		li.addEventListener('click', (event) => {
			const li = event.target;
			const type = li.dataset.type;
			// add tag if not selected before
			if (li.tagName === 'LI' && !li.classList.contains('selected')) {
				addTag(li.textContent, type);
			}
			searchByTags();
		});
	});
});

// add a tag to the list of selected tags
export function addTag(content, type) {
	const tagsContainer = document.querySelector('.addedTags');
	
	// create html for the new tag, then add it to html
	const newTag = document.createElement('div');
	newTag.className = 'tag';
	newTag.textContent = content;
	newTag.dataset.type = type;   // to identify the tag type
	addedTags.add(content);
	tagsContainer.appendChild(newTag);


	// listener for 'click' event --> remove tag when clicked 
	newTag.addEventListener('click', () => {
		removeTag(newTag, content, type);
	});

	// Add the tag content to the appropriate array in the 'selectedTags' object
	selectedTags[type].push(content.toLowerCase());
	// Dispatch a custom event to notify that a tag has been added, passing details along
	const event = new CustomEvent('tagAdded', { detail: { content, type } });
	document.dispatchEvent(event);
}

// Remove a tag from the list of selected tags
function removeTag(tagElement, content, type) {
	tagElement.remove();
	addedTags.delete(content);
	// Find the index of the tag content in the appropriate array and remove it
	const index = selectedTags[type].indexOf(content.toLowerCase());
	if (index > -1) {
		selectedTags[type].splice(index, 1);
	}
	// Update the list element and recipe section in the UI
	updateListElement();
	updateRecipResults(recipes);
	// Re-run the search with the updated list of tags
	searchByTags();
}

document.addEventListener('DOMContentLoaded', () => {
	// Set up the filter functionality for each dropdown
	setupDropdownFilter('dropdown-search-ingredients','list-ingredients');
	setupDropdownFilter('dropdown-search-appareils', 'list-utensils');
	setupDropdownFilter('dropdown-search-utensils', 'list-appareils');
});

//  live search for dropdown lists
function setupDropdownFilter(inputId, listId) {
	const searchInput = document.getElementById(inputId);
	const itemList = document.getElementById(listId);
	// Add an 'input' event listener to the search field
	searchInput.addEventListener('input', () => {
	// Get the search query, trimmed and in lower case
		const query = searchInput.value.trim().toLowerCase();
		// For each list item in the dropdown
		Array.from(itemList.children).forEach((li) => {
		// Text content of the list item, trimmed and in lower case
			const itemText = li.textContent.trim().toLowerCase();
			const isVisible = itemText.includes(query);
			// If the item should be visible, reset the display style, else hide it.
			li.style.display = isVisible ? '' : 'none';
		});
	});
}

export let filteredRecipesByTags = [];
  
// Filter recipes based on selected tags
export function searchByTags() {
	let selectedTags = document.querySelectorAll('.tag');
	let currentRecipes = [];
  
	if (selectedTags.length === 0) {
		filteredRecipesByTags = recipes;
		applyFilters();
		return recipes;
	}
  
	// Itereate over each recipe
	recipes.forEach((recipeData) => {
		let allTagsFound = true;
  
		// Check each selected tag to see if it is found in the current recipe
		selectedTags.forEach((selectedTag) => {
			let tagType = selectedTag.dataset.type;
			let tagValue = selectedTag.textContent.trim().toLowerCase();
  
			switch (tagType) {
			case 'ingredient': {
				let ingredientNames = recipeData.ingredients.map((ing) =>
					ing.ingredient.trim().toLowerCase(),
				);
				if (!ingredientNames.includes(tagValue)) allTagsFound = false;
				break;
			}
			case 'ustensil': {
				let isUstensilFound = recipeData.ustensils.some(
					(ustensil) => ustensil.trim().toLowerCase() === tagValue,
				);
				if (!isUstensilFound) allTagsFound = false;
				break;
			}
			case 'appliance': {
				if (recipeData.appliance.trim().toLowerCase() !== tagValue) {
					allTagsFound = false;
				}
				break;
			}
			}
		});
  
		// If all tags are found, add the recipe to the list of recipes to display
		if (allTagsFound) {
			currentRecipes.push(recipeData);
		}
	});
   
	// Update the filtered recipes state
	filteredRecipesByTags = currentRecipes;
  
	// Apply the filters
	applyFilters();
  
	return currentRecipes;
}
  
