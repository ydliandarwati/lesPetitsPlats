import { applyFilters } from './searchMain.js';
import { recipes } from './recipes.js';

// selected tag is a global list containing all tags selected by the user
const addedTags = new Set(); // a simple list (set) without type (for not adding duplicate tags)

// all recipes matched with selected tags
export let filteredRecipesByTags = [];


document.addEventListener('DOMContentLoaded', () => {
	// add listener for each ul element (filter option)
	document.querySelectorAll('.dropdown-content ul').forEach((li) => {
		li.addEventListener('click', (event) => {
			const li = event.target; // find the clicked tag to add
			const type = li.dataset.type;
			// add tag if not selected before
			if (li.tagName === 'LI' && !addedTags.has(li.textContent)) {
				addTag(li.textContent, type);
			}
		});
	});

	// live search functionality for each dropdown filter menu	
	setupDropdownFilter('dropdown-search-ingredients','list-ingredients');
	setupDropdownFilter('dropdown-search-appareils', 'list-appareils');
	setupDropdownFilter('dropdown-search-utensils', 'list-utensils');
});

// add a tag to the list of selected tags
function addTag(content, type) {
	const tagsContainer = document.querySelector('.addedTags');
	
	// create html for the new tag, then add it to html
	const newTag = document.createElement('div');
	newTag.className = 'tag';
	newTag.textContent = content;
	newTag.dataset.type = type;   // to identify the tag type
	tagsContainer.appendChild(newTag);

	addedTags.add(content); // add tag to the list (to check later when we add other tags)
	searchByTags(); // filter recipes based on selected tags

	// as soon as we create new tag we add listener for 'click' event --> remove tag when clicked 
	newTag.addEventListener('click', () => {
		removeTag(newTag, content);
	});
}

// remove a tag from the list of selected tags
function removeTag(tagElement, content) {
	addedTags.delete(content); // remove tag from the list
	tagElement.remove(); // remove element from html
	searchByTags(); // run the search with the updated list of tags
}


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

 
// filter recipes based on selected tags
export function searchByTags() {
	// find all tags
	let selectedTags = document.querySelectorAll('.tag');
	let matchedRecipes = [];

  
	// Itereate over each recipe, find those including all tags, and put them inside matchedRecipes list
	recipes.forEach((recipe) => {
		let allTagsFound = true;
  
		// Check each selected tag to see if it is found in the current recipe
		selectedTags.forEach((selectedTag) => {
			let tagType = selectedTag.dataset.type;
			let tagValue = selectedTag.textContent.trim().toLowerCase();
  
			switch (tagType) {
			case 'ingredient': {
				let ingredientNames = recipe.ingredients.map((ing) =>
					ing.ingredient.trim().toLowerCase(),
				);
				if (!ingredientNames.includes(tagValue)) allTagsFound = false;
				break;
			}
			case 'ustensil': {
				let isUstensilFound = recipe.ustensils.some(
					(ustensil) => ustensil.trim().toLowerCase() === tagValue,
				);
				if (!isUstensilFound) allTagsFound = false;
				break;
			}
			case 'appliance': {
				if (recipe.appliance.trim().toLowerCase() !== tagValue) {
					allTagsFound = false;
				}
				break;
			}
			}
		});
  
		// If all tags are found, add the recipe to the list of recipes to display
		if (allTagsFound) {
			matchedRecipes.push(recipe);
		}
	});
   
	// update global list of matched recipes based on tags
	filteredRecipesByTags = matchedRecipes;
  
	// apply the filters --> list of rcipes will be updated in html
	applyFilters();
  
}
  
