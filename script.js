const CARDS=[
{cat:'abuse',front:'"We handled this internally. There is no need to involve outside authorities."',back:'What it meant:',sub:'We chose our reputation over your safety. You were not believed.',story:'A survivor was told to forgive and stay silent. She left faith entirely.'},
{cat:'abuse',front:'"This is a private matter between you, the accused, and God."',back:'What it meant:',sub:'Accountability ends at the church door. The law does not apply here.',story:'He was moved to a different campus. The pattern continued.'},
{cat:'exclusion',front:'"We love everyone, but we cannot affirm that lifestyle."',back:'What it meant:',sub:'You may attend, but you will never fully belong. Change or remain invisible.',story:'She served in worship for 12 years before they asked her to resign.'},
{cat:'exclusion',front:'"God made you this way for a reason, but He also calls you to change."',back:'What it meant:',sub:'Your identity is both a mistake and a test. You cannot win either way.',story:'He entered a conversion program at 19. He is still unraveling it at 34.'},
{cat:'shame',front:'"Modesty protects your brothers from stumbling. That is your responsibility."',back:'What it meant:',sub:'Your body is a problem to be managed. Men\'s behavior is your burden.',story:'She was 14 when she was sent home from youth group for her dress length.'},
{cat:'shame',front:'"True purity means saving your greatest gift for your future spouse."',back:'What it meant:',sub:'Your worth is tied to your virginity. Losing it outside marriage makes you lesser.',story:'She felt permanently damaged after assault. The church had prepared her for this.'},
{cat:'doubt',front:'"If you are struggling with doubt, you just need more faith."',back:'What it meant:',sub:'Your questions are a spiritual failure. Don\'t voice them here.',story:'He asked honest theological questions. He was asked to step down from leading.'},
{cat:'doubt',front:'"We speak the truth in love, but the culture has deceived you."',back:'What it meant:',sub:'Outside knowledge is suspect. Our interpretation is the only safe one.',story:'She was discouraged from reading authors outside approved lists.'},
{cat:'money',front:'"Sow a seed of faith this weekend and activate your breakthrough."',back:'What it meant:',sub:'Give money to receive blessings. God\'s favor is transactional.',story:'An elderly widow gave $400 she could not spare. Her breakthrough never came.'},
{cat:'money',front:'"You cannot out-give God. Tithe first and watch Him provide."',back:'What it meant:',sub:'If you are poor after tithing, your faith is insufficient.',story:'A single father skipped groceries to tithe. He was praised for his obedience.'}
];

const NEEDED=[
'"I believe you. What happened to you was not okay."',
'"You are allowed to ask hard questions here."',
'"Your body belongs to you. That is not a theological negotiation."',
'"We failed you. We are sorry. Here is what we are changing."',
'"You do not have to earn belonging here."',
'"Your doubt does not make you less. It makes you honest."'
];

let active='all';
let localCards=[...CARDS];

function renderCards(){
 const grid=document.getElementById('cardGrid');
 const filtered=active==='all'?localCards:localCards.filter(c=>c.cat===active);
 grid.innerHTML=filtered.map(c=>`
 <div class="flip-card" onclick="this.classList.toggle('flipped')">
 <div class="flip-card-inner">
 <div class="flip-front">
 <span class="card-tag">${c.cat.replace('-',' ')}</span>
 <p class="card-quote">${c.front}</p>
 <span class="card-hint">hover to reveal &rarr;</span>
 </div>
 <div class="flip-back">
 <span class="card-back-label">${c.back}</span>
 <p class="card-back-text">${c.sub}</p>
 <p class="card-back-story">${c.story}</p>
 </div>
 </div>
 </div>`).join('');
}

function renderNeeded(){
 const grid=document.getElementById('neededGrid');
 grid.innerHTML=NEEDED.map(n=>`<div class="needed-card"><p>${n}</p></div>`).join('');
}

document.querySelectorAll('.filter').forEach(btn=>{
 btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active');
 active=btn.dataset.cat;
 renderCards();
 });
});

document.getElementById('submitForm').addEventListener('submit',function(e){
 e.preventDefault();
 const data=new FormData(this);
 const newCard={
 cat:data.get('category'),
 front:data.get('theySaid'),
 back:'What it really meant:',
 sub:data.get('theyMeant'),
 story:data.get('needed')||'Still waiting to hear it.'
 };
 localCards.unshift(newCard);
 renderCards();
 this.reset();
 const msg=document.getElementById('formSuccess');
 msg.style.display='block';
 setTimeout(()=>msg.style.display='none',4000);
 document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
});


// ── SCROLL FADE-IN OBSERVER ──
function initFadeIn(){
const obs=new IntersectionObserver((entries)=>{
entries.forEach(el=>{if(el.isIntersecting){el.target.classList.add('visible');obs.unobserve(el.target);}});
},{threshold:0.1});
document.querySelectorAll('.flip-card,.needed-card,.submit-inner,.about-inner,.section-header').forEach(el=>{el.classList.add('fade-in');obs.observe(el);});

// ── STORE DATA ──
const PRODUCTS=[
{id:1,type:'print',title:'Name It and Claim It',desc:'A luminous altar of golden credit cards and offering plates. Archival giclée on matte cotton rag.',size:'18 × 24 in | Edition of 50',price:'$85',color:'#C9A84C',emoji:'✨💳',bg:'#1a1500'},
{id:2,type:'print',title:'Love the Sinner',desc:'Three-panel portrait series. Translucent text strips crossing bodies in the shape of a cross. Rich charcoal and beige.',size:'11 × 17 in each | Open edition',price:'$45 each / $110 set',color:'#B81C1C',emoji:'✝️🧑',bg:'#1a0a0a'},
{id:3,type:'poster',title:'We Forgive You, But…',desc:'The phrase in bold Playfair Display, the subtext bleeding through in red beneath it. Stark, minimal, unforgettable.',size:'24 × 36 in | Open edition',price:'$35',color:'#F0EDE8',emoji:'📜🩸',bg:'#0d0d0d'},
{id:4,type:'poster',title:'Sunday Marquee No. 1',desc:'Church sign marquee in neon dusk palette. "God’s math is bad at subtraction." Screen-printed on heavyweight stock.',size:'18 × 24 in | Edition of 75',price:'$40',color:'#1E3A8A',emoji:'🚧✨',bg:'#0a0f1a'},
{id:5,type:'digital',title:'Confession Wall — Full Set',desc:'High-res digital files of all 10 confession card designs. Print at home or at a local print shop. Instant download.',size:'3000 × 4200 px each | Digital',price:'$25',color:'#888880',emoji:'🖥️📥',bg:'#111111'},
{id:6,type:'digital',title:'Sacred Wounds Zine — PDF',desc:'12-page editorial zine featuring all 5 pieces, artist notes, source phrases, and reader submissions. Print-ready PDF.',size:'8.5 × 11 in | 12 pages | Digital',price:'$12',color:'#C9A84C',emoji:'📓🔥',bg:'#141400'},
{id:7,type:'apparel',title:'"Autopsy of Language" Tee',desc:'Heavyweight 100% cotton. Front: project manifesto in small Inter type. Back: "Sacred Wounds" in large Playfair Display.',size:'Unisex S–XXL | Black or Charcoal',price:'$38',color:'#F0EDE8',emoji:'👕✒️',bg:'#141414'},
{id:8,type:'apparel',title:'"We Forgive You" Tote',desc:'Natural canvas heavyweight tote. The phrase on front, bleeding red subtext on back. Hand-screened, limited run.',size:'15 × 16 in | Natural canvas',price:'$28',color:'#B81C1C',emoji:'🛍️🟥',bg:'#1a0a0a'},
{id:9,type:'print',title:'Holier Than Thou',desc:'Mirrored baptismal font with purity culture phrases shredded at the base. Photo documentation of the sculpture.',size:'16 × 20 in | Edition of 30',price:'$95',color:'#1E3A8A',emoji:'🔮🪩',bg:'#0a0f1a'},
{id:10,type:'poster',title:'The Offering Plate',desc:'A tithe envelope filled with the receipts of spiritual debt. Minimal, devastating. Gold foil stamp on black.',size:'11 × 17 in | Edition of 100',price:'$42',color:'#C9A84C',emoji:'🧧💰',bg:'#141400'}
];

let cart=[];
let activeStore='all';

function renderStore(){
const grid=document.getElementById('storeGrid');
if(!grid)return;
const filtered=activeStore==='all'?PRODUCTS:PRODUCTS.filter(p=>p.type===activeStore);
grid.innerHTML=filtered.map(p=>`
<div class="store-card fade-in" onclick="openModal(${p.id})" style="border-top:3px solid ${p.color}">
<div class="store-card-img" style="background:${p.bg}">${p.emoji}</div>
<div class="store-card-body">
<p class="store-card-type">${p.type}</p>
<h3 class="store-card-title">${p.title}</h3>
<p class="store-card-price">From <span>${p.price}</span></p>
</div>
</div>`).join('');
if(typeof initFadeIn==='function')initFadeIn();
}

function openModal(id){
const p=PRODUCTS.find(x=>x.id===id);
if(!p)return;
document.getElementById('modalImg').textContent=p.emoji;
document.getElementById('modalImg').style.background=p.bg;
document.getElementById('modalCat').textContent=p.type;
document.getElementById('modalTitle').textContent=p.title;
document.getElementById('modalDesc').textContent=p.desc;
document.getElementById('modalSize').textContent=p.size;
document.getElementById('modalPrice').textContent=p.price;
document.getElementById('modalBuy').onclick=()=>addToCart(p);
document.getElementById('storeModal').classList.add('open');
document.body.style.overflow='hidden';
}

function closeModal(){
document.getElementById('storeModal').classList.remove('open');
document.body.style.overflow='';
}

function addToCart(p){
cart.push(p);
closeModal();
updateCart();
}

function updateCart(){
const bar=document.getElementById('cartBar');
const count=document.getElementById('cartCount');
if(cart.length>0){
bar.classList.add('visible');
const total=cart.reduce((s,p)=>s+parseFloat(p.price.replace(/[^0-9.]/g,'')),0);
count.textContent=`${cart.length} item${cart.length>1?'s':''} — $${total.toFixed(2)}`;
}else{bar.classList.remove('visible');}
}

document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('storeModal').addEventListener('click',function(e){if(e.target===this)closeModal();});

document.getElementById('cartCheckout').addEventListener('click',()=>{
const items=cart.map(p=>`${p.title} (${p.price})`).join(', ');
window.location.href=`mailto:sacredwoundsart@gmail.com?subject=Order from Sacred Wounds&body=I would like to order:%0A${encodeURIComponent(items)}%0A%0AName:%0AShipping address:%0ANotes:`;
});

document.querySelectorAll('.store-filter').forEach(btn=>{
btn.addEventListener('click',()=>{
document.querySelectorAll('.store-filter').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
activeStore=btn.dataset.type;
renderStore();
});
});

renderStore();
}
renderCards();
renderNeeded();
initFadeIn();
