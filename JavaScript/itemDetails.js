async function FetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function GetItem() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const item = await FetchData(`https://fakestoreapi.com/products/${id}`);
  console.log(item);
  return item;
}

const DisplayItem = async () => {
  const item = await GetItem();

  const firstHalfEl = document.createElement("div");
  const secondHalfEl = document.createElement("div");

  firstHalfEl.innerHTML = `
    <img src="${item.image}" alt="image">
  `;
  secondHalfEl.innerHTML = `
    <h1>${item.title}</h1>
    <h2>$${item.price}</h2>
    <p>${item.description}</p>
    <p class="rate">rating: ${item.rating.rate}</p>
    <p class="count">review amount ${item.rating.count}</p>
  `;

  document.getElementById("firstHalf").appendChild(firstHalfEl);
  document.getElementById("secondHalf").appendChild(secondHalfEl);
};

DisplayItem();
