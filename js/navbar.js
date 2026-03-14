const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menu = document.getElementById("menu_list");

function showMenu() {
  menu.style.display = "flex";
  closeBtn.style.display = "block";
  menuBtn.style.display = "none";
}

function closeMenu() {
  menu.style.display = "none";
  closeBtn.style.display = "none";
  menuBtn.style.display = "block";
}

// ------- For Slides Functionality ---------
const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

nextBtn.addEventListener("click", () => {
  if (index >= images.length - 1) {
    index = 0;
  } else {
    index++;
  }
  slides.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener("click", () => {
  if (index <= 0) {
    index = images.length - 1;
  } else {
    index--;
  }
  slides.style.transform = `translateX(-${index * 100}%)`;
});

let autoSlide = setInterval(nextSlide, 3000);

function nextSlide() {
  if (index >= images.length - 1) {
    index = 0;
  } else {
    index++;
  }
  slides.style.transform = `translateX(-${index * 100}%)`;
}

slider.addEventListener("mouseover", () => {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseout", () => {
  autoSlide = setInterval(nextSlide, 3000);
});

/**
 * =======================================
 * INITIALIZATION
 * =======================================
 * This code runs after the entire page structure (DOM) is loaded.
 */

// Selecting Contact Form and Form Status
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

document.addEventListener('DOMContentLoaded', () => {
 
  // --- ASYNCHRONOUS FORM SUBMISSION ---
  // Check if the contact form exists on the page before adding the listener.
  if(contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      const formData = new FormData(contactForm);
      const submitbutton = document.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info';
      formStatus.style.display = 'block'
      submitbutton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if(response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
         // Re-enable the submit button regardless of success or failure.
         submitbutton.disabled = false;
      })
    });
  }
});
