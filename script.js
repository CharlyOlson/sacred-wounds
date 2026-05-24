// ===========================
// STORE PRODUCT DATA
// ===========================
const PRODUCTS = [
  {
    id: 1,
    title: 'Name It and Claim It',
    category: 'print',
    price: 45.00,
    image: 'https://via.placeholder.com/400x500/8b0000/ffffff?text=Name+It+and+Claim+It',
    description: 'A critique of prosperity gospel through experimental typography and sermon excerpts.'
  },
  {
    id: 2,
    title: 'Love the Sinner',
    category: 'print',
    price: 45.00,
    image: 'https://via.placeholder.com/400x500/4a0e4e/ffffff?text=Love+the+Sinner',
    description: 'Examining conditional love through deconstructed religious imagery.'
  },
  {
    id: 3,
    title: 'We Forgive You, But...',
    category: 'print',
    price: 45.00,
    image: 'https://via.placeholder.com/400x500/1a472a/ffffff?text=We+Forgive+You+But',
    description: 'Exploring the weaponization of forgiveness in religious contexts.'
  },
  {
    id: 4,
    title: 'Holier Than Thou',
    category: 'digital',
    price: 25.00,
    image: 'https://via.placeholder.com/400x500/0f4c75/ffffff?text=Holier+Than+Thou',
    description: 'Digital artwork dissecting moral superiority in faith communities.'
  },
  {
    id: 5,
    title: 'Sunday Marquee',
    category: 'print',
    price: 45.00,
    image: 'https://via.placeholder.com/400x500/c24914/ffffff?text=Sunday+Marquee',
    description: 'Satirical examination of church marketing and messaging.'
  }
];


// ===========================
// CONFESSION WALL CARDS DATA
// ===========================

const CONFESSION_CARDS = [
  {
    id: 1,
    category: 'abuse',
    front: '"We forgive you, but there will be consequences."',
    back: 'We are choosing our reputation over your safety.',
    needed: 'The Plain, Unbiased Truth'
  }
];
// ===========================
// CART STATE
// ===========================
let cart = [];
let currentUser = null;

// ===========================
// DOM INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in observer for content sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe content sections (but NOT store cards)
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => observer.observe(section));

  // Initialize store if present
  const storeGrid = document.getElementById('store-grid');
  if (storeGrid) {
    renderStore();
  }

  // Initialize cart UI
  updateCartUI();
  
  // Initialize confession wall
  const wallGrid = document.getElementById('cardGrid');
  if (wallGrid) {
    renderConfessionWall();
  }
getElementById('cardGrid');
  // Setup event listeners
  setupEventListeners();
});

// ===========================
// STORE RENDERING
// ===========================
function renderStore() {
  const storeGrid = document.getElementById('store-grid');
  if (!storeGrid) return;

  storeGrid.innerHTML = PRODUCTS.map(product => `
    <div class="store-card" data-category="${product.category}">
      <img src="${product.image}" alt="${product.title}" class="store-card-image" />
      <div class="store-card-content">
        <h3>${product.title}</h3>
        <p class="store-card-category">${product.category === 'print' ? 'Print' : 'Digital'}</p>
        <p class="store-card-price">$${product.price.toFixed(2)}</p>
        <button class="btn-primary" onclick="openProductModal(${product.id})">View Details</button>
      </div>
    </div>
  `).join('');
}

// ===========================
// PRODUCT MODAL
// ===========================
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalContent = modal.querySelector('.modal-body');
  
  modalContent.innerHTML = `
    <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 400px; margin-bottom: 1rem;" />
    <h2>${product.title}</h2>
    <p class="modal-category">${product.category === 'print' ? 'Print' : 'Digital Download'}</p>
    <p class="modal-price">$${product.price.toFixed(2)}</p>
    <p>${product.description}</p>
    <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  
  modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// ===========================
// CART MANAGEMENT
// ===========================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  closeModal('product-modal');
  
  // Show feedback
  alert(`${product.title} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
  
  if (cartModal) {
    renderCartModal();
  }
}

function renderCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (!cartItems || !cartTotal) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
    cartTotal.textContent = '$0.00';
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>Qty: ${item.quantity}</p>
        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
  
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    renderCartModal();
    cartModal.style.display = 'flex';
  }
}

// ===========================
// CHECKOUT
// ===========================
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  if (!currentUser) {
    alert('Please log in to complete your purchase.');
    closeModal('cart-modal');
    openLoginModal();
    return;
  }
  
  // TODO: Integrate Stripe Checkout
  // For now, use mailto fallback
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const items = cart.map(item => `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('%0A');
  const subject = 'Sacred Wounds Purchase Request';
  const body = `I would like to purchase:%0A%0A${items}%0A%0ATotal: $${total.toFixed(2)}`;
  
  window.location.href = `mailto:orders@sacredwounds.art?subject=${subject}&body=${body}`;
}

// ===========================
// FILTER SYSTEM
// ===========================
function filterStore(category) {
  const cards = document.querySelectorAll('.store-card');
  const buttons = document.querySelectorAll('.filter-btn');
  
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===========================
// LOGIN SYSTEM
// ===========================
function openLoginModal() {
  const loginModal = document.getElementById('login-modal');
  if (loginModal) {
    loginModal.style.display = 'flex';
  }
}

function loginWithGoogle() {
  // TODO: Implement Google OAuth with 2FA
  alert('Google OAuth with 2FA will be implemented here');
  // Simulate login for now
  currentUser = { name: 'User', email: 'user@example.com' };
  closeModal('login-modal');
  updateUserUI();
}

function logout() {
  currentUser = null;
  cart = [];
  updateUserUI();
  updateCartUI();
}

function updateUserUI() {
  const loginBtn = document.getElementById('login-btn');
  const userInfo = document.getElementById('user-info');
  
  if (currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'block';
      userInfo.innerHTML = `
        <span>Welcome, ${currentUser.name}</span>
        <button onclick="logout()" class="btn-secondary">Logout</button>
      `;
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (userInfo) userInfo.style.display = 'none';
  }
}

// ===========================
// EVENT LISTENERS
// ===========================
function setupEventListeners() {
  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
  
  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
    }

    // ===========================
// CONFESSION WALL CARDS DATA
// ===========================
const CONFESSION_CARDS = [
  {
    id: 1,
    category: 'abuse',
    front: '"We forgive you, but there will be consequences."',
    back: 'We are choosing our reputation over your safety.',
    needed: '"We believe you. We are sorry. You are safe here."'
  },
  {
    id: 2,
    category: 'exclusion',
    front: '"Love the sinner, hate the sin."',
    back: 'We love you conditionally—only when you hide who you are.',
    needed: '"You are loved exactly as you are. No conditions."'
  },
  {
    id: 3,
    category: 'shame',
    front: '"Your struggle shows a lack of faith."',
    back: 'Your humanity is inconvenient to our theology.',
    needed: '"Your pain is valid. Faith does not erase suffering."'
  },
  {
    id: 4,
    category: 'doubt',
    front: '"If you just prayed harder, you\'d understand."',
    back: 'Your questions threaten our certainty.',
    needed: '"Doubt is part of the journey. Ask your questions."'
  },
  {
    id: 5,
    category: 'money',
    front: '"God wants you to be prosperous."',
    back: 'We profit when you believe faith is transactional.',
    needed: '"Your worth is not determined by your wealth."'
  },
  {
    id: 6,
    category: 'abuse',
    front: '"Forgive and move on."',
    back: 'Your trauma is inconvenient. Silence is easier than justice.',
    needed: '"Healing takes time. You deserve justice and support."'
  },
  {
    id: 7,
    category: 'shame',
    front: '"Purity is the highest virtue."',
    back: 'We control you through shame about your body.',
    needed: '"Your body is yours. Shame has no place here."'
  },
  {
    id: 8,
    category: 'exclusion',
    front: '"We welcome everyone... but."',
    back: 'Our doors are open only to those who conform.',
    needed: '"Everyone means everyone. No exceptions."'
  }
];

// ===========================
// CONFESSION WALL RENDERING
// ===========================
let currentFilter = 'all';

function renderConfessionWall() {
  const wallGrid = document.getElementById('cardGrid');
  if (!wallGrid) return;

  const filtered = currentFilter === 'all' 
    ? CONFESSION_CARDS 
      console.log('Confession Wall - wallGrid found:', wallGrid);  console.log('CONFESSION_CARDS:', CONFESSION_CARDS);
    : CONFESSION_CARDS.filter(card => card.category === currentFilter);

  wallGrid.innerHTML = filtered.map(card => `
    <div class="flip-card" data-category="${card.category}">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <p class="card-quote">${card.front}</p>
        </div>
        <div class="flip-card-back">
          <p class="card-meaning">${card.back}</p>
          <div class="card-needed">
            <span class="needed-label">The Plain, Unbiased Truth</span>            <p>${card.needed}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');

function filterConfessionCards(category) {
  currentFilter = category;
  renderConfessionWall();
  
  // Update active button
  document.querySelectorAll('.filter button').forEach(btn => {
    btn.classList.remove('filter-active');
  });
  event.target.classList.add('filter-active');
}

    // ===========================
// GALLERY PURCHASE INTEGRATION
// ===========================
function openProductModalFromGallery(productId) {
  // Opens the product modal from gallery purchase buttons
  openProductModal(productId);
}
  });
}


// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  // Render confession wall on load
  renderConfessionWall();
  
  // Render store on load
  renderStore();
  
  // Initialize cart display
  renderCartModal();
});


// ===========================
// STORE FILTER FUNCTION
// ===========================

function filterStore(category) {
  const storeGrid = document.getElementById('store-grid');
  if (!storeGrid) return;
  
  const filtered = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === category);
  
  storeGrid.innerHTML = filtered.map(product => `
    <div class="product-card" data-category="${product.category}">
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="btn-remove" onclick="openProductModal(${product.id})">View Details</button>
    </div>
  `).join('');
  
  // Update active button
  document.querySelectorAll('.store .filter button').forEach(btn => {
    btn.classList.remove('filter-active');
  });
  event.target.classList.add('filter-active');
}
