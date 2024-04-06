import { capitalizeFirstLetter } from './utils.js';


// the function recipe factory return a div html as a recipe card
export function recipeFactory(data) {
	const { image, time, name, description, ingredients } = data;

	// div element for recipe
	const recipeDiv = document.createElement('div');
	recipeDiv.classList.add('recipe');

	// image
	const recipeImg = document.createElement('img');
	recipeImg.alt = data.name;
	recipeImg.src = `assets/recipes/${image}`;
	recipeDiv.appendChild(recipeImg);

	// recipe duration
	const recipe_duration = document.createElement('span');
	recipe_duration.classList.add('recipe_duration');
	recipe_duration.textContent = `${time} min`;
	recipeDiv.appendChild(recipe_duration);

	// recipe name
	const recipe_name = document.createElement('h2');
	recipe_name.classList.add('recipe_name');
	recipe_name.textContent = name;
	recipeDiv.appendChild(recipe_name);

	// recipe description
	const recipe_description = document.createElement('div');
	const recipe_descriptionTitle = document.createElement('h3');
	recipe_descriptionTitle.innerText = 'RECETTE';
	recipe_description.appendChild(recipe_descriptionTitle);

	recipe_description.classList.add('recipe_description');
	recipe_description.appendChild(document.createTextNode(description));
	recipeDiv.appendChild(recipe_description);

	// recipe ingredients
	const recipeIngredients = document.createElement('div');
	const recipeIngredientsTitle = document.createElement('h3');
	recipeIngredientsTitle.innerText = 'INGRÉDIENTS';
	recipeIngredients.appendChild(recipeIngredientsTitle);

	const recipe_ingredients_items = document.createElement('div');
	recipe_ingredients_items.classList.add('recipe_ingredients_items');
	recipeIngredients.appendChild(recipe_ingredients_items);

	// loop through the ingredients array
	ingredients.forEach((ingredient) => {
		const ingredientDiv = document.createElement('div');
		ingredientDiv.classList.add('recipe_ingredients_items');

		const ingredientName = document.createElement('span');
		ingredientName.innerText = capitalizeFirstLetter(ingredient.ingredient);
		ingredientName.classList.add('recipe_ingredients_name');

		// check if there's a quantity and unit, then display them with the ingredient name
		const ingredientQuantity = document.createElement('span');
		ingredientQuantity.classList.add('recipe_ingredients_quantity');
		if (ingredient.quantity && ingredient.unit) {
			ingredientQuantity.innerText = `${ingredient.quantity} ${ingredient.unit}`;
		} else if (ingredient.quantity) {
			ingredientQuantity.innerText = `${ingredient.quantity}`;
		} else {
			ingredientQuantity.innerText = '-';
		}

		ingredientDiv.appendChild(ingredientName);
		ingredientDiv.appendChild(ingredientQuantity);
		recipeIngredients.appendChild(ingredientDiv);
	});

	recipeIngredients.classList.add('recipe_ingredients');
	recipeDiv.appendChild(recipeIngredients);

	return recipeDiv;
}
