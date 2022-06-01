const body = document.body;
const loader = document.getElementById('loading');
const header = document.getElementById('header');

window.addEventListener('load', () => {
    loader.classList.add('loaded');
    body.classList.remove('scrollBlock');
});

const elUpcoming = document.getElementById('upcomingDate');
const timerEl = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

const upcomingDate = new Date('08/17/2022'); // mm/dd/yyyy

elUpcoming.textContent = `${upcomingDate.getDate()}.${
    upcomingDate.getMonth() + 1
}.${upcomingDate.getFullYear()}`;

function calcDate(upcoming, target) {
    const res = {
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
    };
    const gap = upcoming - new Date();

    res.days = Math.trunc(gap / 1000 / 60 / 60 / 24);
    res.hours = Math.trunc(gap / 1000 / 60 / 60 - res.days * 24);
    res.minutes = Math.trunc(
        gap / 1000 / 60 - res.days * 24 * 60 - res.hours * 60
    );
    res.seconds = Math.trunc(
        gap / 1000 -
            res.days * 24 * 60 * 60 -
            res.hours * 60 * 60 -
            res.minutes * 60
    );

    //number formatter
    const formatter = num => (num.toString().length === 2 ? num : `0${num}`);
    //number formatter

    target.days.textContent = formatter(res.days);
    target.hours.textContent = formatter(res.hours);
    target.minutes.textContent = formatter(res.minutes);
    target.seconds.textContent = formatter(res.seconds);

    setTimeout(() => calcDate(upcoming, target), 1000);
}
calcDate(upcomingDate, timerEl);

function parallax() {
    gsap.to('#header', {
        scrollTrigger: {
            trigger: '#header',
            start: 'top top',
            end: '1000',
            pin: true,
        },
    });
    gsap.from('.header-city', {
        scrollTrigger: {
            trigger: 'body',
            start: '0',
            end: '600',
            scrub: true,
        },
        yPercent: 120,
        opacity: 0,
    });
    gsap.from('.header-arena', {
        scrollTrigger: {
            trigger: 'body',
            start: '200',
            end: '800',
            scrub: true,
        },
        yPercent: 80,
        opacity: 0,
    });
    gsap.from('.header-timer-time', {
        scrollTrigger: {
            trigger: 'header-body',
            start: '100',
            end: '1000',
            scrub: true,
        },
        yPercent: 70,
    });
    gsap.from('.header-tank', {
        scrollTrigger: {
            trigger: 'body',
            start: '400',
            end: '1000',
            scrub: true,
        },
        yPercent: 70,
        opacity: 0,
    });
    gsap.from('.header-timer-content', {
        scrollTrigger: {
            trigger: 'body',
            start: '400',
            end: '1000',
            scrub: true,
        },
        opacity: 0,
    });
    gsap.from('.header-subscribe', {
        scrollTrigger: {
            trigger: 'body',
            start: '400',
            end: '1000',
            scrub: true,
        },
        opacity: 0,
    });
    gsap.from('.cards-item', {
        scrollTrigger: {
            trigger: '.cards',
            start: '25% center',
        },
        duration: 0.5,
        stagger: 0.1,
        opacity: 0,
        yPercent: 50,
    });
    gsap.from('.team-card', {
        scrollTrigger: {
            trigger: '.team',
            start: 'top center',
        },
        duration: 0.5,
        stagger: 0.1,
        opacity: 0,
        yPercent: 50,
    });
    gsap.from('.coins-card', {
        scrollTrigger: {
            trigger: '.coins-card',
            start: 'top 75%',
        },
        duration: 0.5,
        stagger: 0.1,
        opacity: 0,
        yPercent: 50,
    });
    gsap.from('.earn-card', {
        scrollTrigger: {
            trigger: '.earn',
            start: 'top center',
        },
        duration: 0.5,
        stagger: 0.1,
        opacity: 0,
        yPercent: 50,
    });
    gsap.from('.partners-card', {
        scrollTrigger: {
            trigger: '.partners-card',
            start: 'top 75%',
        },
        duration: 0.5,
        stagger: 0.05,
        opacity: 0,
        yPercent: 50,
    });
}
parallax();

function playOnHover() {
    const cards = document.querySelectorAll('.legend-card');
    for (let i = 1; i <= cards.length; i++) {
        let card = cards[i - 1];
        const video = card.querySelector('video');
        const src = video.querySelector('source');
        window.addEventListener('load', () => {
            src.setAttribute('src', `./assets/videos/video-${i}.MP4`);
            video.load();
            card.addEventListener('mouseenter', () => {
                card.classList.remove('pause');
                video.setAttribute('autoplay', true);
                if (video.hasAttribute('autoplay')) {
                    video.play();
                }
            });
            card.addEventListener('mouseleave', () => {
                const video = card.querySelector('video');
                video.pause();
                card.classList.add('pause');
            });
        });
    }
}
playOnHover();

const input = document.querySelector('.checkbox input');
const inputCustom = document.querySelector('.checkbox-custom');
input.addEventListener('change', () => inputCustom.classList.toggle('checked'));

function roadmapSlider() {
    const slider = document.querySelector('.roadmap-slider');
    const page = document.querySelector('.roadmap-slider-page');
    const menus = document.querySelectorAll('.roadmap-menu');
    const image = document.querySelector('.roadmap-slider-img');

    const next = document.querySelector('.roadmap-slider-btn.next');
    const prev = document.querySelector('.roadmap-slider-btn.prev');

    const allColumns = menus.length;
    let columns = Math.trunc(window.innerWidth / 340);
    let outColumns = allColumns - columns;

    const nav = document.querySelector('.roadmap-slider-map');
    const state = `<span class="roadmap-slider-map-state"></span>`;
    let statesLength = outColumns + 1;
    nav.innerHTML = state.repeat(statesLength);
    const states = nav.querySelectorAll('.roadmap-slider-map-state');

    states[0].classList.add('active');
    states[0].innerHTML = `<i>2021</i>`;
    states[statesLength - 1].innerHTML = `<i>2023</i>`;

    let moveSize = menus[0].scrollWidth / page.scrollWidth;

    const setSizes = () => {
        columns = Math.trunc(window.innerWidth / 340);
        page.style.width = `${(allColumns / columns) * 100}%`;
        image.style.width = `${(allColumns / columns) * 100}%`;
        outColumns = allColumns - columns;
        moveSize = menus[0].scrollWidth / page.scrollWidth;
        for (let menu of menus) {
            menu.style.width = `${100 / allColumns}%`;
        }
    };
    setSizes();
    window.addEventListener('resize', setSizes);
    next.addEventListener('click', () => {
        for (let i = 0; i < statesLength; i++) {
            if (states[i].classList.contains('active') && i < statesLength - 1) {
                states[i].classList.remove('active');
                states[i + 1].classList.add('active');
                page.style.transform = `translateX(-${moveSize * 100 * (i + 1)}%)`;
                return;
            } else if (states[i].classList.contains('active') && i === statesLength - 1) {
                states[i].classList.remove('active');
                states[0].classList.add('active');
                page.style.transform = `translateX(0)`
            }
        }
    });
    prev.addEventListener('click', () => {
        for(let i = statesLength - 1; i >= 0; i--) {
            if (states[i].classList.contains('active') && i > 0) {
                states[i].classList.remove('active');
                states[i - 1].classList.add('active');
                page.style.transform = `translateX(-${moveSize * 100 * (i - 1)}%)`;
                return;
            } else if (states[i].classList.contains('active') && i === 0) {
                states[i].classList.remove('active');
                states[statesLength - 1].classList.add('active');
                page.style.transform = `translateX(-${moveSize * 100 * (statesLength - 1)}%)`;
            }
        }
    });

    gsap.to('.roadmap-slider-img', {
        scrollTrigger: {
            trigger: '.roadmap-slider',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
        // scale: 1,
        transform: `translateX(${slider.offsetWidth - image.offsetWidth}px)`,
    })
}

roadmapSlider();

function marketplaceSlider() {
    const images = document.querySelectorAll('.marketplace-img');
    const prev = document.querySelector('.marketplace-slider-btn.prev');
    const next = document.querySelector('.marketplace-slider-btn.next');

    next.addEventListener('click', () => {
        for (let i = 0; i < images.length; i++) {
            if (
                images[i].classList.contains('active') &&
                i < images.length - 1
            ) {
                images[i].classList.remove('active');
                images[i + 1].classList.add('active');
                return;
            } else if (
                images[i].classList.contains('active') &&
                i === images.length - 1
            ) {
                images[i].classList.remove('active');
                images[0].classList.add('active');
                return;
            }
        }
    });
    prev.addEventListener('click', () => {
        for (let i = images.length - 1; i >= 0; i--) {
            if (images[i].classList.contains('active') && i > 0) {
                images[i].classList.remove('active');
                images[i - 1].classList.add('active');
                return;
            } else if (images[i].classList.contains('active') && i === 0) {
                images[i].classList.remove('active');
                images[images.length - 1].classList.add('active');
                return;
            }
        }
    });
}
marketplaceSlider();

function navHandler() {
    const menu = document.querySelector('.nav-menu');
    const burger = document.querySelector('.nav-burger');
    const closeBtn = document.querySelector('.nav-close');

    const close = () => {
        menu.classList.remove('active');
        document.body.classList.remove('scrollBlock');
    };
    const open = () => {
        menu.classList.add('active');
        document.body.classList.add('scrollBlock');
    };

    burger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
}
navHandler();

function teamSlider() {
    const wrapper = document.querySelector('.team-members');
    const body = document.querySelector('.team-members-body');
    const total = Math.round(body.offsetWidth / wrapper.offsetWidth);
    const next = document.querySelector('.team-members-btn.next');
    const prev = document.querySelector('.team-members-btn.prev');
    const nav = document.querySelector('.team-members-nav-map');
    const stateHtml = `<div class="team-members-nav-state"></div>`;
    const gap = 100 / total;
    nav.innerHTML = stateHtml.repeat(total);
    const states = document.querySelectorAll('.team-members-nav-state');
    states[0].classList.add('active');

    next.addEventListener('click', () => {
        for (let i = 0; i < total; i++) {
            if (states[i].classList.contains('active') && i < total - 1) {
                body.style.transform = `translateX(-${gap * (i + 1)}%)`;
                states[i].classList.remove('active');
                states[i + 1].classList.add('active');
                return;
            } else if (
                states[i].classList.contains('active') &&
                i === total - 1
            ) {
                body.style.transform = `translateX(0)`;
                states[i].classList.remove('active');
                states[0].classList.add('active');
                return;
            }
        }
    });
    prev.addEventListener('click', () => {
        for (let i = total - 1; i >= 0; i--) {
            if (states[i].classList.contains('active') && i > 0) {
                body.style.transform = `translateX(-${gap * (i - 1)}%)`;
                states[i].classList.remove('active');
                states[i - 1].classList.add('active');
                return;
            } else if (states[i].classList.contains('active') && i === 0) {
                body.style.transform = `translateX(-${gap * (total - 1)}%)`;
                states[i].classList.remove('active');
                states[total - 1].classList.add('active');
                return;
            }
        }
    });
}
teamSlider();

function partnersSlider() {
    const wrapper = document.querySelector('.partners-slider');
    const body = document.querySelector('.partners-slider-body');
    const nav = document.querySelector('.partners-slider-nav');
    const prev = document.getElementById('partner-slider-btn-prev');
    const next = nav.querySelector('.partners-slider-btn.next');
    const total = Math.round(body.offsetWidth / wrapper.offsetWidth);
    const stateHtml = `<span class="partners-slider-navState" style="display: none"></span>`;
    nav.innerHTML += stateHtml.repeat(total);
    const states = document.querySelectorAll('.partners-slider-navState');
    states[0].classList.add('active');
    const gap = 100 / total;
    next.addEventListener('click', () => {
        for (let i = 0; i < total; i++) {
            if (states[i].classList.contains('active') && i < total - 1) {
                states[i].classList.remove('active');
                states[i + 1].classList.add('active');
                body.style.transform = `translateX(-${gap * (i + 1)}%)`;
                return;
            } else if (
                states[i].classList.contains('active') &&
                i === total - 1
            ) {
                states[i].classList.remove('active');
                states[0].classList.add('active');
                body.style.transform = `translateX(0)`;
                return;
            }
        }
    });

    prev.addEventListener('click', () => {
        for (let i = total - 1; i >= 0; i--) {
            if (states[i].classList.contains('active') && i > 0) {
                states[i].classList.remove('active');
                states[i - 1].class.add('active');
                body.style.transform = `translateX(-${gap * (i - 1)}%)`;
                return;
            } else if (states[i].classList.contains('active') && i === 0) {
                states[i].classList.remove('active');
                states[total - 1].class.add('active');
                body.style.transform = `translateX(-${gap * (total - 1)}%)`;
                return;
            }
        }
    });
}
// partnersSlider();

function legendWrapper() {
    const btn = document.querySelector('.legend-btn');
    const btnText = document.querySelector('.legend-btn i');
    const texts = document.querySelectorAll('.legend-content-text p span');

    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            for (let text of texts) {
                text.style.height = 0;
                text.style.opacity = 0;
                btnText.textContent = 'learn more';
                btn.classList.remove('active');
            }
        } else {
            for (let text of texts) {
                text.style.height = text.scrollHeight + 'px';
                text.style.opacity = 1;
                btnText.textContent = 'hide';
                btn.classList.add('active');
            }
        }
    });
}
legendWrapper();

function videoModal() {
    const modalBg = document.querySelector('.videoModal-bg');
    const iframe = modalBg.querySelector('iframe');
    const btnOpen = document.querySelector('.legend-hand');
    const btnClose = document.querySelector('.videoModal-btn');

    const stop = () => {
        const url = iframe.getAttribute('src');
        iframe.setAttribute('src', '');
        iframe.setAttribute('src', url);
    };
    const open = () => modalBg.classList.add('active');
    const close = () => {
        stop();
        modalBg.classList.remove('active');
    };

    btnOpen.addEventListener('click', open);
    btnClose.addEventListener('click', close);
}
videoModal();
