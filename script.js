// 1. Elements and messages for every No click.
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const responseMessage = document.getElementById('responseMessage');
const questionView = document.getElementById('questionView');
const successView = document.getElementById('successView');
const confetti = document.getElementById('confetti');

const sizes = [
  { width: 162, height: 58, font: 19 },
  { width: 208, height: 77, font: 22 },
  { width: 262, height: 100, font: 26 },
  { width: 328, height: 132, font: 31 },
  { width: 410, height: 170, font: 36 },
  { width: 500, height: 224, font: 42 },
  { width: 610, height: 290, font: 48 },
];

const messages = [
  'Are you sureeee? 🥺',
  'What if Jerbear gives you extra hugs? 🧸',
  'Pretty please, with a cherry on top? 🍒',
  'Look how much the Yes button loves you! 💗',
  'Jerbear is making his best puppy eyes right now 🥹',
  'Okay okay... one more chance to say yes? 💌',
  'There is only one very big answer left! 💕',
];

const noLabels = ['No 🙈', 'No? 🥺', 'Still no? 👀', 'Nooo 🙊', 'Really? 🥹', 'No? 💭', 'No 💔'];
let noClicks = 0;
let accepted = false;

// 2. Grow Yes without making it wider than a phone screen.
function updateYesSize() {
  if (yesButton.classList.contains('takeover')) return;

  const step = sizes[Math.min(noClicks, sizes.length - 1)];
  yesButton.style.width = `${Math.min(step.width, window.innerWidth * 0.84)}px`;
  yesButton.style.height = `${Math.min(step.height, window.innerHeight * 0.42)}px`;
  yesButton.style.fontSize = `${Math.min(step.font, 46)}px`;
}

noButton.addEventListener('click', () => {
  if (accepted) return;
  noClicks += 1;
  responseMessage.textContent = messages[Math.min(noClicks - 1, messages.length - 1)];

  if (noClicks >= sizes.length) {
    noButton.hidden = true;
    yesButton.textContent = 'YES! 💗';
    yesButton.classList.add('takeover');
    yesButton.focus();
  } else {
    updateYesSize();
    noButton.textContent = noLabels[Math.min(noClicks, noLabels.length - 1)];
  }
});

// 3. Celebrate Yes with a new screen and floating hearts.
yesButton.addEventListener('click', () => {
  if (accepted) return;
  accepted = true;
  yesButton.classList.remove('takeover');
  questionView.hidden = true;
  successView.hidden = false;
  document.title = 'She said YES! 💖 | Jerbear';
  window.scrollTo({ top: 0, behavior: 'instant' });
  celebrate();
});

function celebrate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hearts = ['💗', '💕', '💖', '💘', '🤍', '✨'];
  for (let i = 0; i < 38; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-piece';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.setProperty('--left', `${Math.random() * 100}%`);
    heart.style.setProperty('--size', `${18 + Math.random() * 21}px`);
    heart.style.setProperty('--duration', `${3 + Math.random() * 2.5}s`);
    heart.style.setProperty('--delay', `${Math.random() * 1.6}s`);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
    confetti.appendChild(heart);
  }
}

window.addEventListener('resize', updateYesSize);
updateYesSize();
