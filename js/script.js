document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);
    particlesJS('particles-js', {
        particles: {
            number: { value: 400, density: { enable: true, value_area: 800 } },
            color: { value: '#fff' },
            shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000000' },
                polygon: { nb_sides: 5 },
                image: { src: 'img/github.svg', width: 100, height: 100 },
            },
            opacity: { value: 0.5, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 10, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: false, distance: 500, color: '#ffffff', opacity: 0.4, width: 2 },
            move: {
                enable: true,
                speed: 3,
                direction: 'bottom',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'bubble' },
                onclick: { enable: true, mode: 'repulse' },
                resize: true,
            },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 0.5 } },
                bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
            },
        },
        retina_detect: true,
    });

    // 마우스 커서
    const cursor = document.querySelector('.cursor');
    const followCursor = document.querySelector('.cursor-follow');
    let x = 0;
    let y = 0;
    let mx = 0;
    let my = 0;
    const speed = 0.06;

    window.addEventListener('mousemove', (e) => {
        x = e.pageX;
        y = e.pageY;

        mx += ((x - mx) / 2) * speed;
        my += ((y - my) / 2) * speed;
        gsap.to(cursor, { left: x, top: y, translateX: '-50%', translateY: '-50%' });
        gsap.to(followCursor, { left: mx, top: my });
    });
    console.log(cursor);
    // section1 글자 자르기
    const sec1 = document.querySelector('.section1');
    const title = document.querySelector('.section1 .sec-title');
    const title2 = document.querySelector('.txt');
    const text = new SplitType(title2, { types: 'chars' });
    const bg = document.querySelector('.sec1-bg');
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sec1,
            start: 'top 0',
            end: '+=500%',
            scrub: 1,
            pin: true,
        },
    });

    tl.to(bg, {
        autoAlpha: 1,
        width: '100%',
        height: '100%',
        translateX: '0',
        translateY: '0',
    });

    tl.from(title2, {
        opacity: 0,
        y: 50,
    });

    tl.from('.char', {
        opacity: 0.1,
        stagger: 0.03,
    });

    tl.from(
        '.section1 p',
        {
            opacity: 0,
            y: 50,
        },
        '-=0.8'
    );

    // 자석처럼 붙는 프로필

    // 호버할때 프리뷰 보여주기

    // 커서대신 프리뷰가 따라다니기

    // 프리뷰에 모자이크 효과 넣어주자!
});
