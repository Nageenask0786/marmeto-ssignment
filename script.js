let categoriesContainer = document.querySelector(".categories-container");
const products = document.getElementById("products");

const apiUrl = `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`;

function displayProducts(categories) {
    if (categories.length > 0) {
        categories.forEach((each) => {
            console.log(each);
            const productItem = document.createElement("li");
            each.category_products.map((product) => {
                const discountAmount = product.compare_at_price - product.price;
                const discountPercentage = Math.floor(
                    (discountAmount / product.compare_at_price) * 100
                );
                console.log(categories);
                console.log(each.category_name);
                productItem.classList.add("product-item");
                products.appendChild(productItem);
                const Container = document.createElement("div")
                Container.classList.add("product-container")
                Container.dataset.category = each.category_name;
                productItem.appendChild(Container)
                const Image = document.createElement("img");
                Image.classList.add("image");
                Image.src = product.image;
                Container.appendChild(Image);
                const productDataContainer = document.createElement("div");
                productDataContainer.classList.add("product-data");
                Container.appendChild(productDataContainer);
                const badge = document.createElement("p");
                badge.textContent = product.badge_text;
                badge.classList.add("title");
                productDataContainer.appendChild(badge);

                const Title = document.createElement("h1");
                Title.textContent = product.title;
                Title.classList.add("title");
                productDataContainer.appendChild(Title);
                const Price = document.createElement("p");
                Price.textContent = product.price;
                Price.classList.add("price");
                productDataContainer.appendChild(Price);
                const ComparePrice = document.createElement("p");
                ComparePrice.textContent = product.compare_at_price;
                ComparePrice.classList.add("compare-price");
                productDataContainer.appendChild(ComparePrice);
                const Vendor = document.createElement("p");
                Vendor.textContent = `Sold By ${product.vendor}`;
                Vendor.classList.add("vendor");
                productDataContainer.appendChild(Vendor);
                const Discount = document.createElement("p");
                Discount.textContent = `${discountPercentage}% Off`;
                Discount.classList.add("discount");
                productDataContainer.appendChild(Discount);
                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Add to Cart";
                addToCartButton.classList.add("add-to-cart");
                productDataContainer.appendChild(addToCartButton);
            });
        });
    }
}
async function getProductsData() {
    try {
        let response = await fetch(apiUrl);
        if (response.ok === true) {
            let jsonData = await response.json();
            const {
                categories
            } = jsonData;
            const categoriesList = categories.map((product) => product.category_name);
            categoriesList.forEach((each) => {
                const button = document.createElement("button");
                button.classList.add("button");
                button.textContent = each;
                categoriesContainer.appendChild(button);
            });
            categoriesContainer.addEventListener("click", (event) => {
                const selectedCatagory = event.target.textContent;
                document.querySelector(".active-class")?.classList.remove("active-class");
                event.target.classList.add("active-class");
                const filters = categories.filter(
                    (each) => each.category_name === selectedCatagory
                );
                displayProducts(filters);
                const allProducts = document.querySelectorAll(".product-item .product-container");
                console.log(allProducts)                
                allProducts.forEach((each) => {
                    each.classList.add("hide-element");

                    if (each.dataset.category === selectedCatagory) {
                        console.log(each.dataset.category);
                        each.classList.remove("hide-element");

                    }
                });
            });

        }
    } catch (e) {
        console.log(e);
    }
}
getProductsData();