const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imgCount = 10;

const API_KEY = "NFFvmsrQ6Y0Dfung4yby59rLFh0cDQ7YaKl5ApoDEf4";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${imgCount}`;

function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set Attributes 
function setAttributes(element, attribute) {
  for(const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

// Display function to create element and add to DOM
function displayPhoto(){
  imagesLoaded = 0;
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    // Create <a></a> Element
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    
    // Create image Element
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
  
    // Image listner, called when images are loaded
    img.addEventListener('load', imageLoaded);
    // Add img to <a> tag
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

async function getImages(){
  try {
    const response = await fetch(apiURL);
    photoArray = await response.json();
    displayPhoto();
  }catch(error){
    // For error handling
  }
}

// Infinite scroll using the scroll event

window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getImages();
  }
})

// OnLoad
getImages();