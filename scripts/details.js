const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("_id")

const cardId = data.events.find(element => element._id == id)

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