var itemsArray = [];
var deleteButton = document.getElementById("deleteItem");
var elementsSection = document.getElementById('items');
var currentValue = null;
var inputState = 1; // if 1: change item, if 2: image adding
var defBackground = "https://s-media-cache-ak0.pinimg.com/736x/29/fa/14/29fa1441f2a0446e9aa45cee74495a83.jpg";
var imageSection = document.getElementsByClassName('imageContainer')[0];
var img = imageSection.getElementsByTagName('img')[0];
var list = document.getElementById('items');




function closeImageContainer(){
	 imageSection.style.display = "none";
	 img.src = defBackground;

}

function createItem(value) {

    var len = itemsArray.length;
    var ulItem = document.createElement("li");
    var span = document.createElement("span");
    var deleteIcon = document.createElement("i");
    var editIcon = document.createElement("i");
    var editInput = document.createElement("input");

    var saveIcon = document.createElement("i");
    var undoIcon = document.createElement("i");
    var imageIcon = document.createElement("i");
    var imageURL = null;
    var attImage = document.createElement("i");




    editInput.id = "editInput";
    editInput.setAttribute("type", "text");
    editInput.setAttribute("placeholder", "Change the item");

    span.className = "textItems";

    deleteIcon.className = "icons initialIcons fa fa-times";
    editIcon.className = "icons initialIcons fa fa-pencil-square-o";

    saveIcon.className = "icons editIcons fa fa-floppy-o";
    undoIcon.className = "icons editIcons fa fa-undo";
    imageIcon.className = "icons editIcons fa fa-picture-o";
    attImage.className = "fa fa-file-image-o icons";


    span.innerText = value;
    ulItem.id = "i" + len;



    ulItem.appendChild(editInput);
    ulItem.appendChild(span);
    ulItem.appendChild(editIcon);
    ulItem.appendChild(deleteIcon);

    ulItem.appendChild(saveIcon);
    ulItem.appendChild(undoIcon);
    ulItem.appendChild(imageIcon);
    ulItem.insertBefore(attImage, ulItem.childNodes[1]);


    deleteIcon.addEventListener("click", function() { remove_item(ulItem) });
    editIcon.addEventListener("click", function() { editable_state(ulItem) });
    saveIcon.addEventListener("click", function() { save_changes(ulItem) });
    undoIcon.addEventListener("click", function() { discard_changes(ulItem) });
    imageIcon.addEventListener("click", function() { add_image(ulItem) });
    attImage.addEventListener("click", function() { showImage(ulItem) });
    console.log(ulItem);

    itemsArray.push(ulItem);

    for (var i = 0; i < ulItem.getElementsByClassName('editIcons').length; i++) {
        ulItem.getElementsByClassName('editIcons')[i].style.display = "none";
    }

    return ulItem;
}


function add_items() {

    var inputField = document.getElementById('inputItem');
    var value = inputField.value;

    if (value == "") {
        console.log("The value cannot be null!");
    } else {


        elementsSection.appendChild(createItem(value));


        inputField.value = "";
    }
}

function editable_state(elem) {

    currentValue = elem.innerText;
    console.log("Editing... " + currentValue);
    var input = elem.getElementsByTagName('input')[0];

    input.style.display = "inline"; // crear clase 
    input.value = currentValue;


    var spanValue = elem.getElementsByTagName('span')[0];
    spanValue.style.display = "none";


    for (var i = 0; i < elem.getElementsByClassName('initialIcons').length; i++) {
        elem.getElementsByClassName('initialIcons')[i].style.display = "none";
    }

    for (var i = 0; i < elem.getElementsByClassName('editIcons').length; i++) {
        elem.getElementsByClassName('editIcons')[i].style.display = "inline";
    }

}


function remove_item(elem) {
    console.log("Removing... " + elem.innerText);
    elem.remove();
    itemsArray.splice(elem.getAttribute('id'), 1);
}

function add_image(elem) {
    inputState = 2;
    console.log('elem in add_image ->', elem);
    
    var currEl = elem;

    imageSection.style.display = "block";

    //hiddes edit icons
  


    var inputURL = imageSection.getElementsByTagName('input')[0];
    var saveIcon = imageSection.getElementsByTagName('i')[0];
    var closeIcon = imageSection.getElementsByTagName('i')[1];
    closeIcon.style.display = "none";
    //imageSection.getElementsByTagName('button')[0].style.display = "none";
    inputURL.style.display = "block";
    saveIcon.style.display = "inline";
    saveIcon.onclick =  function() { change_image(imageSection, currEl)};
    //saveIcon.addEventListener("click", function() { change_image(imageSection, currEl) });
}

function change_image(imageSection, elem) {
console.log('elem in change_image ->', elem);

    var inputImage = imageSection.getElementsByTagName('input')[0];
    var value = inputImage.value;

    console.log("Value in URL: " + value);


    elem.setAttribute("imageURL", value);

    img.src = value;

    imageSection.getElementsByTagName('input')[0].style.display = "none";
    imageSection.getElementsByTagName('i')[0].style.display = "none";

    inputImage.value = "";

    for (var i = 0; i < elem.getElementsByClassName('editIcons').length; i++) {
        elem.getElementsByClassName('editIcons')[i].style.display = "inline";
    }
    elem.getElementsByTagName('input')[0].style.display = "inline";
}

function has_image(elem) {
    if (elem.imageURL != "") {
        return true;
    } else {
        return false;
    }

}




function save_changes(elem) {
    var input = elem.getElementsByTagName('input')[0].value;
    var span = elem.getElementsByTagName('span')[0];

    if (input != "") {
        span.innerText = input;


        for (var i = 0; i < elem.getElementsByClassName('initialIcons').length; i++) {
            elem.getElementsByClassName('initialIcons')[i].style.display = "inline";
        }

        for (var i = 0; i < elem.getElementsByClassName('editIcons').length; i++) {
            elem.getElementsByClassName('editIcons')[i].style.display = "none";
        }

        elem.getElementsByTagName('input')[0].style.display = "none";
        span.style.display = "inline";
    } else {
        console.log("The input cannot be empty!")
    }

   
    imageSection.style.display = "none";

    img.src = defBackground;

    //Agregar icono de imagen adjunta

    if (has_image(elem)) {
        elem.getElementsByClassName('fa-file-image-o')[0].style.display = "inline";
        var closeIcon = imageSection.getElementsByTagName('i')[1];
    	closeIcon.style.display = "block";
    }




}

function showImage(elem) {
   
    console.log('Current src value: ');
    console.log(elem.getAttribute("imageURL"));
    img.src = elem.getAttribute("imageURL");
    imageSection.style.display = "block";

}


function discard_changes(elem) {
    var span = elem.getElementsByTagName('span')[0];
    span.innerText = currentValue;

    for (var i = 0; i < elem.getElementsByClassName('initialIcons').length; i++) {
        elem.getElementsByClassName('initialIcons')[i].style.display = "inline";
    }

    for (var i = 0; i < elem.getElementsByClassName('editIcons').length; i++) {
        elem.getElementsByClassName('editIcons')[i].style.display = "none";
    }

    elem.getElementsByTagName('input')[0].style.display = "none";
    span.style.display = "inline";
}
