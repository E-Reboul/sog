/* SLIDE IMAGE PRESENTATION */

let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

showSlides();
function currentSlide(index) {
     slideIndex = index;
     showSlides();
}
function plusSlides(step) {
  
  if(step < 0) {
      slideIndex -= 2;
      
      if(slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
  }
  
  showSlides();
}
function showSlides() {
  for(let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove('active');
  }
  slideIndex++;
  if(slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add('active');
   if(timeoutId) {
      clearTimeout(timeoutId);
   }
  timeoutId = setTimeout(showSlides, 5000); // Change image every 5 seconds
}
let articlesPanier = [];
let total = 0;

function ajoutPanier(article, price) {
    let existingArticle = articlesPanier.find(item => item.article === article);

    if (existingArticle) {
        existingArticle.quantity++;
        existingArticle.price += price;
    } else {
        articlesPanier.push({ article, price, quantity: 1 });
    }
    
    total += price;
    miseAuPanier();
}

function miseAuPanier() {
    const articlesPanierElement = document.getElementById('articles-panier');
    const cartTotalElement = document.getElementById('coute');
    articlesPanierElement.innerHTML = '';

    articlesPanier.forEach(articleP => {
        const li = document.createElement('li');
        li.textContent = `${articleP.article} - ${articleP.price} € - Quantité: ${articleP.quantity}`;
        articlesPanierElement.appendChild(li);
    });

    cartTotalElement.textContent = total.toFixed(2) + " € Nombre d'articles " + articlesPanier.reduce((acc, item) => acc + item.quantity, 0);
}

function updatePaye() {
    if (articlesPanier.length === 0) {
        alert(`Vous n'avez aucun article dans votre panier. Veuillez acheter des articles avant de procéder au paiement.`);
        return -1; 
    }

    let articlesText = ''; 

    articlesPanier.forEach(articleP => {
        articlesText += `
        ${articleP.article} - ${articleP.price} - €  nombre d'articles ${articleP.quantity} \n `;
    });

    alert(`Vous avez payé un total de ${total.toFixed(2)} € pour les articles : ${articlesText}\n`);
    
    total = 0;
    articlesPanier = [];

    miseAuPanier();

    location.reload();
}
