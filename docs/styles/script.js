const tray = document.getElementById("diceTray");
const dieType = document.getElementById("dieType");
const quantity = document.getElementById("quantity");
const addDieButton = document.getElementById("addDie");
const rollButton = document.getElementById("rollAll");
const sumTotal = document.getElementById("sumTotal");

const MAX_SLOTS = 15;
const dice = [];
const DIE_IMAGE_BY_SIDES = {
  4: "images/Dice Images/D4.jpg",
  6: "images/Dice Images/D6.jpg",
  8: "images/Dice Images/D8",
  10: "images/Dice Images/D10.jpg",
  12: "images/Dice Images/D12.jpg",
  20: "images/Dice Images/D20.jpg",
  100: "images/Dice Images/D100.jpg"
};
const DEFAULT_DIE_IMAGE = "images/Dice Images/D6.jpg";

function getDieImagePath(dieSides) {
  return DIE_IMAGE_BY_SIDES[dieSides] ?? DEFAULT_DIE_IMAGE;
}

function buildSlotElement(dieSides, index) {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = "die-slot filled";
  slot.setAttribute("aria-label", `Remove d${dieSides} from tray`);

  const image = document.createElement("img");
  image.className = "die-image";
  image.src = getDieImagePath(dieSides);
  image.alt = `d${dieSides} die image`;

  const text = document.createElement("span");
  text.className = "die-label";
  text.textContent = `d${dieSides}`;

  image.addEventListener("error", () => {
    image.remove();
    slot.classList.add("text-only");
  });

  slot.append(image, text);

  slot.addEventListener("click", () => {
    dice.splice(index, 1);
    renderTray();
  });
  return slot;
}

function buildEmptySlot() {
  const slot = document.createElement("div");
  slot.className = "die-slot";
  slot.setAttribute("aria-hidden", "true");
  return slot;
}

function renderTray() {
  tray.textContent = "";

  dice.forEach((dieSides, index) => {
    tray.append(buildSlotElement(dieSides, index));
  });

  for (let i = dice.length; i < MAX_SLOTS; i += 1) {
    tray.append(buildEmptySlot());
  }
}

function addDiceToTray() {
  const selectedSides = Number(dieType.value);
  const selectedQuantity = Number(quantity.value);
  const room = MAX_SLOTS - dice.length;
  const amountToAdd = Math.min(room, selectedQuantity);

  for (let i = 0; i < amountToAdd; i += 1) {
    dice.push(selectedSides);
  }

  renderTray();
}

function rollAllDice() {
  if (dice.length === 0) {
    sumTotal.textContent = "Sum Total: 0";
    return;
  }

  const total = dice.reduce((acc, sides) => {
    return acc + Math.floor(Math.random() * sides + 1);
  }, 0);

  sumTotal.textContent = `Sum Total: ${total}`;
}

addDieButton.addEventListener("click", addDiceToTray);
rollButton.addEventListener("click", rollAllDice);

renderTray();
