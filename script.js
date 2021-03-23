const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
const promise = fetch(url);

promise
	.then((response) => response.json())
	.then((response) => getData(response))
	.catch((error) => console.log(error));

const getData = (resp) =>{
//	const container = document.querySelector("#container");
	const arrayCategories = resp.categories;
	console.log(arrayCategories);
	arrayCategories.map(item => renderCategories(item.strCategoryThumb, item.strCategory));
	selectCategory();
}

function renderCategories(image, category){
	const container = document.querySelector("#container");
	image = `<img class="image" src="${image}">`;
	categories = `<h2>${category}</h2>`;
	div	= `<div class="item">${image} ${categories}</div>`
	button = `<button class="button" href="https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}">${div}</button>`;
	container.innerHTML += button;
}



function selectCategory(){
	const categories = document.querySelectorAll("button");
	console.log(categories);
	categories.forEach(category => {
		category.addEventListener('click',() =>{
			console.log(category);
			//hacer modal para las optiones
			getOptions(category.attributes.href.nodeValue);
		});
	});
}

function getOptions(url){
	let options = fetch(url);
	options
		.then((response) => response.json())
		.then((response) => checkOptions(response))
		.catch((error) => console.log(error));
}

function checkOptions(resp){
	console.log(resp);
	const container = document.querySelector("#options");
	const arrayMeals = resp.meals;
	console.log(arrayMeals);
	arrayMeals.map(item => renderOptions(item.strMealThumb, item.strMeal));
}

function renderOptions(image, category){
	const container = document.querySelector("#options");
	image = `<img class="imageMeal" src="${image}">`;
	categories = `<h2>${category}</h2>`;
	div	= `<div class="item">${image} ${categories}</div>`
	button = `<button class="button" href="https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}">${div}</button>`;
	options.innerHTML += button;
}
11111111111111111111111111111111111111111111111111111111111111111111111111111111