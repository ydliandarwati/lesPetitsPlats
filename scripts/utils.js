// capitalize first letter
export function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}

// clear fields based on its id as input (list)
export function clearFields(idList) {
	idList.forEach((id) => {
		document.getElementById(id).value = '';
	});
}

// show number of matched recipes inside html
export function showRecipesCount() {
	// counter element to show number of recipes
	const counter = document.querySelector('.recipes-number');
  
	// we then find all .recipe elements in .recipeSection, which gives all matched recipes
	const foundRecipes = document.querySelectorAll('.recipeSection .recipe');
  
	// compute the number and show an appropriate message
	if (foundRecipes.length === 0) {
		counter.textContent = '0 recette';
	} else if (foundRecipes.length === 1) {
		counter.textContent = '1 recette';
	} else {
		counter.textContent = foundRecipes.length + ' recettes';
	}
}