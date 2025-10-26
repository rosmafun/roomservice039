// script.js



function changeNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    const navbarLinks = document.querySelectorAll('.navbar ul a');
    const merchanLink = document.querySelector('.nav-link.merchan');
    const scrollOffset = window.scrollY;

    if (scrollOffset > 50) { 
        navbar.classList.add('scrolled');
        logo.src = 'images/Logo-Clubhouse-blanco.png'; 

        navbarLinks.forEach(link => {
            link.classList.add('scrolled-link');
        });

        if (merchanLink) {
            merchanLink.classList.remove('merchan');
        }
    } else {
        navbar.classList.remove('scrolled');
        logo.src = 'images/Logo-Clubhouse-negro.png'; 

        navbarLinks.forEach(link => {
            link.classList.remove('scrolled-link');
        });

        if (merchanLink) {
            merchanLink.classList.add('merchan');
        }
    }
}

window.addEventListener('scroll', changeNavbarOnScroll);


function changeNavbarOnScroll2() {
    const navbar2 = document.querySelector('.navbar-mobile');
    const logo2 = document.querySelector('.logo-mobile');
    const hamburger = document.querySelector('.hamburger');
    const navbarLinks2 = document.querySelectorAll('.navbar-mobile ul a');
    const merchanLink2 = document.querySelector('.nav-link.merchan');
    const scrollOffset2 = window.scrollY;

    if (scrollOffset2 > 50) { 
        navbar2.classList.add('scrolled');
        logo2.src = 'images/Logo-Clubhouse-blanco.png'; 
        hamburger.src = 'images/white-hamburger.svg';

        navbarLinks2.forEach(link => {
            link.classList.add('scrolled-link');
        });

        if (merchanLink2) {
            merchanLink.classList.remove('merchan');
        }
    } else {
        navbar2.classList.remove('scrolled');
        logo2.src = 'images/Logo-Clubhouse-negro.png'; 
        hamburger.src = 'images/hamburger.svg';

        navbarLinks2.forEach(link => {
            link.classList.remove('scrolled-link');
        });

        if (merchanLink2) {
            merchanLink2.classList.add('merchan');
        }
    }
}

window.addEventListener('scroll', changeNavbarOnScroll2);

//change navmar on scroll for clubhouse


document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-links');
  const overlayClose = document.getElementById('overlay-close');

  navbarToggle.addEventListener('click', function() {
    overlay.classList.toggle('active');
  });

  overlayClose.addEventListener('click', function() {
    overlay.classList.remove('active');
  });
});
 