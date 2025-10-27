// ===== Initialize AOS Animation =====
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// ===== Portfolio Lightbox =====
function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
  }
}

// ===== Design Preview Tool =====
document.addEventListener('DOMContentLoaded', function() {
  const logoUpload = document.getElementById('logoUpload');
  const uploadedLogo = document.getElementById('uploadedLogo');
  const logoOverlay = document.getElementById('logoOverlay');
  const logoSize = document.getElementById('logoSize');
  const positionBtns = document.querySelectorAll('.position-btn');
  const uploadArea = document.getElementById('uploadArea');

  // Handle logo upload
  if (logoUpload) {
    logoUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
          uploadedLogo.src = event.target.result;
          uploadedLogo.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Drag and drop
  if (uploadArea) {
    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      uploadArea.style.borderColor = '#fdd835';
    });

    uploadArea.addEventListener('dragleave', function() {
      uploadArea.style.borderColor = 'rgba(253, 216, 53, 0.3)';
    });

    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadArea.style.borderColor = 'rgba(253, 216, 53, 0.3)';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
          uploadedLogo.src = event.target.result;
          uploadedLogo.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Logo size control
  if (logoSize) {
    logoSize.addEventListener('input', function() {
      const size = this.value;
      uploadedLogo.style.width = size + 'px';
    });
  }

  // Position controls
  positionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      positionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const position = this.dataset.position;
      if (position === 'center') {
        logoOverlay.style.top = '50%';
        logoOverlay.style.left = '50%';
      } else if (position === 'left') {
        logoOverlay.style.top = '30%';
        logoOverlay.style.left = '25%';
      } else if (position === 'back') {
        logoOverlay.style.top = '40%';
        logoOverlay.style.left = '50%';
      }
    });
  });
});


// ===== Razorpay Payment Integration =====
const rzpButton = document.getElementById('rzp-button');

if (rzpButton) {
  rzpButton.addEventListener('click', function() {
    const options = {
      key: 'rzp_test_RXwPDqzSKdDuWh', // Replace with your Razorpay Key ID
      amount: 49900, // Amount in paise (₹499 = 49900 paise)
      currency: 'INR',
      name: 'Branded Tees',
      description: 'Sample T-shirt Order',
      image: 'images/logo.png',
      handler: function(response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        // Send payment details to your server here
        window.location.href = 'thankyou.html';
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#fdd835'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
}


// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Testimonials Carousel =====
document.addEventListener('DOMContentLoaded', function() {
  let testimonialIndex = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let autoSlideTimer;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
  }

  function nextSlide() {
    testimonialIndex = (testimonialIndex + 1) % slides.length;
    showSlide(testimonialIndex);
  }

  function prevSlide() {
    testimonialIndex = (testimonialIndex - 1 + slides.length) % slides.length;
    showSlide(testimonialIndex);
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
      testimonialIndex = index;
      showSlide(index);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  const wrapper = document.querySelector('.testimonials-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
  }

  showSlide(0);
  startAutoSlide();
});

// ===== Contact Form Submission =====
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('formMessage');
const submitButton = document.getElementById('submitButton');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        window.location.href = 'thankyou.html';
      } else {
        formMessage.textContent = 'Oops! Something went wrong. Please try again.';
        formMessage.style.color = '#ff5555';
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Request';
      }
    } catch (error) {
      formMessage.textContent = 'Network error. Please check your connection.';
      formMessage.style.color = '#ff5555';
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Request';
    }
  });
}

// ===== Trusted Logos Carousel Pause on Hover =====
const track = document.querySelector('.carousel-track');
if (track) {
  track.addEventListener('mouseover', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseout', () => {
    track.style.animationPlayState = 'running';
  });
}
