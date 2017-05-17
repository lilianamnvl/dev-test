var itemsArray = [];
var deleteButton = document.getElementById("deleteItem");
var elementsSection = document.getElementById('items');
var currentValue = null;
var inputState = 1; // if 1: change item, if 2: image adding


function createItem(value){
	
	var len = itemsArray.length;
	var ulItem = document.createElement("li");
	var span = document.createElement("span");
	var deleteIcon = document.createElement("i");
	var editIcon = document.createElement("i");
	var editInput = document.createElement("input");

	var saveIcon = document.createElement("i");
	var undoIcon = document.createElement("i");
	var imageIcon = document.createElement("i");
	var imageURL = "";


	
	editInput.id = "editInput";
	editInput.setAttribute("type", "text");
	editInput.setAttribute("placeholder", "Change the item");

	span.className = "textItems";

	deleteIcon.className = "icons initialIcons fa fa-times";
	editIcon.className = "icons initialIcons fa fa-pencil-square-o";

	saveIcon.className = "icons editIcons fa fa-floppy-o";
	undoIcon.className = "icons editIcons fa fa-undo";
	imageIcon.className = "icons editIcons fa fa-picture-o";

	
	span.innerText = value;
	 
	
	span.id = "i" + len;

	ulItem.appendChild(editInput);
	ulItem.appendChild(span);
	ulItem.appendChild(editIcon);
	ulItem.appendChild(deleteIcon);

	ulItem.appendChild(saveIcon);
	ulItem.appendChild(undoIcon);
	ulItem.appendChild(imageIcon);

	deleteIcon.addEventListener("click",function(){remove_item(ulItem)});
	editIcon.addEventListener("click",function(){editable_state(ulItem)});

	saveIcon.addEventListener("click",function(){save_changes(ulItem)});
	undoIcon.addEventListener("click",function(){discard_changes(ulItem)});
	imageIcon.addEventListener("click",function(){add_image(ulItem)});
	
	itemsArray.push(ulItem);

	for(var i=0; i < ulItem.getElementsByClassName('editIcons').length; i++){
			ulItem.getElementsByClassName('editIcons')[i].style.display = "none";
	}

	return ulItem;
}


function add_items() {

	var inputField = document.getElementById('inputItem');
	var value = inputField.value;	
	
	if (value == ""){
		console.log("The value cannot be null!");
	}else{


	elementsSection.appendChild(createItem(value));
	

			inputField.value = "";
			}
}

function editable_state(elem){

	currentValue = elem.innerText;
	console.log("Editing... " + currentValue);
	var input = elem.getElementsByTagName('input')[0];
	input.style.display = "inline"; // crear clase 
	input.value = "";
	

	var spanValue = elem.getElementsByTagName('span')[0];
	spanValue.style.display = "none";


	for(var i=0; i < elem.getElementsByClassName('initialIcons').length; i++){
			elem.getElementsByClassName('initialIcons')[i].style.display = "none";
	}

	for(var i=0; i < elem.getElementsByClassName('editIcons').length; i++){
			elem.getElementsByClassName('editIcons')[i].style.display = "inline";
	}
	
}


function remove_item(elem){
	console.log("Removing... " + elem.innerText);
	elem.remove();
	itemsArray.splice(elem.getAttribute('id'), 1);
}


function add_image(elem){
	inputState = 2;
	console.log("Image state");

		//hiddes edit icons
		for(var i=0; i < elem.getElementsByClassName('editIcons').length; i++){
			elem.getElementsByClassName('editIcons')[i].style.display = "none";
		}

		elem.getElementsByTagName('input')[0].style.display = "none";


	var imageSection = document.getElementsByClassName('imageContainer')[0];
	imageSection.style.display = "block";
	imageSection.addEventListener("click", function(){addURL_state(imageSection)});

}

function addURL_state(elem){
	console.log("adding url..");
	elem.getElementsByTagName('button')[0].style.display = "none";
	
	var inputURL = elem.getElementsByTagName('input')[0];
	var saveIcon = elem.getElementsByTagName('i')[0];
	inputURL.style.display = "block";
	saveIcon.style.display = "inline";

	saveIcon.addEventListener("click", function(){add_URL()});



	var URL = inputURL.innerText;
	URL = 'https://s-media-cache-ak0.pinimg.com/originals/96/78/22/967822c0f1fb9171b424bcf1b765edb5.jpg';
	elem.style.backgroundImage = 'url("' + URL + '")'; 

}

function save_changes(elem){

	
	var input = elem.getElementsByTagName('input')[0].value;
	var span = elem.getElementsByTagName('span')[0];
	span.innerText = input;

	

		for(var i=0; i < elem.getElementsByClassName('initialIcons').length; i++){
			elem.getElementsByClassName('initialIcons')[i].style.display = "inline";
	}

		for(var i=0; i < elem.getElementsByClassName('editIcons').length; i++){
			elem.getElementsByClassName('editIcons')[i].style.display = "none";
	}

	elem.getElementsByTagName('input')[0].style.display = "none";
	span.style.display = "inline";



}


function discard_changes(elem){
	var span = elem.getElementsByTagName('span')[0];
	span.innerText = currentValue;

		for(var i=0; i < elem.getElementsByClassName('initialIcons').length; i++){
			elem.getElementsByClassName('initialIcons')[i].style.display = "inline";
	}

		for(var i=0; i < elem.getElementsByClassName('editIcons').length; i++){
			elem.getElementsByClassName('editIcons')[i].style.display = "none";
	}

	elem.getElementsByTagName('input')[0].style.display = "none";
	span.style.display = "inline";
}



