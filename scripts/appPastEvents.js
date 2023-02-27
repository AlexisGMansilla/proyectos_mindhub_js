data.events.forEach((element, i ) =>{
    
    let articles = document.querySelector(".articles");
    
    let card = document.createElement('div');
    card.classList = 'card';
    
    let eventCard = `
            <img src=${data.events[i].image} alt="event image">
            <div class="content">
                    <h3>${data.events[i].name}</h3>
                    <p>${data.events[i].description}</p>
                <div class="contentPrice">
                    <p>Price: $${data.events[i].price}</p>
                    <a href="./details.html">ver más...</a>
                </div>
            </div>
    `;

    if (data.events[i].date < data.currentDate ) {
        card.innerHTML += eventCard;
        articles.appendChild(card);
    }
});