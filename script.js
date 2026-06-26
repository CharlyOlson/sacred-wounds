// ===========================
// BRAND
// ===========================
const BRAND_NAME = 'Harlots, Heathens & Heretic Apothecary';
const EXHIBITION_NAME = 'Sacred Wounds';
const STRIPE_PUBLIC_KEY = 'pk_live_YOUR_STRIPE_KEY_HERE'; // Replace with actual key

// ===========================
// STORE PRODUCT DATA
// ===========================
const PRODUCTS = [
  {
    id: 1,
    title: 'Name It and Claim It',
    category: 'print',
    price: 45.0,
    image: 'images/name-it-claim-it.jpg',
    description: 'A critique of prosperity gospel through experimental typography and sermon excerpts.'
  },
  {
    id: 2,
    title: 'Love the Sinner',
    category: 'print',
    price: 45.0,
    image: 'images/love-the-sinner.jpg',
    description: 'Examining conditional love through deconstructed religious imagery.'
  },
  {
    id: 3,
    title: 'We Forgive You, But...',
    category: 'print',
    price: 45.0,
    image: 'images/we-forgive-you-but.jpg',
    description: 'Exploring the weaponization of forgiveness in religious contexts.'
  },
  {
    id: 4,
    title: 'Holier Than Thou',
    category: 'digital',
    price: 25.0,
    image: 'images/holier-than-thou.jpg',
    description: 'Digital artwork dissecting moral superiority in faith communities.'
  },
  {
    id: 5,
    title: 'Sunday Marquee',
    category: 'print',
    price: 45.0,
    image: 'images/sunday-marquee.jpg',
    description: 'Satirical examination of church marketing and messaging.'
  }
];

// ===========================
// MERCHANDISE TYPES
// ===========================
const MERCHANDISE_TYPES = [
  { id: 'tshirt', name: 'T-Shirt', price: 24.99, sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] },
  { id: 'hoodie', name: 'Hoodie', price: 49.99, sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] },
  { id: 'hat', name: 'Hat', price: 19.99, sizes: ['One Size'] },
  { id: 'beanie', name: 'Beanie', price: 18.99, sizes: ['One Size'] },
  { id: 'underwear', name: 'Underwear', price: 14.99, sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'bra', name: 'Bra', price: 34.99, sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL+'] }
];

// ===========================
// CONFESSION / WITNESS DATA
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
    front: `"If you just prayed harder, you'd understand."`,
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
// APP STATE
// ===========================
let cart = [];
let currentUser = null;
let currentFilter = 'all';

// ===========================
// LOCAL STORAGE
// ===========================
function loadCart() {
  const saved = localStorage.getItem('sacredWoundsCart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem('sacredWoundsCart', JSON.stringify(cart));
}

// ===========================
// DOM READY
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  initFadeInObserver();
  renderPiecesGallery();
  renderStore();
  renderConfessionWall();
  updateCartUI();
  updateUserUI();
  setupEventListeners();
  setupFlipCardListeners();
  createPersistentCartBar();
});

// ===========================
// PERSISTENT CART BAR
// ===========================
function createPersistentCartBar() {
  if (document.querySelector('.cart-bar')) return; // Already exists
  
  const cartBar = document.createElement('div');
  cartBar.className = 'cart-bar';
  cartBar.innerHTML = `
    <div class="cart-bar-content">
      <button class="cart-bar-btn" onclick="openCart()">
        🛒 Cart <span id="cart-count-bar">0</span>
      </button>
      <span class="cart-total-bar">Total: $<span id="cart-total-bar">0.00</span></span>
    </div>
  `;
  document.body.appendChild(cartBar);
}

// ===========================
// PIECES GALLERY RENDERING
// ===========================
function renderPiecesGallery() {
  const piecesGrid = document.getElementById('piecesGrid');
  if (!piecesGrid) return;

  const pieces = [
    {
      title: 'Name It and Claim It',
      theme: 'Prosperity Gospel',
      quote: '"Name it and claim it—God wants you wealthy."',
      description: 'A critique of prosperity gospel doctrine that conflates faith with financial success.',
      image: 'images/name-it-claim-it.jpg'
    },
    {
      title: 'Love the Sinner',
      theme: 'Conditional Love',
      quote: '"Love the sinner, hate the sin."',
      description: 'Exploring how this phrase masks judgment and creates division within faith communities.',
      image: 'images/love-the-sinner.jpg'
    },
    {
      title: 'We Forgive You, But...',
      theme: 'Weaponized Forgiveness',
      quote: '"We forgive you, but there will be consequences."',
      description: 'Unpacking how forgiveness is used to silence victims and maintain institutional power.',
      image: 'images/we-forgive-you-but.jpg'
    },
    {
      title: 'Holier Than Thou',
      theme: 'Moral Superiority',
      quote: '"We are saved; you are lost."',
      description: 'Dissecting the righteousness that excludes and diminishes those with different beliefs.',
      image: 'images/holier-than-thou.jpg'
    },
    {
      title: 'Sunday Marquee',
      theme: 'Empty Promises',
      quote: '"Pray the gay away."',
      description: 'Examining church messaging that claims to heal identity, causing deep psychological harm.',
      image: 'images/sunday-marquee.jpg'
    }
  ];

  piecesGrid.innerHTML = pieces
    .map(
      (piece, idx) => `
      <div class="piece-card">
        <div class="piece-img">
          <img src="${piece.image}" alt="${piece.title}" onerror="this.style.display='none'">
        </div>
        <div class="piece-info">
          <p class="piece-label">${piece.theme}</p>
          <h3>${piece.title}</h3>
          <blockquote>${piece.quote}</blockquote>
          <p class="piece-desc">${piece.description}</p>
          <button class="btn-primary" onclick="customizeConfession(${idx})">Make Merch</button>
        </div>
      </div>
    `
    )
    .join('');
}

// ===========================
// CUSTOMIZE CONFESSION AS MERCHANDISE
// ===========================
function customizeConfession(pieceIndex) {
  const pieces = [
    { quote: '"Name it and claim it—God wants you wealthy."', title: 'Name It and Claim It' },
    { quote: '"Love the sinner, hate the sin."', title: 'Love the Sinner' },
    { quote: '"We forgive you, but there will be consequences."', title: 'We Forgive You, But...' },
    { quote: '"We are saved; you are lost."', title: 'Holier Than Thou' },
    { quote: '"Pray the gay away."', title: 'Sunday Marquee' }
  ];

  const piece = pieces[pieceIndex];
  const modal = document.getElementById('customize-modal') || createCustomizeModal();
  
  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal('customize-modal')">×</button>
    <h2>Create Custom Merch</h2>
    <p style="color: var(--muted); margin-bottom: 1.5rem;"><em>${piece.quote}</em></p>
    
    <div class="form-group">
      <label>Select Item Type</label>
      <select id="merchType" onchange="updateMerchOptions()">
        <option value="">-- Choose an item --</option>
        ${MERCHANDISE_TYPES.map(m => `<option value="${m.id}">${m.name} - $${m.price.toFixed(2)}</option>`).join('')}
      </select>
    </div>

    <div class="form-group" id="sizeGroup" style="display:none;">
      <label>Size</label>
      <select id="merchSize">
        <option value="">-- Choose size --</option>
      </select>
    </div>

    <div class="form-group">
      <label>Color</label>
      <select id="merchColor">
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="navy">Navy</option>
        <option value="red">Red</option>
        <option value="gray">Gray</option>
      </select>
    </div>

    <div class="form-group">
      <label>Quantity</label>
      <input type="number" id="merchQty" min="1" max="100" value="1">
    </div>

    <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
      Your quote will be printed with the ${BRAND_NAME} brand mark
    </p>

    <button class="btn-primary" onclick="addCustomMerchToCart('${piece.quote}', '${piece.title}')">Add to Cart</button>
  `;

  modal.style.display = 'flex';
}

function createCustomizeModal() {
  const modal = document.createElement('div');
  modal.id = 'customize-modal';
  modal.className = 'modal';
  modal.innerHTML = '<div class="modal-content"></div>';
  document.body.appendChild(modal);
  return modal;
}

function updateMerchOptions() {
  const merchType = document.getElementById('merchType').value;
  const sizeGroup = document.getElementById('sizeGroup');
  const sizeSelect = document.getElementById('merchSize');

  if (!merchType) {
    sizeGroup.style.display = 'none';
    return;
  }

  const merch = MERCHANDISE_TYPES.find(m => m.id === merchType);
  if (merch) {
    sizeSelect.innerHTML = merch.sizes
      .map(s => `<option value="${s}">${s}</option>`)
      .join('');
    sizeGroup.style.display = 'flex';
  }
}

function addCustomMerchToCart(quote, pieceTitle) {
  const merchType = document.getElementById('merchType').value;
  const size = document.getElementById('merchSize').value;
  const color = document.getElementById('merchColor').value;
  const qty = parseInt(document.getElementById('merchQty').value) || 1;

  if (!merchType || !size || !color) {
    alert('Please select all options');
    return;
  }

  const merch = MERCHANDISE_TYPES.find(m => m.id === merchType);
  const customId = `custom-${Date.now()}`;

  const item = {
    id: customId,
    title: `${merch.name} - "${quote}"`,
    pieceTitle: pieceTitle,
    type: merchType,
    size: size,
    color: color,
    price: merch.price,
    quantity: qty,
    isCustom: true,
    quote: quote
  };

  cart.push(item);
  saveCart();
  updateCartUI();
  closeModal('customize-modal');
  alert(`Added to cart! ${merch.name} - ${size} - ${color}`);
}

// ===========================
// OBSERVER
// ===========================
function initFadeInObserver() {
  const sections = document.querySelectorAll('.content-section');
  if (!sections.length || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  sections.forEach(section => observer.observe(section));
}

// ===========================
// STORE RENDERING
// ===========================
function renderStore(category = 'all') {
  const storeGrid = document.getElementById('store-grid');
  if (!storeGrid) return;

  const filtered =
    category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(product => product.category === category);

  storeGrid.innerHTML = filtered
    .map(
      product => `
      <div class="store-card" data-category="${product.category}">
        <img src="${product.image}" alt="${product.title}" class="store-card-image" onerror="this.style.display='none'">
        <div class="store-card-content">
          <h3>${product.title}</h3>
          <p class="store-card-category">${product.category === 'print' ? 'Print' : 'Digital Edition'}</p>
          <p class="store-card-price">$${product.price.toFixed(2)}</p>
          <p class="store-card-description">${product.description}</p>
          <button class="btn-primary" onclick="openProductModal(${product.id})">View Details</button>
        </div>
      </div>
    `
    )
    .join('');
}

function filterStore(category, clickedBtn = null) {
  renderStore(category);

  document.querySelectorAll('.store .filter-btn').forEach(btn => {
    btn.classList.remove('active', 'filter-active');
  });

  if (clickedBtn) {
    clickedBtn.classList.add('active', 'filter-active');
  }
}

// ===========================
// PRODUCT MODAL
// ===========================
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal') || createProductModal();

  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal('product-modal')">×</button>
    <div class="modal-body">
      <img src="${product.image}" alt="${product.title}" style="width:100%;max-width:400px;margin-bottom:1rem;" onerror="this.style.display='none'">
      <h2>${product.title}</h2>
      <p class="modal-category">${product.category === 'print' ? 'Print' : 'Digital Download'}</p>
      <p class="modal-price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;

  modal.style.display = 'flex';
}

function createProductModal() {
  const modal = document.createElement('div');
  modal.id = 'product-modal';
  modal.className = 'modal';
  modal.innerHTML = '<div class="modal-content"></div>';
  document.body.appendChild(modal);
  return modal;
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// ===========================
// CART
// ===========================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId && !item.isCustom);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  closeModal('product-modal');
  alert(`${product.title} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartCountBar = document.getElementById('cart-count-bar');
  const cartTotalBar = document.getElementById('cart-total-bar');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCountBar) {
    cartCountBar.textContent = totalItems;
  }
  if (cartTotalBar) {
    cartTotalBar.textContent = total.toFixed(2);
  }

  renderCartModal();
}

function renderCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center;color:#999;">Your cart is empty</p>';
    cartTotal.textContent = '$0.00';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartItems.innerHTML = cart
    .map(
      (item, idx) => `
      <div class="cart-item">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          ${item.isCustom ? `
            <p style="font-size: 0.75rem; color: var(--gold);">Type: ${item.type} | Size: ${item.size} | Color: ${item.color}</p>
          ` : ''}
          <p>Qty: <input type="number" min="1" max="100" value="${item.quantity}" onchange="updateCartQuantity(${idx}, this.value)" style="width: 50px;"></p>
          <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${idx})">Remove</button>
      </div>
    `
    )
    .join('');

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartQuantity(index, newQty) {
  const qty = parseInt(newQty);
  if (qty > 0) {
    cart[index].quantity = qty;
    saveCart();
    updateCartUI();
  }
}

function openCart() {
  const cartModal = document.getElementById('cart-modal') || createCartModal();
  renderCartModal();
  cartModal.style.display = 'flex';
}

function createCartModal() {
  const modal = document.createElement('div');
  modal.id = 'cart-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal('cart-modal')">×</button>
      <h2>Shopping Cart</h2>
      <div id="cart-items"></div>
      <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1rem;">
        <h3>Total: <span id="cart-total">$0.00</span></h3>
      </div>
      <button class="btn-primary" style="width: 100%; margin-top: 1rem;" onclick="checkout()">Proceed to Checkout</button>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

// ===========================
// STRIPE CHECKOUT
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

  // Load Stripe
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.onload = initStripeCheckout;
  document.head.appendChild(script);
}

function initStripeCheckout() {
  const stripe = Stripe(STRIPE_PUBLIC_KEY);
  
  const items = cart.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        description: item.isCustom ? `Quote: ${item.quote}` : item.description
      },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.quantity
  }));

  fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: items, userEmail: currentUser.email })
  })
    .then(res => res.json())
    .then(session => stripe.redirectToCheckout({ sessionId: session.id }))
    .catch(err => alert('Checkout error: ' + err.message));
}

// ===========================
// LOGIN
// ===========================
function openLoginModal() {
  const loginModal = document.getElementById('login-modal') || createLoginModal();
  loginModal.style.display = 'flex';
}

function createLoginModal() {
  const modal = document.createElement('div');
  modal.id = 'login-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal('login-modal')">×</button>
      <h2>Login</h2>
      <button class="btn-primary" style="width: 100%; margin-bottom: 1rem;" onclick="loginWithGoogle()">Sign in with Google</button>
      <p style="text-align: center; color: var(--muted);">or</p>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="loginEmail" placeholder="your@email.com">
      </div>
      <button class="btn-secondary" style="width: 100%;" onclick="loginWithEmail()">Continue with Email</button>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function loginWithGoogle() {
  // TODO: Implement Google OAuth
  alert('Google OAuth with 2FA will be implemented here');
  currentUser = { name: 'User', email: 'user@example.com' };
  closeModal('login-modal');
  updateUserUI();
}

function loginWithEmail() {
  const email = document.getElementById('loginEmail').value;
  if (!email) {
    alert('Please enter an email');
    return;
  }
  currentUser = { name: email.split('@')[0], email: email };
  closeModal('login-modal');
  updateUserUI();
  localStorage.setItem('sacredWoundsUser', JSON.stringify(currentUser));
}

function logout() {
  currentUser = null;
  updateUserUI();
  localStorage.removeItem('sacredWoundsUser');
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
    
    // Try to load saved user
    const saved = localStorage.getItem('sacredWoundsUser');
    if (saved) {
      try {
        currentUser = JSON.parse(saved);
        updateUserUI();
      } catch (e) {
        // Continue
      }
    }
  }
}

// ===========================
// WITNESS WALL / CONFESSION CARDS
// ===========================
function renderConfessionWall() {
  const wallGrid = document.getElementById('cardGrid');
  if (!wallGrid) return;

  const filtered =
    currentFilter === 'all'
      ? CONFESSION_CARDS
      : CONFESSION_CARDS.filter(card => card.category === currentFilter);

  wallGrid.innerHTML = filtered
    .map(
      (card, idx) => `
      <div class="flip-card" data-card-idx="${idx}" data-category="${card.category}">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <p class="card-quote">${card.front}</p>
          </div>
          <div class="flip-card-back">
            <p class="card-meaning">${card.back}</p>
            <div class="card-needed">
              <span class="needed-label">The Plain, Unbiased Truth</span>
              <p>${card.needed}</p>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

function setupFlipCardListeners() {
  document.addEventListener('click', e => {
    const flipCard = e.target.closest('.flip-card');
    if (flipCard) {
      const inner = flipCard.querySelector('.flip-card-inner');
      if (inner) {
        inner.classList.toggle('flipped');
      }
    }
  });
}

function filterConfessionCards(category, clickedBtn = null) {
  currentFilter = category;
  renderConfessionWall();

  document.querySelectorAll('.filter button, .filter .filter-btn').forEach(btn => {
    btn.classList.remove('active', 'filter-active');
  });

  if (clickedBtn) {
    clickedBtn.classList.add('active', 'filter-active');
  }
}

// ===========================
// EVENTS
// ===========================
function setupEventListeners() {
  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
    }
  });
}
