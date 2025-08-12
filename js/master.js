//#region Toggle Settings Box

//#region Toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
//#endregion

//#region Switch colors
const colors = document.querySelectorAll(".colors-list li");
let activeColor = window.localStorage.getItem("color");
if (activeColor) {
  document.documentElement.style.setProperty("--main-color", activeColor);
  colors.forEach((li) => {
    if (li.dataset.color === activeColor) li.classList.add("active");
    else li.classList.remove("active");
  });
}
colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    // change the main color (Root)
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("color", e.target.dataset.color);
    // make as active
    colors.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
//#endregion

//#region Random Backgrounds Button
const ul = document.querySelector(".random-backgrounds");
const choices = document.querySelectorAll(".random-backgrounds span");
let BackgroundIntervalId;

function activateYes() {
  choices[0].classList.add("active");
  choices[1].classList.remove("active");
  changeBackground();
}

function activateNo() {
  choices[1].classList.add("active");
  choices[0].classList.remove("active");
  clearInterval(BackgroundIntervalId);
}

function setSwitch(value) {
  window.localStorage.setItem("switch", value);
  value === "yes" ? activateYes() : activateNo();
}

// Init on load
let switchBI = window.localStorage.getItem("switch");
if (!switchBI) {
  switchBI = "yes"; // default
  window.localStorage.setItem("switch", switchBI);
}
setSwitch(switchBI);

// Click listener
ul.addEventListener("click", (eve) => {
  if (eve.target.classList.contains("yes")) {
    setSwitch("yes");
  } else if (eve.target.classList.contains("no")) {
    setSwitch("no");
  }
});

//#endregion

//#endregion

//#region Background Images switcher
// استخرج اسم المشروع من الـ URL
let projectName = window.location.pathname.split("/")[1] || "";
let basePath = projectName ? `/${projectName}` : "";

let BackgroundImages = [
  `url(${basePath}/imgs/01.jpg)`,
  `url(${basePath}/imgs/02.jpg)`,
  `url(${basePath}/imgs/03.jpg)`,
  `url(${basePath}/imgs/04.jpg)`,
  `url(${basePath}/imgs/05.jpg)`,
];

const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");

let current = 0;
let lastIndex = 0;

// First Background
bg1.style.backgroundImage = BackgroundImages[current];
bg1.classList.add("show");

function changeBackground() {
  // Stop old interval if running
  clearInterval(BackgroundIntervalId);

  BackgroundIntervalId = setInterval(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * BackgroundImages.length);
    } while (nextIndex === lastIndex);

    lastIndex = nextIndex;

    const nextImage = BackgroundImages[nextIndex];

    if (current === 0) {
      bg2.style.backgroundImage = nextImage;
      bg2.classList.add("show");
      bg1.classList.remove("show");
      current = 1;
    } else {
      bg1.style.backgroundImage = nextImage;
      bg1.classList.add("show");
      bg2.classList.remove("show");
      current = 0;
    }
  }, 5000);
}
//#endregion

//#region Skills Progress
// Select the skills section
const ourSkills = document.querySelector(".skills");

// Select all progress spans inside skills
const allSkills = document.querySelectorAll(".skill-box .skill-progress span");

// Create an IntersectionObserver
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate all skills
        allSkills.forEach((skill) => {
          skill.style.width = skill.dataset.progress;
        });

        // Stop observing after the animation runs once
        observer.unobserve(ourSkills);
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the element is visible
  }
);

// Start observing the skills section
observer.observe(ourSkills);
//#endregion

//#region Our Gallery Popup

const ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    overlay.appendChild(popupBox);

    if (img.alt) {
      let popupTitle = document.createElement("h3");
      popupTitle.textContent = img.alt;
      popupBox.appendChild(popupTitle);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "X";
    popupBox.appendChild(closeButton);
  });
});
// Close Popup
document.addEventListener("click", function (ev) {
  if (ev.target.className === "close-button") {
    ev.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//#endregion

//#region Bullets
//#region Going to Bullets
const bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (ev) => {
    document
      .querySelector(ev.target.dataset.section)
      .scrollIntoView({ behavior: "smooth" });
  });
});
//#endregion
//#region Hide Bullets
const bulletsContainer = document.querySelector(".bullets-option");
const bulletsChoices = document.querySelectorAll(".bullets-option span");
const bulletsIcons = document.querySelector(".nav-bullets");

function yesShowBullets() {
  bulletsChoices[0].classList.add("active");
  bulletsChoices[1].classList.remove("active");
  bulletsIcons.style.display = "block";
}

function noShowBullets() {
  bulletsChoices[1].classList.add("active");
  bulletsChoices[0].classList.remove("active");
  bulletsIcons.style.display = "none";
}

function setBullets(value) {
  window.localStorage.setItem("bullets", value);
  value === "yes" ? yesShowBullets() : noShowBullets();
}

// Init on load
let bul = window.localStorage.getItem("bullets");
if (!bul) {
  bul = "yes"; // default
  window.localStorage.setItem("bullets", bul);
}
setBullets(bul);

// Click listener
bulletsContainer.addEventListener("click", (eve) => {
  if (eve.target.classList.contains("yes")) {
    setBullets("yes");
  } else if (eve.target.classList.contains("no")) {
    setBullets("no");
  }
});

//#endregion
//#endregion

// Reset Settings
document.querySelector(".reset-options").onclick = () => {
  localStorage.clear();
  location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
