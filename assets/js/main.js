/* ============================================
   Yuvraj Devasr — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Shared Elements ---
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const reveals = document.querySelectorAll('.reveal');

  // ==========================================
  // 1. NAVBAR SCROLL EFFECT
  // ==========================================
  if (nav) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ==========================================
  // 2. MOBILE MENU
  // ==========================================
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // 3. SCROLL REVEAL ANIMATIONS
  // ==========================================
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ==========================================
  // 4. STAT COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current + (el.dataset.suffix || '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ==========================================
  // 5. GALLERY — Clean Layout Rendering
  // ==========================================
  const gallerySections = document.querySelectorAll('.gallery-section');
  if (gallerySections.length) {
    let lightboxData = { categoryId: null, images: [], index: 0 };

    function imgSrc(categoryId, img) {
      return img.startsWith('http') ? img : `assets/images/gallery/${categoryId}/${img}`;
    }

    function imgWrap(src, alt, idx, categoryId) {
      return `<div class="gallery-img-wrap" data-index="${idx}" data-category="${categoryId}">
        <img src="${src}" alt="${alt}" loading="lazy">
      </div>`;
    }

    // --- Layout: Feature Row (3 images) — 1 wide + 2 below ---
    function renderFeatureRow(category) {
      const imgs = category.images;
      return `
        <div class="gallery-section-header">
          <span class="section-label">${category.label}</span>
          <h2>Cinematic Love Stories</h2>
        </div>
        <div class="layout-feature-row">
          ${imgWrap(imgSrc(category.id, imgs[0]), `${category.label} — 1`, 0, category.id)}
          <div class="feature-row-sub">
            ${imgWrap(imgSrc(category.id, imgs[1]), `${category.label} — 2`, 1, category.id)}
            ${imgWrap(imgSrc(category.id, imgs[2]), `${category.label} — 3`, 2, category.id)}
          </div>
        </div>`;
    }

    // --- Layout: 2×2 Grid (4 images) ---
    function renderGrid2x2(category) {
      const imgs = category.images;
      return `
        <div class="gallery-section-header">
          <span class="section-label">${category.label}</span>
          <h2>The Grand Affair</h2>
        </div>
        <div class="layout-grid-2x2">
          ${imgs.map((img, i) => imgWrap(imgSrc(category.id, img), `${category.label} — ${i + 1}`, i, category.id)).join('')}
        </div>`;
    }

    // --- Layout: Row of 3 (3 images) ---
    function renderRow3(category) {
      const imgs = category.images;
      return `
        <div class="gallery-section-header">
          <span class="section-label">${category.label}</span>
          <h2>Ever After</h2>
        </div>
        <div class="layout-row-3">
          ${imgs.map((img, i) => imgWrap(imgSrc(category.id, img), `${category.label} — ${i + 1}`, i, category.id)).join('')}
        </div>`;
    }

    // --- Layout: Split (3 images) — 2-up + 1 wide below ---
    function renderSplit(category) {
      const imgs = category.images;
      return `
        <div class="gallery-section-header">
          <span class="section-label">${category.label}</span>
          <h2>Joyful Beginnings</h2>
        </div>
        <div class="layout-split">
          <div class="split-pair">
            ${imgWrap(imgSrc(category.id, imgs[0]), `${category.label} — 1`, 0, category.id)}
            ${imgWrap(imgSrc(category.id, imgs[1]), `${category.label} — 2`, 1, category.id)}
          </div>
          ${imgWrap(imgSrc(category.id, imgs[2]), `${category.label} — 3`, 2, category.id)}
        </div>`;
    }

    // --- Layout: 2×2 Grid with Play overlay (4 images) ---
    function renderGrid2x2Play(category) {
      const imgs = category.images;
      return `
        <div class="gallery-section-header">
          <span class="section-label">${category.label}</span>
          <h2>Stories in Motion</h2>
        </div>
        <div class="layout-grid-2x2-play">
          ${imgs.map((img, i) => `
            <div class="gallery-img-wrap" data-index="${i}" data-category="${category.id}">
              <img src="${imgSrc(category.id, img)}" alt="${category.label} — ${i + 1}" loading="lazy">
              <div class="play-overlay">
                <span class="play-icon">&#9654;</span>
              </div>
            </div>
          `).join('')}
        </div>`;
    }

    // Map layouts
    const layoutFn = {
      'feature-row': renderFeatureRow,
      'grid-2x2': renderGrid2x2,
      'row-3': renderRow3,
      'split': renderSplit,
      'grid-2x2-play': renderGrid2x2Play,
    };

    // Render all sections
    const allImages = {};
    gallerySections.forEach(section => {
      const catId = section.dataset.category;
      const layout = section.dataset.layout;
      const category = galleryData.find(c => c.id === catId);
      if (!category) return;
      allImages[catId] = category.images;
      const fn = layoutFn[layout];
      const inner = section.querySelector('.gallery-section-inner');
      if (inner && fn) {
        inner.innerHTML = fn(category);
      }
    });

    // Shared lightbox click
    document.addEventListener('click', e => {
      const wrap = e.target.closest('.gallery-img-wrap');
      if (!wrap) return;
      const catId = wrap.dataset.category;
      const idx = parseInt(wrap.dataset.index, 10);
      if (!allImages[catId]) return;
      lightboxData = { categoryId: catId, images: allImages[catId], index: idx };
      openLightbox();
    });

    // Staggered reveal for images
    const imgWraps = document.querySelectorAll('.gallery-img-wrap');
    if (imgWraps.length) {
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const wrap = entry.target;
            wrap.style.opacity = '0';
            wrap.style.transform = 'translateY(30px)';
            const delay = parseInt(wrap.dataset.index, 10) * 80;
            setTimeout(() => {
              wrap.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              wrap.style.opacity = '1';
              wrap.style.transform = 'translateY(0)';
            }, delay);
            imgObserver.unobserve(wrap);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

      imgWraps.forEach(w => imgObserver.observe(w));
    }
  }

  // ==========================================
  // 6. LIGHTBOX
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
  const lightboxCounter = lightbox ? lightbox.querySelector('.lightbox-counter') : null;

  function openLightbox() {
    const { categoryId, images, index } = lightboxData;
    if (!lightbox || !lightboxImg || !images.length) return;

    const category = galleryData.find(c => c.id === categoryId);
    if (!category) return;

    const imgPath = images[index].startsWith('http')
      ? images[index]
      : `assets/images/gallery/${categoryId}/${images[index]}`;
    lightboxImg.src = imgPath;
    lightboxImg.alt = `${category.label} — ${index + 1}`;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function getImagePath(categoryId, imageName) {
    return imageName.startsWith('http') ? imageName : `assets/images/gallery/${categoryId}/${imageName}`;
  }

  function prevImage() {
    const { categoryId, images } = lightboxData;
    lightboxData.index = (lightboxData.index - 1 + images.length) % images.length;
    const category = galleryData.find(c => c.id === categoryId);
    if (!category) return;
    lightboxImg.src = getImagePath(categoryId, images[lightboxData.index]);
    lightboxImg.alt = `${category.label} — ${lightboxData.index + 1}`;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${lightboxData.index + 1} / ${images.length}`;
    }
  }

  function nextImage() {
    const { categoryId, images } = lightboxData;
    lightboxData.index = (lightboxData.index + 1) % images.length;
    const category = galleryData.find(c => c.id === categoryId);
    if (!category) return;
    lightboxImg.src = getImagePath(categoryId, images[lightboxData.index]);
    lightboxImg.alt = `${category.label} — ${lightboxData.index + 1}`;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${lightboxData.index + 1} / ${images.length}`;
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

  // Close on overlay click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // ==========================================
  // 7. SLIDESHOW (Home)
  // ==========================================
  const slideshow = document.getElementById('slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.slideshow-slide');
    const dots = slideshow.querySelectorAll('.slideshow-dot');
    const prevBtn = slideshow.querySelector('.slideshow-prev');
    const nextBtn = slideshow.querySelector('.slideshow-next');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.slide, 10));
        startAutoplay();
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

    slideshow.addEventListener('mouseenter', stopAutoplay);
    slideshow.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // ==========================================
  // 8. ACTIVE NAV LINK
  // ==========================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

});
