let arrayEvents = [];
const API_URL = 'https://mindhub-xj03.onrender.com/api/amazing';

async function loadArray() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      arrayEvents = data.events;

      catUnicos(arrayEvents)
      filterCards(new Event("submit"))

    } catch (error) {
      console.error(error);
    }
  }


//                          Categorías Dinámicas sin repetir


// Obtenemos las categorías sin repetir
let unicos = [];
function catUnicos(arr) {


    arr.forEach((element, i ) =>{

    if(!unicos.includes(arr[i].category)){
        unicos.push(arr[i].category)
    }
    
})

//  Generamos las categorías dinámicamente

    unicos.forEach((element, i)=>{
    let categorys = document.querySelector(".categorys");
    let checkBox = document.createElement('label');

    let dinamicCheckBox = `
    <input type="checkbox" name="category" id="${unicos[i]}" value="${unicos[i]}">${unicos[i]}
    `;
    checkBox.innerHTML += dinamicCheckBox;
    categorys.appendChild(checkBox);
})

}




//                          Busqueda y Categorias


// Elementos HTML necesitados

let form = document.getElementById("search-form")
let searchInput = document.getElementById("search")
let articles = document.querySelector(".articles");
let notFoundMessage = document.querySelector('.not-found');


// Función para filtrar los productos según la búsqueda y las categorías seleccionadas

function filterCards(e){
    let categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]')

// Evita que se recargue la página

    e.preventDefault() 

// Obtenemos el término de búsqueda

    let searchTerm = searchInput.value.toLowerCase()

// Obtenemos las categorías seleccionadas

    let selectedCategories = Array.from(categoryCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value.toLowerCase())

// Filtramos las cards según la búsqueda y las categorías seleccionadas
    
    let filteredCards = arrayEvents.filter(card => {
        let matchesSearch = card.name.toLowerCase().includes(searchTerm) || card.description.toLowerCase().includes(searchTerm)
        let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(card.category.toLowerCase())
        return matchesSearch && matchesCategory
    })

// Mostramos los productos filtrados
    if (filteredCards.length > 0) {
        showCards(filteredCards)
        notFoundMessage.style.display = 'none'
    } else {
        articles.innerHTML = ''
        notFoundMessage.style.display = 'block'
    }
}

// Función para mostrar las cards en la página

function showCards(cards){
    let html = '';
    cards.forEach(product => {
      html += `
      <div class="card">
      <img src=${product.image} alt="event image">
      <div class="content">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
          <div class="contentPrice">
              <p>Price: $${product.price}</p>
              <a href="./details.html?_id=${product._id}">ver más...</a>
          </div>
      </div>
      </div>
`;
    });
    articles.innerHTML = html;
}

// Event listener para el submit del formulario
form.addEventListener("submit", filterCards)
loadArray();