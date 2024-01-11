let categoriesContainer = document.getElementById("categoriesContainer");
let search = "m"
const apiUrl =
  `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`;
async function Categories(data) {
  data.categories.forEach((each) => {
    const button = document.createElement("button");
    button.textContent = each.category_name;
    button.classList.add("button");
    document.getElementById("categoriesContainer").appendChild(button);
  });
}

function displayProducts(categories) {
  if (categories.length > 0) {
    categories.map((each) => {
      each.category_products.map((product) => {
        const productItem = document.createElement("li");
        productItem.classList.add("product-item");
        productItem.id = product.key;
        document.getElementById("products").appendChild(productItem);
        const Image = document.createElement("img");
        Image.classList.add("image");
        Image.src = product.image;
        productItem.appendChild(Image);
        const Title = document.createElement("h1");
        Title.textContent = product.title;
        Title.classList.add("title");
        productItem.appendChild(Title);
        const priceDetails = document.createElement("div");
        priceDetails.classList.add("price-details");
        productItem.appendChild(priceDetails);
        const price = document.createElement("p");
        price.textContent = product.price;
        price.classList.add("price");
        priceDetails.appendChild(price);
        const comparePrice = document.createElement("p");
        comparePrice.textContent = product.compare_at_price;
        comparePrice.classList.add("compare-price");
        priceDetails.appendChild(comparePrice);
        const Vendor = document.createElement("p");
        Vendor.textContent = `Sold By ${product.vendor}`;
        price.classList.add("vendor");
        productItem.appendChild(Vendor);
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart");
        productItem.appendChild(addToCartButton);
      });
    });
  }
}
let filteredResults;
async function getProductsData() {
  try {
    let response = await fetch(apiUrl);
    if (response.ok === true) {
      let jsonData = await response.json();
      const { categories } = jsonData;
      console.log(categories)
      const categoriesList = categories.map((product) => product.category_name);
      console.log(categoriesList);
      categoriesContainer.innerHTML = categoriesList
        .map((each) => `<button>${each}</button>`)
        .join("");
      categoriesContainer.addEventListener("click", (e) => {
        let selectedCatagory = e.target.textContent;
        console.log(selectedCatagory);
        displayProducts(categories.filter((each)=> each.category_name == selectedCatagory))
        
      });
    }
     
  } catch (e) {
    console.log(e);
  }
}
getProductsData();
