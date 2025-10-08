const navLinks = document.getElementById("navLinks");
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");

// Toggle mobile menu
function showMenu() {
  navLinks.style.right = "0";
  menuIcon.style.display = "none";
  closeIcon.style.display = "block";
  navLinks.focus(); // Improve accessibility
}

function hideMenu() {
  navLinks.style.right = "-200px";
  menuIcon.style.display = "block";
  closeIcon.style.display = "none";
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Handle form submissions (contact and comment forms)
function handleFormSubmission(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {};
      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      form.querySelectorAll('.error-message').forEach(el => el.remove());

      formData.forEach((value, key) => {
        data[key] = value.trim();
        const input = form.querySelector(`[name="${key}"]`);
        if (!data[key]) {
          isValid = false;
          input.classList.add('error');
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = `Please fill out the ${key} field.`;
          input.parentNode.insertBefore(errorMsg, input.nextSibling);
        } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[key])) {
          isValid = false;
          input.classList.add('error');
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'Please enter a valid email address.';
          input.parentNode.insertBefore(errorMsg, input.nextSibling);
        }
      });

      if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual AJAX if needed)
        setTimeout(() => {
          console.log('Form submitted:', data);
          alert('Form submitted successfully!');
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1000);
      }
    });
  }
}

// Testimonial carousel
function setupTestimonialCarousel() {
  const testimonials = document.querySelectorAll('.testimonials-col');
  if (testimonials.length === 0) return;

  let currentIndex = 0;
  const intervalTime = 5000; // 5 seconds

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'flex' : 'none';
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  // Initially show only the first testimonial
  showTestimonial(currentIndex);

  // Auto-rotate testimonials
  setInterval(nextTestimonial, intervalTime);
}

// Initialize on page load
window.onload = () => {
  // Hide close icon initially
  closeIcon.style.display = "none";

  // Add keyboard accessibility to menu icons
  menuIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showMenu();
    }
  });
  closeIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hideMenu();
    }
  });

  // Handle form submissions for contact and comment forms
  handleFormSubmission('contact-form');
  handleFormSubmission('comment-form');

  // Setup testimonial carousel
  setupTestimonialCarousel();
};