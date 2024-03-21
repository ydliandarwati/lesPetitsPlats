// capitalize first letter
export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// clear search field
export function clearFields(idList) {
	idList.forEach((id) => {
		document.getElementById(id).value = '';
	});
}


export function updateRecipeCount() {
	// Select .recipesNumber element
	const recipesNumberElement = document.querySelector('.recipes-number');
  
	// Select all .recipe elements in .recipeSection
	const allRecipes = document.querySelectorAll('.recipeSection .recipe');
  
	// Update .recipesNumber element with the number of recipes
	if (allRecipes.length === 0) {
		recipesNumberElement.textContent = '0 recette';
	} else if (allRecipes.length === 1) {
		recipesNumberElement.textContent = '1 recette';
	} else {
		recipesNumberElement.textContent = allRecipes.length + ' recettes';
	}
}