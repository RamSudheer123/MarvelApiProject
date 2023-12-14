const publicKey = "838ea419b6b3400e159745ea767c85bf";
const privateKey = "96277bc9dc4d817da04a8e88483a97c950a75a06";
const timestamp = new Date().getTime();
const hashString = timestamp + privateKey + publicKey;
const hash = CryptoJS.MD5(hashString).toString();

const API = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;

let data = [];

fetch(API)
    .then((res) => res.json())
    .then((json) => {
        data = json.data.results;
        renderCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));

function renderCards(data) {
    const container = document.getElementById("cardContainer");

    data.forEach((character) => {
        const card = createCard(character);
        container.appendChild(card);
    });
}

function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = character.name;

    const description = document.createElement("p");
    description.textContent =
        character.description || "No description available.";

    const image = document.createElement("img");
    image.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    image.alt = character.name;

    const button = document.createElement("button");
    button.textContent = "More Details";
    button.addEventListener("click", () => showDetails(character));

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

function showDetails(character) {
    alert(`Name: ${character.name}\nDescription: ${character.description}`);
}

const button = document.getElementsByClassName("submit");
var input = document.getElementsByClassName('search')
button.addEventListener('click', async () => {
    let value = input.value;

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&name=${input.value}`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        data = json.data.results;
        renderCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
    });