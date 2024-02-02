const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
console.log(category);

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
  let data = null;

  if (category === null) {
    data = await FetchData("https://fakestoreapi.com/products");
  } else {
    data = await FetchData(
      `https://fakestoreapi.com/products/category/${category}`
    );
  }

  data.forEach((element) => {
    const title = element.title;
    const description = element.description;
    const price = element.price;
    const rating = element.rating.rate;
    const image = element.image;
    const id = element.id;

    AddItemToList(id, title, description, price, image);
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

// const CreateProduct = async (id) => {
//   const productsSection = document.getElementById("products");

//   let newProduct = document.createElement("div");
//   newProduct.classList.add("product");
//   newProduct.innerHTML = `
//     <img src="https://i.imgur.com/1twoaDy.jpeg" alt="product picture" />
//     <h2>${items[id].title}</h2>
//     <p class="description">${items[id].description}</p>
//     <div>
//       <p>price: ${items[id].price}$</p>
//       <button class="detailsButton" onclick="ViewDetails(${id})">Add to Cart</button>
//     </div>
//   `;

//   productsSection.appendChild(newProduct);
// };

DisplayItems();

function ReloadPage() {
  location.href = "http://127.0.0.1:5500/View/store.html";
}

function ViewDetails(id) {
  location.href = `http://127.0.0.1:5500/View/itemDetails.html?id=${id}`;
}
