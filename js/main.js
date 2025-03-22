document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.querySelector(".preloader")
    window.addEventListener("load", () => {
      preloader.classList.add("hidden")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    })
  
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("show")
      document.body.style.overflow = "hidden"
    })
  
    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("show")
      document.body.style.overflow = ""
    })
  
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show")
        document.body.style.overflow = ""
      })
    })
  
    // Header Scroll Effect
    const header = document.querySelector(".site-header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .hero-scroll a")
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
        if (targetId && targetId.startsWith("#") && targetId.length > 1) {
          e.preventDefault()
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            const headerHeight = header.offsetHeight
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        }
      })
    })
  
    // Hero Slider
    const heroSlides = document.querySelectorAll(".hero-slide")
    const heroDots = document.querySelectorAll(".hero-dot")
    const heroNext = document.querySelector(".hero-arrow.next")
    const heroPrev = document.querySelector(".hero-arrow.prev")
    let currentSlide = 0
    let heroInterval
  
    function showSlide(index) {
      heroSlides.forEach((slide) => slide.classList.remove("active"))
      heroDots.forEach((dot) => dot.classList.remove("active"))
  
      heroSlides[index].classList.add("active")
      heroDots[index].classList.add("active")
      currentSlide = index
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length
      showSlide(currentSlide)
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length
      showSlide(currentSlide)
    }
  
    if (heroSlides.length > 0) {
      // Initialize hero slider
      heroInterval = setInterval(nextSlide, 5000)
  
      // Hero slider controls
      heroDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          clearInterval(heroInterval)
          showSlide(index)
          heroInterval = setInterval(nextSlide, 5000)
        })
      })
  
      if (heroNext) {
        heroNext.addEventListener("click", () => {
          clearInterval(heroInterval)
          nextSlide()
          heroInterval = setInterval(nextSlide, 5000)
        })
      }
  
      if (heroPrev) {
        heroPrev.addEventListener("click", () => {
          clearInterval(heroInterval)
          prevSlide()
          heroInterval = setInterval(nextSlide, 5000)
        })
      }
    }
  
    // Destination Tabs
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-tab")
  
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        button.classList.add("active")
        document.getElementById(target).classList.add("active")
      })
    })
  
    // Experiences Carousel
    const carouselDots = document.querySelectorAll(".carousel-dot")
    const carouselNext = document.querySelector(".carousel-arrow.next")
    const carouselPrev = document.querySelector(".carousel-arrow.prev")
    const experiencesCarousel = document.querySelector(".experiences-carousel")
    const experienceCards = document.querySelectorAll(".experience-card")
    let currentCard = 0
  
    function updateCarousel() {
      const cardWidth = experienceCards[0].offsetWidth
      const gap = 30 // Gap between cards in pixels
      const scrollPosition = currentCard * (cardWidth + gap)
  
      if (experiencesCarousel) {
        experiencesCarousel.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      }
  
      carouselDots.forEach((dot, index) => {
        if (index === currentCard) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
    }
  
    if (carouselDots.length > 0) {
      carouselDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentCard = index
          updateCarousel()
        })
      })
    }
  
    if (carouselNext) {
      carouselNext.addEventListener("click", () => {
        if (currentCard < experienceCards.length - 1) {
          currentCard++
          updateCarousel()
        }
      })
    }
  
    if (carouselPrev) {
      carouselPrev.addEventListener("click", () => {
        if (currentCard > 0) {
          currentCard--
          updateCarousel()
        }
      })
    }
  
    // Tours Filter
    const filterButtons = document.querySelectorAll(".filter-btn")
    const tourCards = document.querySelectorAll(".tour-card")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter")
  
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        tourCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Testimonials Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialDots = document.querySelectorAll(".testimonial-dot")
    const testimonialNext = document.querySelector(".testimonial-arrow.next")
    const testimonialPrev = document.querySelector(".testimonial-arrow.prev")
    const testimonialTrack = document.querySelector(".testimonials-track")
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`
      }
  
      testimonialDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
  
      currentTestimonial = index
    }
  
    if (testimonialDots.length > 0) {
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index)
        })
      })
    }
  
    if (testimonialNext) {
      testimonialNext.addEventListener("click", () => {
        if (currentTestimonial < testimonialSlides.length - 1) {
          showTestimonial(currentTestimonial + 1)
        } else {
          showTestimonial(0)
        }
      })
    }
  
    if (testimonialPrev) {
      testimonialPrev.addEventListener("click", () => {
        if (currentTestimonial > 0) {
          showTestimonial(currentTestimonial - 1)
        } else {
          showTestimonial(testimonialSlides.length - 1)
        }
      })
    }
  
    // Counter Animation
    const counters = document.querySelectorAll(".counter")
    const counterSection = document.querySelector(".about-stats")
  
    if (counterSection && counters.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            counters.forEach((counter) => {
              const target = Number.parseInt(counter.getAttribute("data-target"))
              const duration = 2000 // 2 seconds
              const increment = target / (duration / 16) // 60fps
  
              let currentCount = 0
              const updateCounter = () => {
                currentCount += increment
                if (currentCount < target) {
                  counter.textContent = Math.ceil(currentCount)
                  requestAnimationFrame(updateCounter)
                } else {
                  counter.textContent = target
                }
              }
  
              updateCounter()
            })
            counterObserver.unobserve(counterSection)
          }
        },
        { threshold: 0.5 },
      )
  
      counterObserver.observe(counterSection)
    }
  
    // Form Validation
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        let isValid = true
        const formElements = contactForm.elements
  
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].hasAttribute("required") && !formElements[i].value) {
            formElements[i].classList.add("error")
            isValid = false
          } else {
            formElements[i].classList.remove("error")
          }
        }
  
        if (isValid) {
          // Simulate form submission
          const submitButton = contactForm.querySelector('button[type="submit"]')
          submitButton.disabled = true
          submitButton.textContent = "Gönderiliyor..."
  
          setTimeout(() => {
            contactForm.reset()
            submitButton.disabled = false
            submitButton.textContent = "Gönder"
  
            // Show success message
            const formSuccess = document.createElement("div")
            formSuccess.classList.add("form-success")
            formSuccess.innerHTML =
              '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
            contactForm.appendChild(formSuccess)
  
            setTimeout(() => {
              formSuccess.remove()
            }, 5000)
          }, 2000)
        }
      })
    }
  
    // Back to Top Button
    const backToTopButton = document.getElementById("backToTop")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    })
  
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Cookie Consent
    const cookieConsent = document.getElementById("cookieConsent")
    const cookieAccept = document.getElementById("cookieAccept")
    const cookieReject = document.getElementById("cookieReject")
  
    // Check if user has already made a choice
    if (!localStorage.getItem("cookieConsent")) {
      // Show cookie consent if no choice has been made
      setTimeout(() => {
        cookieConsent.style.display = "block"
      }, 2000)
    }
  
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted")
      cookieConsent.style.display = "none"
    })
  
    cookieReject.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "rejected")
      cookieConsent.style.display = "none"
    })
  })
  
  