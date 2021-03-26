'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const operationsTabContainer = document.querySelector('.operations__tab-container');
const operationsContent = document.querySelectorAll('.operations__content');
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');

const toggleModal = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', toggleModal));

btnCloseModal.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    toggleModal();
  }
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const section = document.querySelector(e.target.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

const handleMouse = function (op) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      [...navLinks.children].forEach(({ firstElementChild: el }) => {
        if (el !== e.target) el.style.opacity = op;
      });

      this.querySelector('img').style.opacity = op;
    }
  };
};

// window.addEventListener('scroll', function () {
//   if (section1.getBoundingClientRect().y <= 0) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// === Implement sticky-nav with IntersectionObserver API ===
const handleNavObserver = (entries) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};

const navObserver = new IntersectionObserver(handleNavObserver, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

navObserver.observe(header);

const handleRevealObserver = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealObserver = new IntersectionObserver(handleRevealObserver, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  revealObserver.observe(section);
  section.classList.add('section--hidden');
});

const handleLazyObserver = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(handleLazyObserver, {
  root: null,
  threshold: 0,
});

images.forEach((image) => lazyObserver.observe(image));

// sections.forEach((section) => revealObserver.observe(section));

// const handleMouse = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     [...navLinks.children].forEach(({ firstElementChild: el }) => {
//       if (el !== e.target) el.style.opacity = this;
//     });

//     nav.querySelector('img').style.opacity = this;
//   }
// };

// nav.addEventListener('mouseover', handleMouse.bind(0.3));
// nav.addEventListener('mouseout', handleMouse.bind(1));

nav.addEventListener('mouseover', handleMouse(0.3));
nav.addEventListener('mouseout', handleMouse(1));

operationsTabContainer.addEventListener('click', function (e) {
  const tab = e.target.closest('.operations__tab');
  if (!tab) return;

  [...this.children].forEach((tab) => tab.classList.remove('operations__tab--active'));
  operationsContent.forEach((content) => content.classList.remove('operations__content--active'));

  tab.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${tab.dataset.tab}`).classList.add('operations__content--active');
});

// === Lectures ===
/*
// === Select elements ===
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const buttons = document.getElementsByTagName('button');
const body = document.body;
const head = document.head;

console.log('Sections:', sections); // Node list
console.log('Buttons:', buttons); // HTML collection
console.log(body);
console.log(head);

// === Create, insert, remove elements ===
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
// cookieMessage.textContent = 'We analytics cookie!';
cookieMessage.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
// header.insertAdjacentElement('afterbegin', cookieMessage);
// header.prepend(cookieMessage);
// header.append(cookieMessage.cloneNode(true));
// header.after(cookieMessage);
// header.before(cookieMessage);
header.append(cookieMessage);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  cookieMessage.remove();
  // cookieMessage.parentNode.removeChild(cookieMessage);
  // header.removeChild(cookieMessage);
  // cookieMessage.closest('.header').removeChild(cookieMessage);
});

// === Style elements ===
// cookieMessage.style.background = '#444';
// console.log(cookieMessage.style.height);
// console.log(cookieMessage.style.background);
console.log(getComputedStyle(cookieMessage).height);
cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height) + 40 + 'px';
console.log(getComputedStyle(cookieMessage).height);

document.documentElement.style.setProperty('--color-primary', 'lightblue');

// === Attributes ===
const logo = document.querySelector('.nav__logo');
console.log(logo.src); // absolute path & and dot notation only for standard attributes
console.log(logo.getAttribute('who'));
console.log(logo.setAttribute('who', 'Den'));
console.log(logo.getAttribute('who'));
logo.alt = 'Hello logo!';
console.log(logo.alt);
console.log(logo.getAttribute('src')); // relative path

const link = document.querySelector('.nav__link');
console.log(link.href); // absolute path | similar above
console.log(link.getAttribute('href')); // relative path

// === Data attributes ===
console.log(logo.dataset.welcomeBack);
logo.dataset.welcomeBack = 'Welcome back, Amigo!';
console.log(logo.dataset.welcomeBack);
// console.log(logo.getAttribute('data-welcome-back'));

// === Events Handler ===
const h1 = document.querySelector('h1');

// happen once
const handleMouseEnter = (e) => {
  // e.target.style.fontSize = 66 + 'px';
  e.target.style.setProperty('font-size', '66px');
  // h1.removeEventListener('mouseenter', handleMouseEnter);
};

const handleMouseLeave = (e) => {
  e.target.style.removeProperty('font-size');
};

h1.addEventListener('mouseenter', handleMouseEnter);
h1.addEventListener('mouseleave', handleMouseLeave);

// old way
// h1.onmouseenter = handleMouseEnter;

// === Bubbles event ===
const random = (min = 0, max = 255) => Math.round(Math.random() * (max - min) + min);
const randomColor = () => `rgb(${random()}, ${random()}, ${random()})`;
console.log(randomColor());
console.log(randomColor());
console.log(randomColor());

const link = document.querySelector('.nav__link');
const links = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

link.addEventListener('click', function (e) {
  this.style.background = randomColor();
  console.log('=== Link ===');

  // e.stopPropagation();
});

links.addEventListener('click', function () {
  console.log('=== Links ===');
  this.style.background = randomColor();
});

nav.addEventListener(
  'click',
  function () {
    console.log('=== Nav ===');
    this.style.background = randomColor();
  },
  true
);

// === Scroll ===
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  const position = section1.getBoundingClientRect();
  console.log('Position section:', position);
  console.log('Scroll position (X, Y):', window.pageXOffset + ', ' + window.pageYOffset);
  // console.log('Absolute doc:', document.documentElement.offsetHeight, document.documentElement.offsetWidth);
  console.log(
    'Viewport (heigh, width):',
    document.documentElement.clientHeight + ', ' + document.documentElement.clientWidth
  );

  // old way
  // window.scrollTo({
  //   top: position.top + window.pageYOffset,
  //   left: position.left + window.pageXOffset,
  //   behavior: 'smooth',
  // });

  // section1.scrollIntoView({ behavior: 'smooth' });
});

// === Traversing DOM ===

const h1 = document.querySelector('h1');
// console.log(h1.childNodes);
console.log(h1.children);
// console.log(h1.firstChild);
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'lightcoral';
h1.lastElementChild.style.color = 'white';

h1.closest('.header').style.background = 'lightblue';
h1.closest('h1').style.background = 'lightgreen';

// === Siblings ===
console.log('Previous sibling:', h1.previousElementSibling);
console.log('Next sibling:', h1.nextElementSibling);

// console.log(h1.nextSibling);
// console.log(h1.previousSibling);

Array.from(h1.parentElement.children, (el) => (el.style.transform = `scale(0.8)`));

// === Intersection Observer API ===
function buildThresholdList() {
  const thresholds = [];
  const numSteps = 20;

  for (let i = 1; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    console.log(entry.intersectionRatio);
    entry.target.style.opacity = entry.intersectionRatio >= 0.3 ? 1 : entry.intersectionRatio;
  });
}

const options = {
  root: null,
  threshold: buildThresholdList(),
};

const observer = new IntersectionObserver(handleIntersect, options);
observer.observe(section1);
*/
