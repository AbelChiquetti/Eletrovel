// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // YouTube Video Background Implementation
  function loadYouTubeVideo() {
    // Verifica se está em dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // IDs dos vídeos para desktop e mobile
    const desktopVideoId = "DoITINgRlNg"; // ID do vídeo para desktop
    const mobileVideoId = "72-4Wxokmfc";  // ID do vídeo para mobile
    
    // Seleciona o ID do vídeo com base no dispositivo
    const videoId = isMobile ? mobileVideoId : desktopVideoId;
    
    // Cria o player do YouTube quando a API estiver pronta
    if (typeof YT !== 'undefined' && YT.Player) {
      createYouTubePlayer(videoId, isIOS);
    } else {
      // Caso a API ainda não esteja carregada, adiciona callback
      window.onYouTubeIframeAPIReady = function() {
        createYouTubePlayer(videoId, isIOS);
      };
      
      // Carrega a API do YouTube se ainda não estiver carregada
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
  }
  
  // Função para criar o player do YouTube
  function createYouTubePlayer(videoId, isIOS) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Ajusta as proporções do player dependendo do dispositivo
    const playerOptions = {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        loop: 1,
        playlist: videoId,
        mute: 1, // Sempre mudo
        playsinline: 1, // Importante para iOS
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    };
    
    // Para iOS, também é necessário um toque do usuário para iniciar mídia
    if (isIOS) {
      // Criar uma camada transparente para detectar interação
      const interactionLayer = document.createElement('div');
      interactionLayer.className = 'ios-interaction-layer';
      interactionLayer.style.position = 'absolute';
      interactionLayer.style.top = '0';
      interactionLayer.style.left = '0';
      interactionLayer.style.width = '100%';
      interactionLayer.style.height = '100%';
      interactionLayer.style.zIndex = '100';
      interactionLayer.style.cursor = 'pointer';
      
      const videoHero = document.querySelector('.video-hero');
      if (videoHero) {
        videoHero.appendChild(interactionLayer);
        
        // Evento de toque para iniciar o vídeo
        interactionLayer.addEventListener('touchstart', function() {
          // Cria o player somente após a interação do usuário
          const player = new YT.Player('youtube-player', playerOptions);
          
          // Remove a camada de interação após o primeiro toque
          setTimeout(function() {
            interactionLayer.style.display = 'none';
          }, 1000);
          
          // Adiciona classe para estilos específicos mobile
          if (isMobile) {
            document.body.classList.add('mobile-video');
          }
          
          document.documentElement.classList.add('youtube-loaded');
        }, {once: true});
      }
    } else {
      // Para não-iOS, criar o player normalmente
      const player = new YT.Player('youtube-player', playerOptions);
      
      // Adiciona classe para estilos específicos mobile
      if (isMobile) {
        document.body.classList.add('mobile-video');
      }
    }
  }
  
  // Quando o player estiver pronto
  function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute(); // Garante que esteja mudo
    document.documentElement.classList.add('youtube-loaded');
    
    // Em iOS, às vezes precisamos tentar reproduzir várias vezes
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      const playInterval = setInterval(function() {
        if (event.target.getPlayerState() !== YT.PlayerState.PLAYING) {
          event.target.playVideo();
        } else {
          clearInterval(playInterval);
        }
      }, 300);
      
      // Limpar o intervalo após 5 segundos de qualquer maneira
      setTimeout(function() {
        clearInterval(playInterval);
      }, 5000);
    }
  }
  
  // Monitora mudanças de estado do player
  function onPlayerStateChange(event) {
    // Se o vídeo parar, reinicia
    if (event.data === YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
    
    // Se o vídeo pausar, tenta reiniciar (para iOS)
    if (event.data === YT.PlayerState.PAUSED) {
      event.target.playVideo();
    }
  }
  
  // Inicia o carregamento do vídeo
  loadYouTubeVideo();

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