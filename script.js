let current = 0;
let popped = 0;

/* NAVIGATION */
function go(n) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((s) => {
    s.style.transform = "scale(0.95)";
    s.style.opacity = 0;
    s.classList.remove("active");
  });

  setTimeout(() => {
    const next = document.getElementById("s" + n);
    if (next) {
      next.classList.add("active");
      next.style.transform = "scale(1)";
      next.style.opacity = 1;
    }

    current = n;

    if (n === 4) animateWords();
  }, 300);
}

/* COUNTDOWN */
function startCountdown() {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  let target = new Date().getTime() + 3600000;

  setInterval(() => {
    let now = new Date().getTime();
    let diff = target - now;

    let h = Math.floor(diff / 1000 / 60 / 60);
    let m = Math.floor(diff / 1000 / 60) % 60;
    let s = Math.floor(diff / 1000) % 60;

    if (countdownEl) {
      countdownEl.innerText = `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
  }, 1000);
}

// Start countdown when page loads
document.addEventListener("DOMContentLoaded", function () {
  startCountdown();
});

/* BALLOON POP */
function pop(el) {
  if (el.classList.contains("popped")) return;

  el.classList.add("popped");

  // explosion emoji
  el.innerHTML = "💥";

  // scale + fade animation
  el.animate(
    [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(1.6)", opacity: 0 },
    ],
    {
      duration: 400,
      easing: "ease-out",
    },
  );

  // create particles ✨
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.innerHTML = "✨";

    p.style.position = "absolute";
    p.style.left = el.offsetLeft + "px";
    p.style.top = el.offsetTop + "px";
    p.style.pointerEvents = "none";

    document.querySelector("#s3").appendChild(p);

    const x = (Math.random() - 0.5) * 120;
    const y = (Math.random() - 0.5) * 120;

    p.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px, ${y}px)`, opacity: 0 },
      ],
      {
        duration: 600,
        easing: "ease-out",
      },
    );

    setTimeout(() => p.remove(), 600);
  }

  setTimeout(() => {
    el.style.visibility = "hidden";
  }, 350);

  popped++;
}

function checkBalloons() {
  if (popped >= 4) {
    go(4);
  } else {
    alert("Pop all balloons first!");
  }
}

/* WORD ANIMATION */
function animateWords() {
  const words = ["You", "are", "so", "special 💘"];
  const row = document.getElementById("wordRow");

  if (!row) return; // safety

  row.innerHTML = "";

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.innerText = word;

    row.appendChild(span);

    // FORCE reflow (important)
    setTimeout(
      () => {
        span.classList.add("show");
      },
      200 + i * 500,
    );
  });

  setTimeout(() => go(5), 3500);
}

/* LETTER */
function openLetter() {
  const el = document.getElementById("letter");
  el.classList.add("show");

  cardHearts(); // 💖 effect
}
function closeLetter() {
  document.getElementById("letter").classList.remove("show");
}

setInterval(() => {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = "20px";
  heart.style.opacity = "0.8";

  document.body.appendChild(heart);

  let pos = 0;
  const anim = setInterval(() => {
    pos += 2;
    heart.style.bottom = pos + "px";

    if (pos > window.innerHeight) {
      clearInterval(anim);
      heart.remove();
    }
  }, 30);
}, 400);

const photos = [
  { src: "img1.jpeg", text: "The day we met ❤️" },
  { src: "img2.jpeg", text: "Your smile = my happiness 😊" },
  { src: "img3.jpeg", text: "Our cutest moment 💕" },
  { src: "img4.jpeg", text: "Forever with you 💖" },
];

let slideIndex = 0;

function startSlideshow() {
  const img = document.getElementById("slideImg");
  const caption = document.getElementById("caption");

  if (!img) return;

  slideIndex = 0;

  function showSlide() {
    img.classList.remove("zoom");

    setTimeout(() => {
      const p = photos[slideIndex];
      img.src = p.src;
      caption.innerText = p.text;

      img.style.opacity = 0;

      setTimeout(() => {
        img.style.opacity = 1;
        img.classList.add("zoom");
      }, 200);

      slideIndex++;

      if (slideIndex < photos.length) {
        setTimeout(showSlide, 3000);
      } else {
        setTimeout(() => go(3), 3000); // go to balloons
      }
    }, 300);
  }

  showSlide();
}

function launchHearts() {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";

    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "60%";
    heart.style.fontSize = "18px";
    heart.style.opacity = "0.8";

    document.getElementById("letter").appendChild(heart);

    const x = (Math.random() - 0.5) * 200;
    const y = Math.random() * -200;

    heart.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px, ${y}px)`, opacity: 0 },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      },
    );

    setTimeout(() => heart.remove(), 1000);
  }
}

function cardHearts() {
  const container = document.querySelector(".card");

  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";

    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "16px";
    heart.style.pointerEvents = "none";

    container.appendChild(heart);

    const x = (Math.random() - 0.5) * 150;
    const y = (Math.random() - 0.5) * 150;

    heart.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px, ${y}px)`, opacity: 0 },
      ],
      {
        duration: 1200,
        easing: "ease-out",
      },
    );

    setTimeout(() => heart.remove(), 1200);
  }
}
