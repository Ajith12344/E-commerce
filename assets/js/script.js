// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch latest products from backend API
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(products => {
        const productsContainer = document.getElementById('products-container');
        products.forEach(product => {
          // Create HTML for each product card
          const productCard = `
            <div class="col-md-4 col-12 mb-4">
              <div class="card">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">Price: ₹ ${product.price}</p>
                  <a href="product_detail.html?id=${product._id}" class="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          `;
          // Append product card to container
          productsContainer.innerHTML += productCard;
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  
    // Similar logic can be applied to fetch categories, if needed
  });
  