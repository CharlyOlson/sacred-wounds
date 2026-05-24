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

renderCards();
renderNeeded();
