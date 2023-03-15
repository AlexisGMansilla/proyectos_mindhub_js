let arrayEvents = [];
let currentDate;
const API_URL = 'https://mindhub-xj03.onrender.com/api/amazing';

// Llamamos a la API y obtenemos el resultado en json
async function loadArray() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
// Asignamos a las variables el array de objetos y la fecha
      arrayEvents = data.events;
      currentDate = data.currentDate;
// Variables Globales
      globalThis.arrayEventsUpc = arrayEvents.filter(objeto => objeto.date > currentDate);
      globalThis.arrayEventsPast = arrayEvents.filter(objeto => objeto.date < currentDate);
// Función que muestra los eventos
      showEvents()
    } catch (error) {
// Si hay un error, lo muestra en la consola
      console.error(error); 
    }
  }

// Elementos HTML necesitados
let highAtt = document.getElementById("highAtt")
let lowAtt = document.getElementById("lowAtt")
let largCap = document.getElementById("largCap")
let html = '';


// Función para mostrar los eventos correspondientes a la tabla

function showEvents(){ 
    eventsPerAttendance();
    catUnix(globalThis.arrayEventsUpc, result, 0);
    eveCategories(result, upcEveCat, 0);
    catUnix(globalThis.arrayEventsPast, pastResult, 1);
    eveCategories(pastResult , pastEveCat, 1);
}

// Muestra la primera parte de la tabla en el HTML

function showInHTML(card, td){
    html = `
    <a class="tableEventsName" href="./details.html?_id=${card._id}">${card.name}</a>
    `;
    td.innerHTML = html;
}


// Obtiene y muestra la mayor y menor asistencia y la capacidad máxima 

function eventsPerAttendance() {
    let arrayEventsPast = arrayEvents.filter(objeto => objeto.date < currentDate);
    let porcentajes = arrayEventsPast.map(obj => {
        let porcentaje = obj.assistance*100/obj.capacity
        return {...obj, porcentaje}
    })
    let mayorPorcentaje = porcentajes.reduce((mayor, obj) =>{
        return obj.porcentaje > mayor.porcentaje ? obj : mayor;
    })
    showInHTML(mayorPorcentaje, highAtt)

    let menorPorcentaje = porcentajes.reduce((menor, obj) =>{
        return obj.porcentaje < menor.porcentaje ? obj : menor;
    })
    showInHTML(menorPorcentaje, lowAtt)
    let capacidadMaxima = arrayEvents.reduce((maximo, objeto) => {
        return objeto.capacity > maximo ? objeto.capacity : maximo;
    },0);
    arrayEvents.forEach(card => {
     if(card.capacity >= capacidadMaxima){
            showInHTML(card, largCap)
        }
    });
}

// Elementos HTML necesitados
let upcEveCat = document.querySelector(".upcEveCat")
let pastEveCat = document.querySelector(".pastEveCat")
// Array necesitados
let result = [];
let pastResult = [];

// Obtiene y crea un nuevo array con los eventos necesitados y sus respectivas propiedades

function catUnix(arrayEvent, newArray, estOrAssit){
for (let i = 0; i < arrayEvent.length; i++) {
    let category = arrayEvent[i].category;
    let price = arrayEvent[i].price;
    let estimate = arrayEvent[i].estimate;
    let assistance = arrayEvent[i].assistance;
    let capacity = arrayEvent[i].capacity;
    let existeCategory = newArray.findIndex((item) => item.category === category);
    
    if (existeCategory === -1 ) {
      newArray.push({ category, price, estimate, assistance, capacity});
    } else if(estOrAssit === 0){
      newArray[existeCategory].price  += price ;
      newArray[existeCategory].estimate += estimate;
      newArray[existeCategory].capacity += capacity;
    }
    else{
        newArray[existeCategory].price  += price ;
        newArray[existeCategory].assistance += assistance;
        newArray[existeCategory].capacity += capacity;
    }
  }

}

// Funcion que muestra los eventos correspondientes 

function eveCategories(resultx, lugarHTML, x){
    showCatInHTML(resultx, lugarHTML, x)
}

// Funcion que muestra en el HTML los eventos correspondientes con su respectiva lógica
function showCatInHTML(card, lugarHTML, x) {
    if(x===0){
        card.forEach((element,i)=>{
            let htmlTD = '';
            let x = card[i].estimate*100/card[i].capacity;
            let percentage = x.toFixed(2)
            let rev = card[i].price*card[i].estimate;
            let revenues = rev.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
            let TR = document.createElement('tr')
            htmlTD += `
            <td>${card[i].category}</td>
            <td>${revenues}</td>
            <td>${percentage}%</td>
                `;
            TR.innerHTML = htmlTD;
            lugarHTML.appendChild(TR);
        })
    }else{
        card.forEach((element,i)=>{
            let htmlTD = '';
            let x = card[i].assistance*100/card[i].capacity;
            let percentage = x.toFixed(2)
            let rev = card[i].price*card[i].assistance;
            let revenues = rev.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});
            let TR = document.createElement('tr')
            htmlTD += `
            <td>${card[i].category}</td>
            <td>${revenues}</td>
            <td>${percentage}%</td>
                `;
            TR.innerHTML = htmlTD;
            lugarHTML.appendChild(TR);
    })
} 
}


loadArray();