const FLAMES_DATA = [
  {
    state: "Friends",
    emoji: "🤝",
    description:
      "Bestie energy — maybe that's all it's meant to be. Or maybe you're just in denial. Either way, the friend zone is real and you might be living in it.",
  },
  {
    state: "Lovers",
    emoji: "💕",
    description:
      "Main character moment — the rom-com writes itself. Cue the rain scene, the airport chase, the I've loved you all along confession. You're living the dream.",
  },
  {
    state: "Admirers",
    emoji: "👀",
    description:
      "Watching from afar — secret glances, subtle likes on old Instagram posts. You're low-key obsessed but keeping it cute. Secretly Pinterest-ing what your couple aesthetic would be.",
  },
  {
    state: "Married",
    emoji: "💍",
    description:
      "Wedding Pinterest activated — save the date vibes. Your future in-laws don't know it yet, but you're already part of the family.",
  },
  {
    state: "Enemies",
    emoji: "😤",
    description:
      "Block and move on — villain origin story unlocked. This is the enemies-to-lovers arc nobody asked for. Red flag detected. Unfollow, unmatch, unsubscribe.",
  },
  {
    state: "Sexual Partners",
    emoji: "🙈",
    description:
      "Say less — no further questions, your honor. We're keeping this PG-13 but the energy is clear. Netflix and… you know. Moving on.",
  },
];

// Algorithm
function calculateFLAMES(name1, name2) {
  // Normalise: lowercase, strip spaces
  let array1 = name1.toLowerCase().replace(/\s/g, "").split("");
  let array2 = name2.toLowerCase().replace(/\s/g, "").split("");

  // Remove common characters (one-for-one)
  array1 = array1.filter((char) => {
    const index = array2.indexOf(char);
    if (index !== -1) {
      array2.splice(index, 1);
      return false;
    }
    return true;
  });

  const count = array1.length + array2.length;

  // Edge case: names are perfect anagrams (contain the same letters in any order) → Friends
  if (count === 0) return FLAMES_DATA[0];

  // Classic FLAMES elimination loop
  let pool = [...FLAMES_DATA];
  let cursor = 0;

  while (pool.length > 1) {
    cursor = (cursor + count - 1) % pool.length;
    pool.splice(cursor, 1);
    if (cursor >= pool.length) cursor = 0;
  }

  return pool[0];
}

// DOM refs
const form = document.querySelector(".calculator-section__form");
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const submitBtn = document.querySelector(".calculator-section__form-button");

// Modal elements (injected below)
let modal, modalOverlay;

// Modal builder
function buildModal() {
  // Overlay
  modalOverlay = document.createElement("div");
  modalOverlay.classList.add("result-overlay");
  modalOverlay.setAttribute("aria-hidden", "true");

  // Modal dialog
  modal = document.createElement("dialog");
  modal.classList.add("result-modal");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "result-state");

  modal.innerHTML = `
    <button class="result-modal__close" aria-label="Close result">✕</button>
    <div class="result-modal__body">
      <span class="result-modal__emoji" id="result-emoji" aria-hidden="true"></span>
      <p class="result-modal__names" id="result-names"></p>
      <h3 class="result-modal__state heading" id="result-state"></h3>
      <p class="result-modal__description" id="result-description"></p>
      <hr class="result-modal__divider" />
      <div class="result-modal__actions">
        <button class="result-modal__btn result-modal__btn--secondary" id="btn-try-again">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Try Again
        </button>
        <button class="result-modal__btn result-modal__btn--primary" id="btn-share">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share
        </button>
      </div>
      <p class="result-modal__footer">Remember: This is for entertainment purposes only. Or is it? 👀</p>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  document.body.appendChild(modal);

  // Close actions
  modal
    .querySelector(".result-modal__close")
    .addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  document
    .getElementById("btn-try-again")
    .addEventListener("click", handleTryAgain);
  document.getElementById("btn-share").addEventListener("click", handleShare);

  // Keyboard: Escape closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("result-modal--open")) {
      closeModal();
    }
  });
}

// Modal open / close
function openModal(result, n1, n2) {
  document.getElementById("result-emoji").textContent = result.emoji;
  document.getElementById("result-names").innerHTML =
    `${escapeHtml(n1)} <span class="result-modal__heart">💗</span> ${escapeHtml(n2)}`;
  document.getElementById("result-state").textContent = result.state;
  document.getElementById("result-description").textContent =
    result.description;

  // Store for share handler
  modal.dataset.name1 = n1;
  modal.dataset.name2 = n2;
  modal.dataset.state = result.state;
  modal.dataset.emoji = result.emoji;

  modal.classList.add("result-modal--open");
  modalOverlay.classList.add("result-overlay--open");
  document.body.style.overflow = "hidden";

  // Focus the modal for accessibility
  modal.querySelector(".result-modal__close").focus();
}

function closeModal() {
  modal.classList.remove("result-modal--open");
  modalOverlay.classList.remove("result-overlay--open");
  document.body.style.overflow = "";
}

// Button handlers
function handleTryAgain() {
  closeModal();
  setTimeout(() => {
    name1Input.value = "";
    name2Input.value = "";
    name1Input.focus();
    document
      .getElementById("calculator")
      .scrollIntoView({ behavior: "smooth" });
  }, 300);
}

function handleShare() {
  const text = `${modal.dataset.name1} + ${modal.dataset.name2} = ${modal.dataset.state} ${modal.dataset.emoji}\n\nCalculate your FLAMES at: ${window.location.href}`;

  if (navigator.share) {
    navigator
      .share({ title: "My FLAMES Result", text })
      .catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => showToast("Result copied to clipboard! 📋"))
    .catch(() => showToast("Couldn't copy — try manually!"));
}

// Toast notification
function showToast(message) {
  const existing = document.querySelector(".flames-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "flames-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add("flames-toast--visible"));

  setTimeout(() => {
    toast.classList.remove("flames-toast--visible");
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// Form validation & submission
function showInputError(input, message) {
  clearInputError(input);
  input.classList.add("calculator-section__form-input--error");
  const err = document.createElement("span");
  err.className = "calculator-section__form-error";
  err.textContent = message;
  err.setAttribute("role", "alert");
  input.insertAdjacentElement("afterend", err);
}

function clearInputError(input) {
  input.classList.remove("calculator-section__form-input--error");
  const existing = input.nextElementSibling;
  if (
    existing &&
    existing.classList.contains("calculator-section__form-error")
  ) {
    existing.remove();
  }
}

function setLoadingState(loading) {
  submitBtn.disabled = loading;
  submitBtn.textContent = loading
    ? "🔮 Calculating Your Destiny…"
    : "Calculate My Fate";
  if (loading)
    submitBtn.classList.add("calculator-section__form-button--loading");
  else submitBtn.classList.remove("calculator-section__form-button--loading");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const n1 = name1Input.value.trim();
  const n2 = name2Input.value.trim();

  // Clear previous errors
  clearInputError(name1Input);
  clearInputError(name2Input);

  let hasError = false;

  if (!n1) {
    showInputError(name1Input, "Please enter your name.");
    hasError = true;
  } else if (!/[a-zA-Z]/.test(n1)) {
    showInputError(name1Input, "Name must contain at least one letter.");
    hasError = true;
  }

  if (!n2) {
    showInputError(name2Input, "Please enter your crush's name.");
    hasError = true;
  } else if (!/[a-zA-Z]/.test(n2)) {
    showInputError(name2Input, "Name must contain at least one letter.");
    hasError = true;
  }

  if (hasError) return;

  // Animate the button then show result
  setLoadingState(true);
  setTimeout(() => {
    const result = calculateFLAMES(n1, n2);
    setLoadingState(false);
    openModal(result, n1, n2);
  }, 800);
});

// Clear errors on input
[name1Input, name2Input].forEach((input) =>
  input.addEventListener("input", () => clearInputError(input)),
);

// Utility
function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

// Init
buildModal();
