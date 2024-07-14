document.addEventListener('DOMContentLoaded', function() {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const latestProducts = await response.json();
  
        const latestProductsRow = document.getElementById('latest-products-row');
        latestProductsRow.innerHTML = ''; // Clear previous content
  
        latestProducts.forEach(product => {
          // Calculate star rating HTML based on product.rating
          const stars = getStarRatingHTML(product.rating);
  
          // Construct product card HTML
          const productCard = `
            <div class="col-md-4 col-12 mb-4">
              <div class="single_product shadow text-center p-1">
                <div class="product_img">
                  <a href="product_detail.html">
                    <img src="${product.image}" class="img img-fluid" alt="${product.name}">
                  </a>
                  <div class="new_product">
                    <span class="badge py-2 px-3 badge-pill badge-danger">New</span>
                  </div>
                </div>
                <div class="product-caption my-3">
                  <div class="product-ratting">
                    ${stars} <!-- Inject star ratings HTML -->
                  </div>
                  <h4><a href="product_detail.html?id=${product.id}">${product.name}</a></h4>
                  <div class="price">
                    <b><span class="mr-1">₹</span><span>${product.price}</span></b>
                  </div>
                </div>
              </div>
            </div>
          `;
          latestProductsRow.innerHTML += productCard;
        });
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };
  
    // Function to generate star rating HTML based on rating
    const getStarRatingHTML = (rating) => {
      const maxStars = 5;
      const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  
      let starHTML = '';
      for (let i = 1; i <= maxStars; i++) {
        if (i <= roundedRating) {
          starHTML += '<i class="fas fa-star"></i>'; // Full star
        } else if (i - 0.5 === roundedRating) {
          starHTML += '<i class="fas fa-star-half-alt"></i>'; // Half star
        } else {
          starHTML += '<i class="far fa-star"></i>'; // Empty star
        }
      }
      return starHTML;
    };
  
    fetchLatestProducts();
  });
  