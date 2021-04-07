const menu = document.getElementById("menu");
const arrow = document.getElementById("arrow-button");
const dishArrow = document.getElementById("arrow-dish");
const url = "https://www.themealdb.com/api/json/v1/1/categories.php"
const promise = fetch(url);

promise
	.then((response) => response.json())
	.then((response) => getData(response))
	.catch((error) => console.log(error));

const getData = (resp) =>{
	const arrayCategories = resp.categories;
	arrayCategories.map(item => renderCategories(item.strCategoryThumb, item.strCategory));
	selectCategory();
}

function renderCategories(image, category){
	const container = document.querySelector("#categories-container");
	image = `<img class="image" src="${image}">`;
	categories = `<h2>${category}</h2>`;
	div	= `<div class="item">${image} ${categories}</div>`
	button = `<button class="button-item" name="${category}" href="https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}">${div}</button>`;
	container.innerHTML += button;
}
function selectCategory(){
	const categories = document.querySelectorAll(".button-item");
	arrow.addEventListener('click', ()=>{
		document.getElementById("categories-container").classList.remove("hidden");
		document.getElementById("options-container").classList.add("hidden");
		document.getElementById("options-container").innerHTML = "";
		menu.innerText = "Menu";
		arrow.classList.add("hidden");
	});
	categories.forEach(item => item.addEventListener('click', ()=>{
		menu.innerText = "Dishes";
		arrow.classList.remove("hidden");
		document.getElementById("categories-container").classList.add("hidden");
		document.getElementById("options-container").classList.remove("hidden");
		const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.name}`
		options(url);
		//hay que resolver que no muestra una segunda categoria si se regresa atrás
	}));
}

function options(url){
	let options = fetch(url);
	options
	.then((response) => response.json())
	.then((response) => getOptions(response))
	.catch((error) => console.log(error));
}

function getOptions(resp){
	const arrayOptions = resp.meals;
	document.getElementById("categories-container").classList.add("hidden");
	arrayOptions.map(option => renderOption(option.strMealThumb, option.strMeal, option.idMeal));
	selectOption();
}

function renderOption(image, name, id){
	const optionsContainer = document.getElementById("options-container");
	image = `<img class="option-image" src="${image}">`;
	name = `<h2>${name}</h2>`;
	div	= `<div class="item">${image} ${name}</div>`
	button = `<button class="button-option" id="${id}" name="${name}">${div}</button>`;
	optionsContainer.innerHTML += button;
}
function selectOption(){
	const options = document.querySelectorAll(".button-option");
	options.forEach(option => option.addEventListener('click', ()=>{
		const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${option.id}`
		dish(url);
	}));
}

function dish(url){
	const selectedDish = fetch(url);

selectedDish
	.then((response) => response.json())
	.then((response) => renderDish(response))
	.catch((error) => console.log(error));
}

/*function renderDish(resp){
	const dish = resp.meals[0];
	const dishContainer = document.getElementById("dish-container");
}*/

function renderDish(resp) {
	document.getElementById("options-container").classList.add("hidden");
	menu.classList.add("hidden");
	arrow.classList.add("hidden");
	dishArrow.classList.remove("hidden");
	//document.getElementById("options-container").classList.add("hidden");
	document.getElementById("dish-container").classList.remove("hidden");
	const imgContainer = document.getElementById("dish-name-img");
	const preparation = document.getElementById("preparation");
	imgContainer.innerHTML = `<img class="dish-img" src="${resp.meals[0].strMealThumb}">`
	preparation.innerHTML = `<p class="preparation-text">${resp.meals[0].strInstructions}</p>`
	document.getElementById("dish-name").innerText = resp.meals[0].strMeal;
	const ingredientsContainer = document.getElementById("ingredients");
	const measures = [];
  	const array = resp.meals;
	const ingredients = [];
  	array.forEach((item) => {
  		for (let ing in item) {
    		if (ing.includes("Ingredient")) ingredients.push(item[ing]);
    	}
	});
	array.forEach((item) => {
		for (let ing in item) {
    		if (ing.includes("Measure")) measures.push(item[ing]);
    	}
	});
  for (let i = 0 ; i < measures.length; i++) {
  	if (measures[i] === "" || measures[i] === " ") {
  		i++;
  	}else{
  		ingredientsContainer.innerHTML += `<li class="ingredient" id="ingredient">${measures[i]} ${ingredients[i]}</li>`;
  	}
  }
  close();
}

function close(){
	dishArrow.addEventListener('click', ()=>{
		dishArrow.classList.add("hidden");
		document.getElementById("options-container").classList.remove("hidden");
		document.getElementById("dish-container").classList.add("hidden");
		document.getElementById("ingredients").innerHTML = "";
		menu.classList.remove("hidden");
		arrow.classList.remove("hidden");
	});
}