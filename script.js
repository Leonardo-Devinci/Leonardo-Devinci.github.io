// Performance optimization: Throttle scroll events
function throttle(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize all functionality
	initThemeToggle();
	initNavigation();
	initScrollAnimations();
	initTypingAnimation();
	initProjectFilters();
	initContactForm();
	initSmoothScrolling();
	initScrollIndicator();
});

// Theme toggle functionality
function initThemeToggle() {
	const themeToggle = document.getElementById("theme-toggle");
	const themeIcon = themeToggle.querySelector("i");

	// Set dark mode as default
	const savedTheme = localStorage.getItem("theme") || "dark";
	document.documentElement.setAttribute("data-theme", savedTheme);
	updateThemeIcon(savedTheme, themeIcon);

	themeToggle.addEventListener("click", function () {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";

		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		updateThemeIcon(newTheme, themeIcon);

		// Add a subtle animation to the toggle button
		themeIcon.style.transform = "rotate(360deg)";
		setTimeout(() => {
			themeIcon.style.transform = "rotate(0deg)";
		}, 300);
	});
}

function updateThemeIcon(theme, iconElement) {
	if (theme === "dark") {
		iconElement.className = "fas fa-sun";
	} else {
		iconElement.className = "fas fa-moon";
	}
}

// Navigation functionality
function initNavigation() {
	const hamburger = document.getElementById("hamburger");
	const navMenu = document.getElementById("nav-menu");
	const navLinks = document.querySelectorAll(".nav-link");

	// Toggle mobile menu
	hamburger.addEventListener("click", function () {
		hamburger.classList.toggle("active");
		navMenu.classList.toggle("active");

		// Animate hamburger bars
		const bars = hamburger.querySelectorAll(".bar");
		if (hamburger.classList.contains("active")) {
			bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
			bars[1].style.opacity = "0";
			bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
		} else {
			bars[0].style.transform = "none";
			bars[1].style.opacity = "1";
			bars[2].style.transform = "none";
		}
	});

	// Close mobile menu when clicking on links
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");

			// Reset hamburger bars
			const bars = hamburger.querySelectorAll(".bar");
			bars[0].style.transform = "none";
			bars[1].style.opacity = "1";
			bars[2].style.transform = "none";
		});
	});

	// Navbar scroll effect
	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		const isDark =
			document.documentElement.getAttribute("data-theme") === "dark";

		if (window.scrollY > 50) {
			navbar.style.background = isDark
				? "rgba(26, 32, 44, 0.98)"
				: "rgba(255, 255, 255, 0.98)";
			navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
		} else {
			navbar.style.background = isDark
				? "rgba(26, 32, 44, 0.95)"
				: "rgba(255, 255, 255, 0.95)";
			navbar.style.boxShadow = "none";
		}
	});

	// Active nav link highlighting
	const sections = document.querySelectorAll("section[id]");

	window.addEventListener("scroll", function () {
		let current = "";
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if (window.scrollY >= sectionTop - 200) {
				current = section.getAttribute("id");
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${current}`) {
				link.classList.add("active");
			}
		});
	});
}

// Enhanced scroll animations
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				console.log("Animation triggered for:", entry.target.className);
			}
		});
	}, observerOptions);

	// Fallback scroll-based animation trigger
	function checkScrollAnimations() {
		const elements = document.querySelectorAll(
			".fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .fade-in-down"
		);
		elements.forEach((element) => {
			const elementTop = element.getBoundingClientRect().top;
			const elementVisible = 150;

			if (elementTop < window.innerHeight - elementVisible) {
				element.classList.add("visible");
			}
		});
	}

	// Add scroll listener for fallback
	window.addEventListener("scroll", throttle(checkScrollAnimations, 100));

	// Section titles with fade-in-down animation
	const sectionTitles = document.querySelectorAll(".section-title");
	sectionTitles.forEach((title) => {
		title.classList.add("fade-in-down");
		observer.observe(title);
	});

	// Bio card with slide-in-left animation
	const bioCard = document.querySelector(".bio-card");
	if (bioCard) {
		bioCard.classList.add("slide-in-left");
		observer.observe(bioCard);
	}

	// Skills section with slide-in-right animation
	const skillsSection = document.querySelector(".skills-section");
	if (skillsSection) {
		skillsSection.classList.add("slide-in-right");
		observer.observe(skillsSection);
	}

	// CV card with scale-in animation
	const cvCard = document.querySelector(".cv-card");
	if (cvCard) {
		cvCard.classList.add("scale-in");
		observer.observe(cvCard);
	}

	// Skill items with staggered fade-in-up animation
	const skillItems = document.querySelectorAll(".skill-item");
	skillItems.forEach((item, index) => {
		// Only add classes if they don't already exist
		if (!item.classList.contains("fade-in-up")) {
			item.classList.add("fade-in-up");
		}
		if (!item.classList.contains(`stagger-${Math.min(index + 1, 6)}`)) {
			item.classList.add(`stagger-${Math.min(index + 1, 6)}`);
		}
		observer.observe(item);
	});

	// Project cards with staggered scale-in animation
	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card, index) => {
		card.classList.add("scale-in");
		card.classList.add(`stagger-${Math.min(index + 1, 6)}`);
		observer.observe(card);
	});

	// Contact methods with slide-in-left animation
	const contactMethods = document.querySelectorAll(".contact-method");
	contactMethods.forEach((method, index) => {
		// Only add classes if they don't already exist
		if (!method.classList.contains("slide-in-left")) {
			method.classList.add("slide-in-left");
		}
		if (!method.classList.contains(`stagger-${Math.min(index + 1, 6)}`)) {
			method.classList.add(`stagger-${Math.min(index + 1, 6)}`);
		}
		observer.observe(method);
	});

	// Contact form with slide-in-right animation
	const contactForm = document.querySelector(".contact-form");
	if (contactForm) {
		contactForm.classList.add("slide-in-right");
		observer.observe(contactForm);
	}

	// Timeline items with alternating slide animations
	const timelineItems = document.querySelectorAll(".timeline-item");
	timelineItems.forEach((item, index) => {
		const animationClass = index % 2 === 0 ? "slide-in-left" : "slide-in-right";
		item.classList.add(animationClass);
		item.classList.add(`stagger-${Math.min(index + 1, 6)}`);
		observer.observe(item);
	});

	// Project filter buttons with fade-in-down animation
	const filterButtons = document.querySelectorAll(".filter-btn");
	filterButtons.forEach((btn, index) => {
		btn.classList.add("fade-in-down");
		btn.classList.add(`stagger-${Math.min(index + 1, 6)}`);
		observer.observe(btn);
	});

	// About content sections
	const aboutText = document.querySelector(".about-text");
	const aboutCv = document.querySelector(".cv-section");

	if (aboutText) {
		aboutText.classList.add("slide-in-left");
		observer.observe(aboutText);
	}

	if (aboutCv) {
		aboutCv.classList.add("slide-in-right");
		observer.observe(aboutCv);
	}

	// Contact content sections
	const contactInfo = document.querySelector(".contact-info");
	const contactFormContainer = document.querySelector(".contact-form");

	if (contactInfo) {
		contactInfo.classList.add("slide-in-left");
		observer.observe(contactInfo);
	}
}

// Typing animation for hero title
function initTypingAnimation() {
	const typingText = document.querySelector(".typing-text");
	if (!typingText) return;

	const text = "Hi, I'm Leonardo Correia";
	const speed = 100;
	let i = 0;

	typingText.textContent = "";
	typingText.style.borderRight = "3px solid white";

	function typeWriter() {
		if (i < text.length) {
			typingText.textContent += text.charAt(i);
			i++;
			setTimeout(typeWriter, speed);
		} else {
			// Blinking cursor effect
			setInterval(() => {
				typingText.style.borderRight =
					typingText.style.borderRight === "3px solid transparent"
						? "3px solid white"
						: "3px solid transparent";
			}, 500);
		}
	}

	// Start typing animation after a delay
	setTimeout(typeWriter, 1000);
}

// Project filtering
function initProjectFilters() {
	const filterButtons = document.querySelectorAll(".filter-btn");
	const projectCards = document.querySelectorAll(".project-card");

	filterButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove active class from all buttons
			filterButtons.forEach((btn) => btn.classList.remove("active"));
			// Add active class to clicked button
			this.classList.add("active");

			const filterValue = this.getAttribute("data-filter");

			projectCards.forEach((card) => {
				const cardCategory = card.getAttribute("data-category");

				if (filterValue === "all" || cardCategory === filterValue) {
					card.classList.remove("hidden");
					card.style.animation = "fadeInUp 0.5s ease forwards";
				} else {
					card.classList.add("hidden");
				}
			});
		});
	});
}

// Contact form functionality
function initContactForm() {
	const contactForm = document.getElementById("contact-form");
	if (!contactForm) return;

	contactForm.addEventListener("submit", function (e) {
		e.preventDefault();

		const submitBtn = contactForm.querySelector('button[type="submit"]');
		const originalText = submitBtn.textContent;

		// Show loading state
		submitBtn.innerHTML = '<span class="loading"></span> Sending...';
		submitBtn.disabled = true;

		// Simulate form submission (replace with actual form handling)
		setTimeout(() => {
			// Show success message
			showNotification("Message sent successfully!", "success");

			// Reset form
			contactForm.reset();

			// Reset button
			submitBtn.textContent = originalText;
			submitBtn.disabled = false;
		}, 2000);
	});

	// Form validation
	const inputs = contactForm.querySelectorAll("input, textarea");
	inputs.forEach((input) => {
		input.addEventListener("blur", function () {
			validateField(this);
		});

		input.addEventListener("input", function () {
			if (this.classList.contains("error")) {
				validateField(this);
			}
		});
	});
}

// Field validation
function validateField(field) {
	const value = field.value.trim();
	let isValid = true;

	// Remove existing error styling
	field.classList.remove("error");
	const existingError = field.parentNode.querySelector(".error-message");
	if (existingError) {
		existingError.remove();
	}

	// Validate based on field type
	if (field.hasAttribute("required") && !value) {
		isValid = false;
		showFieldError(field, "This field is required");
	} else if (field.type === "email" && value) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			isValid = false;
			showFieldError(field, "Please enter a valid email address");
		}
	}

	return isValid;
}

// Show field error
function showFieldError(field, message) {
	field.classList.add("error");
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message";
	errorDiv.textContent = message;
	errorDiv.style.color = "#e53e3e";
	errorDiv.style.fontSize = "0.875rem";
	errorDiv.style.marginTop = "0.25rem";
	field.parentNode.appendChild(errorDiv);
}

// Notification system
function showNotification(message, type = "info") {
	const notification = document.createElement("div");
	notification.className = `notification ${type}`;
	notification.textContent = message;

	// Styling
	Object.assign(notification.style, {
		position: "fixed",
		top: "20px",
		right: "20px",
		padding: "1rem 2rem",
		borderRadius: "10px",
		color: "white",
		fontWeight: "600",
		zIndex: "10000",
		transform: "translateX(400px)",
		transition: "transform 0.3s ease",
		backgroundColor:
			type === "success" ? "#48bb78" : type === "error" ? "#e53e3e" : "#4299e1",
	});

	document.body.appendChild(notification);

	// Animate in
	setTimeout(() => {
		notification.style.transform = "translateX(0)";
	}, 100);

	// Remove after delay
	setTimeout(() => {
		notification.style.transform = "translateX(400px)";
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
	const links = document.querySelectorAll('a[href^="#"]');

	links.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

				window.scrollTo({
					top: offsetTop,
					behavior: "smooth",
				});
			}
		});
	});
}

// Scroll indicator
function initScrollIndicator() {
	const scrollIndicator = document.querySelector(".scroll-indicator");
	if (!scrollIndicator) return;

	scrollIndicator.addEventListener("click", function () {
		const aboutSection = document.getElementById("about");
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: "smooth" });
		}
	});

	// Hide scroll indicator when scrolling down
	window.addEventListener("scroll", function () {
		if (window.scrollY > 100) {
			scrollIndicator.style.opacity = "0";
			scrollIndicator.style.pointerEvents = "none";
		} else {
			scrollIndicator.style.opacity = "1";
			scrollIndicator.style.pointerEvents = "auto";
		}
	});
}

// Parallax effect for hero section
window.addEventListener("scroll", function () {
	const scrolled = window.scrollY;
	const hero = document.querySelector(".hero");
	const heroContent = document.querySelector(".hero-content");
	const heroImage = document.querySelector(".hero-image");

	if (hero && scrolled < hero.offsetHeight) {
		const rate = scrolled * -0.5;
		if (heroContent) {
			heroContent.style.transform = `translateY(${rate}px)`;
		}
		if (heroImage) {
			heroImage.style.transform = `translateY(${rate * 0.8}px)`;
		}
	}
});

// Add CSS for error styling
const style = document.createElement("style");
style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #e53e3e;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function () {
	// Scroll-dependent functionality here
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);

// Add loading animation for images
document.addEventListener("DOMContentLoaded", function () {
	const images = document.querySelectorAll("img");
	images.forEach((img) => {
		img.addEventListener("load", function () {
			this.style.opacity = "1";
		});

		// Set initial opacity
		img.style.opacity = "0";
		img.style.transition = "opacity 0.3s ease";
	});
});

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		// Close mobile menu if open
		const hamburger = document.getElementById("hamburger");
		const navMenu = document.getElementById("nav-menu");

		if (navMenu.classList.contains("active")) {
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");

			const bars = hamburger.querySelectorAll(".bar");
			bars[0].style.transform = "none";
			bars[1].style.opacity = "1";
			bars[2].style.transform = "none";
		}
	}
});

// Add focus styles for accessibility
const focusStyle = document.createElement("style");
focusStyle.textContent = `
    .nav-link:focus,
    .btn:focus,
    .project-link:focus,
    .social-link:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
`;
document.head.appendChild(focusStyle);
