const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
let minPrice = urlParams.get("minPrice");
let maxPrice = urlParams.get("maxPrice");

async function FetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    await fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((cates) => console.log(cates));
    //console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function DisplayItems() {
  if (minPrice != null) minPrice = parseInt(minPrice);
  if (maxPrice != null) maxPrice = parseInt(maxPrice);
  console.log(minPrice);
  console.log(maxPrice);

  let data = null;

  if (category === null || category === "all") {
    data = await FetchData("https://fakestoreapi.com/products");
  } else {
    data = await FetchData(
      `https://fakestoreapi.com/products/category/${category}`
    );
  }

  data.forEach((element) => {
    if (minPrice === null || minPrice < element.price) {
      if (maxPrice === null || maxPrice > element.price) {
        const title = element.title;
        const description = element.description;
        const price = element.price;
        const rating = element.rating.rate;
        const image = element.image;
        const id = element.id;
        AddItemToList(id, title, description, price, image);
      }
    }
  });
}

function AddItemToList(id, title, description, price, image) {
  let newElement = document.createElement("div");
  newElement.classList.add("product");
  newElement.innerHTML = `
    <h2>${title}</h2>
    <img src="${image}" alt="product picture" />
    <p class="description">${description}</p>
    <div>
      <p>price: ${price}$</p>
      <button class="detailsButton" onclick="ViewDetails(${id})">View Details</button>
    </div>
  `;

  document.getElementById("products").appendChild(newElement);
}

function ReloadPage() {
  location.href = "http://127.0.0.1:5500/View/store.html";
}

function ViewDetails(id) {
  location.href = `http://127.0.0.1:5500/View/itemDetails.html?id=${id}`;
}

const Start = async () => {
  await DisplayItems();
};

function SearchPrice() {
  let minPrice = document.getElementById("minPriceInput").value;
  let maxPrice = document.getElementById("maxPriceInput").value;

  if (minPrice.length == 0) minPrice = 0;
  if (maxPrice.length == 0) maxPrice = 99999;

  console.log(minPrice);
  console.log(maxPrice);

  location.href =
    window.location.href.replace(queryString, "") +
    `?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
}

Start();
