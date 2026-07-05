// HERO SLIDER
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("heroDots");
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  showSlide(index);
}

document.getElementById("heroNext").addEventListener("click", nextSlide);
document.getElementById("heroPrev").addEventListener("click", prevSlide);
setInterval(nextSlide, 5000);

// EXPLORE CAROUSEL
const programs = [
  {
    img: "images/sci-lab.png",
    title: "Science Lab",
    desc: "State-of-the-art labs for Physics, Chemistry, and Biology with modern equipment and safety standards.",
  },
  {
    img: "images/lib.png",
    title: "Digital Library",
    desc: "Over 10,000 books + e-learning resources, quiet study zones, and research support for all students.",
  },
  {
    img: "images/f-field.png",
    title: "Sports Complex",
    desc: "Football pitch, basketball court, swimming pool and indoor games. We breed champions.",
  },
  {
    img: "images/music.png",
    title: "Music & Arts",
    desc: "Professional music studio, art room and annual talent showcase to nurture creativity.",
  },
  {
    img: "images/c-lab.png",
    title: "ICT Center",
    desc: "Fully equipped computer lab with coding, robotics and AI classes preparing students for the future.",
  },
  {
    img: "images/hostel.png",
    title: "Boarding House",
    desc: "Safe, comfortable hostels with 24/7 supervision, study halls, and home-like environment.",
  },
  {
    img: "images/Pool.png",
    title: "Swimming Pool",
    desc: "Olympic-size pool with professional coaching and safety measures for all skill levels.",
  },
  {
    img: "images/class.png",
    title: "Smart Classrooms",
    desc: "Interactive whiteboards, projectors, and digital learning tools for an engaging learning experience.",
  },
];

const track = document.getElementById("carouselTrack");
const wrapper = document.getElementById("carouselWrapper");

function createCards() {
  track.innerHTML = "";
  const duplicated = [...programs, ...programs];
  duplicated.forEach((item, index) => {
    track.innerHTML += `
      <div class="card" data-index="${index % programs.length}">
        <img src="${item.img}" alt="${item.title}">
        <div class="card-label">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  });
}
createCards();

// SPEED + DIRECTION CONTROL
let currentSpeed = "20s";
document.documentElement.style.setProperty("--speed", currentSpeed);

function setSpeed(speed, e) {
  currentSpeed = speed;
  document.documentElement.style.setProperty("--speed", speed);
  document
    .querySelectorAll(".speed-controls button")
    .forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");
}

document.getElementById("slowBtn").onclick = (e) => setSpeed("40s", e);
document.getElementById("normalBtn").onclick = (e) => setSpeed("20s", e);
document.getElementById("fastBtn").onclick = (e) => setSpeed("10s", e);

document.getElementById("reverseBtn").onclick = () => {
  const dir = getComputedStyle(document.documentElement)
    .getPropertyValue("--direction")
    .trim();
  document.documentElement.style.setProperty(
    "--direction",
    dir === "reverse" ? "normal" : "reverse",
  );
};

// PAUSE ON HOVER
track.addEventListener("mouseover", (e) => {
  if (e.target.closest(".card")) track.style.animationPlayState = "paused";
});
track.addEventListener("mouseout", (e) => {
  if (e.target.closest(".card")) track.style.animationPlayState = "running";
});

// MODAL
const modal = document.getElementById("modal");
track.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) {
    const index = card.dataset.index;
    const data = programs[index];
    document.getElementById("modalImg").src = data.img;
    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalDesc").innerText = data.desc;
    modal.style.display = "flex";
    track.style.animationPlayState = "paused";
  }
});
document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
  track.style.animationPlayState = "running";
};
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    track.style.animationPlayState = "running";
  }
});

// MOBILE SWIPE
let startX = 0;
wrapper.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
wrapper.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0)
      document.getElementById("fastBtn").click(); // left
    else document.getElementById("slowBtn").click(); // right
  }
});

// GALLERY FILTER
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {
  btn.onclick = () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

galleryItems.forEach(item => {
  item.onclick = () => {
    lightbox.style.display = "flex";
    lightboxImg.src = item.querySelector("img").src;
    lightboxCaption.innerText = item.querySelector(".overlay span").innerText;
  }
});

document.getElementById("lightboxClose").onclick = () => lightbox.style.display = "none";
lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.style.display = "none"; }

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you within 24 hours.");
  e.target.reset();
});
// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// CLOSE MENU WHEN LINK IS CLICKED
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// STICKY NAVBAR ON SCROLL
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if(window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    navbar.style.background = "rgba(255,255,255,0.98)";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.background = "white";
  }
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});