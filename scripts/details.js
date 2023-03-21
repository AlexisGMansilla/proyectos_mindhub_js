let arrayEvents = [];
const API_URL = 'https://mindhub-xj03.onrender.com/api/amazing';

async function loadArray() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      arrayEvents = data.events;
      cardDetails();
    } catch (error) {
      console.error(error);
    }
  }
loadArray();

    function cardDetails() {

    const queryString = location.search

    const params = new URLSearchParams(queryString)

    const id = params.get("_id")

    const cardId = arrayEvents.find(element => element._id == id)

    const div = document.querySelector(".containerCardDetail")
    div.innerHTML = `
                <div class="cardDetail">
                    <div class="imgDetail">
                        <img src="${cardId.image}" alt="event image">
                    </div>
                    <div class="contentDetail">
                        <h3>${cardId.name}</h3>
                        <p>${cardId.description}</p>
                        <p><b>Place:</b> ${cardId.place}</p>
                        <p><b>Capacity:</b> ${cardId.capacity}</p>
                        <p><b>Price:</b> $${cardId.price}</p>
                    </div>
    `
}
