// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Gestão de Vídeo de Fundo HTML5
  const videoElement = document.getElementById('background-video');
  const fallbackImage = document.querySelector('.fallback-image');
  
  if (videoElement) {
    // Verificar se o vídeo carregou com sucesso
    videoElement.addEventListener('loadeddata', function() {
      // Adiciona classe para ocultar a imagem de fallback
      document.documentElement.classList.add('video-loaded');
      console.log("Vídeo carregado com sucesso");
    });
    
    // Tratamento de erros - se o vídeo falhar, mantenha a imagem fallback
    videoElement.addEventListener('error', function() {
      console.log("Erro ao carregar o vídeo, usando imagem fallback");
    });
    
    // Força play em iOS (pode ser necessário após interação do usuário)
    document.addEventListener('touchstart', function() {
      videoElement.play();
    }, {once: true});
    
    // Detecta se é mobile para adicionar classe específica 
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.classList.add('mobile-video');
    }
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Marcas animadas - controle de performance
  const marcasSection = document.querySelector(".marcas-section");
  if (marcasSection) {
    const marcasTrackLeft = document.querySelector(".marcas-track-left");
    const marcasTrackRight = document.querySelector(".marcas-track-right");

    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    // Função para pausar ou retomar animações com base na visibilidade
    function toggleAnimations() {
      if (isElementInViewport(marcasSection)) {
        if (marcasTrackLeft)
          marcasTrackLeft.style.animationPlayState = "running";
        if (marcasTrackRight)
          marcasTrackRight.style.animationPlayState = "running";
      } else {
        if (marcasTrackLeft)
          marcasTrackLeft.style.animationPlayState = "paused";
        if (marcasTrackRight)
          marcasTrackRight.style.animationPlayState = "paused";
      }
    }

    // Verificar no carregamento da página e no scroll
    toggleAnimations();
    window.addEventListener("scroll", toggleAnimations);
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-question");

  faqItems.forEach((item) => {
    item.addEventListener("click", function () {
      const parent = this.closest(".faq-item");
      parent.classList.toggle("active");

      // Close other FAQ items
      faqItems.forEach((otherItem) => {
        const otherParent = otherItem.closest(".faq-item");
        if (otherParent !== parent) {
          otherParent.classList.remove("active");
        }
      });
    });
  });

  // Expandable service boxes functionality
  const servicoItems = document.querySelectorAll(
    ".servico-especial.expandable"
  );

  servicoItems.forEach((item) => {
    // Get the header part of each item
    const header = item.querySelector(".servico-header");

    // Add click event only to the header
    header.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent bubbling

      // Toggle active class on the parent item
      const parent = this.closest(".servico-especial");
      parent.classList.toggle("active");

      // Close other service items
      servicoItems.forEach((otherItem) => {
        if (otherItem !== parent) {
          otherItem.classList.remove("active");
        }
      });
    });
  });

  // Initialize Reviews Slider
  const reviewsSlider = new Swiper(".reviews-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Desktop
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Initialize Team Slider
  const teamSlider = new Swiper(".team-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });

  // Initialize Marcas Slider
  const marcasSlider = new Swiper(".marcas-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Desktop
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar.getBoundingClientRect().height;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add animation on scroll
  const animateElements = document.querySelectorAll(
    ".about-image, .team-image, .servico-especial, .faq-item, .feature"
  );

  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;

    animateElements.forEach((element) => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = elementTopPosition + elementHeight;

      // Check if element is in viewport
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        element.classList.add("animate");
      }
    });
  }

  // Initial check on page load
  setTimeout(checkIfInView, 100);

  // Check on scroll
  window.addEventListener("scroll", checkIfInView);
}); 