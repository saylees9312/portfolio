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
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 10,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
                enable: false,
                distance: 500,
                color: '#ffffff',
                opacity: 0.4,
                width: 2,
            },
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
                bubble: {
                    distance: 400,
                    size: 4,
                    duration: 0.3,
                    opacity: 1,
                    speed: 3,
                },
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
    const sec3 = document.querySelector('.project');
    const contactMe = document.querySelector('.btn-contact');
    const menuList = document.querySelectorAll('.menu li');
    const sections = document.querySelectorAll('#main section');

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
        gsap.to(cursor, {
            left: x,
            top: y,
            translateX: '-50%',
            translateY: '-50%',
        });

        gsap.to(followCursor, { left: mx, top: my });
    });

    sec3.addEventListener('mouseenter', () => {
        followCursor.style.display = 'none';
        contactMe.style.display = 'none';
    });

    // section3 영역에서 나오면 followCursor 다시 보이게 하기
    sec3.addEventListener('mouseleave', () => {
        followCursor.style.display = 'block';
        contactMe.style.display = 'block';
    });

    // 컨텍미 버튼 클릭시 컨텍 섹션으로 이동
    contactMe.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: '.contact',
            duration: 1,
            ease: 'power2.inOut',
        });
    });

    // 스크롤 다운 애니메이션
    const mini = document.querySelector('.mini');
    const minitxt = new SplitType(mini, { types: 'chars' });

    console.log(minitxt);

    gsap.from('.mini .char', {
        y: -30,
        autoAlpha: 0.1,
        ease: 'bounce.out',
        yoyo: true,
        stagger: 0.3,
        repeat: -1,
    });

    // 메뉴를 클릭할때
    menuList.forEach(function (menu, index) {
        // 클릭한 메뉴의 li의 index값을 가져와
        // menu[index];
        // console.log(menu, index, this);
        menu.addEventListener('click', function () {
            gsap.to(window, {
                scrollTo: sections[index],
            });
        });
    });
    // 해당하는 섹션의 인덱스값에 적용해서 이동

    console.log(cursor);
    // section1 글자 자르기
    const sec1 = document.querySelector('.info');
    const title = document.querySelector('.info .sec-title');
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

    tl.from(title, {
        opacity: 0,
        y: 50,
    });

    tl.from(title2, {
        opacity: 0,
        y: 50,
    });

    tl.from('.txt .char', {
        opacity: 0.1,
        stagger: 0.03,
    });

    tl.from(
        '.info p',
        {
            opacity: 0,
            y: 50,
        },
        '-=0.8'
    );

    // 자석처럼 붙는 프로필
    class MagneticButton {
        constructor(element, options = {}) {
            this.element = element;
            this.magnetRadius = options.magnetRadius || 150;
            this.easing = options.easing || 0.1;
            this.strength = options.strength || 0.3;

            // CSS에서 지정된 초기 위치를 읽어옵니다.
            const computedStyle = window.getComputedStyle(element);
            this.initialX = parseFloat(computedStyle.left) || 0; // CSS에서 지정된 'left'값 읽기
            this.initialY = parseFloat(computedStyle.top) || 0; // CSS에서 지정된 'top'값 읽기

            this.mouseX = 0;
            this.mouseY = 0;
            this.btnX = this.initialX; // 초기 위치로 설정
            this.btnY = this.initialY; // 초기 위치로 설정
            this.targetX = this.initialX;
            this.targetY = this.initialY;
            this.isNear = false;

            this.init();
        }

        init() {
            // 마우스 이벤트 리스너 등록
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            // 애니메이션 시작
            this.animate();
        }

        handleMouseMove(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            const btnRect = this.element.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            const dx = this.mouseX - btnCenterX;
            const dy = this.mouseY - btnCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.magnetRadius) {
                this.targetX = this.initialX + dx * this.strength;
                this.targetY = this.initialY + dy * this.strength;
                this.isNear = true;
            } else {
                this.isNear = false;
            }
        }

        animate = () => {
            if (!this.isNear) {
                // 화면 중앙이 아닌 초기 위치로 돌아가도록 수정
                this.targetX = this.initialX;
                this.targetY = this.initialY;
            }
            this.btnX += (this.targetX - this.btnX) * this.easing;
            this.btnY += (this.targetY - this.btnY) * this.easing;

            this.element.style.left = `${this.btnX.toFixed(3)}px`;
            this.element.style.top = `${this.btnY.toFixed(3)}px`;

            requestAnimationFrame(this.animate);
        };
    }

    // 사용 예시
    const name = document.querySelector('.name');
    new MagneticButton(name, {
        magnetRadius: 150,
        easing: 0.1,
        strength: 0.3,
    });

    const keywords = document.querySelector('.keywords');
    new MagneticButton(keywords, {
        magnetRadius: 150,
        easing: 0.1,
        strength: 0.3,
    });

    const email = document.querySelector('.email');
    new MagneticButton(email, {
        magnetRadius: 150,
        easing: 0.1,
        strength: 0.3,
    });

    const phone = document.querySelector('.phone');
    new MagneticButton(phone, {
        magnetRadius: 150,
        easing: 0.1,
        strength: 0.3,
    });

    // 호버할때 프리뷰 보여주기
    const project = document.querySelector('.project');
    const sec3Bg = project.querySelector('.sec3-bg');
    const projectItems = document.querySelectorAll('.project-list li');
    const previewFigures = document.querySelectorAll('.preview figure');
    const previewContainer = document.querySelector('.preview');
    const previewImg = previewContainer.querySelector('img');
    const popWrap = document.querySelector('.popup-wrap');
    const popUp = document.querySelector('.popup');
    const btnClose = document.querySelector('.btn-close');
    const processBtn = document.querySelectorAll('.btn-process');

    gsap.set(previewContainer, {
        autoAlpha: 0,
        scale: 0.9,
    });

    const projectTL = gsap.timeline();
    projectTL.to(sec3Bg, {
        scrollTrigger: {
            trigger: project,
            start: 'top 0',
            end: '+=200%',
            pin: true,
            // markers: true,
        },
        autoAlpha: 1,
        y: 0,
        ease: 'power2.inOut',
        stagger: 0.3,
        duration: 1,
    });

    projectItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            previewImg.setAttribute('src', `./img/preview-img${index + 1}.jpg`);
            gsap.from(previewFigures, {
                autoAlpha: 0,
                scale: 0.9,
                duration: 0.3,
            }); // 모든 미리보기 숨기기
            gsap.to(previewContainer, {
                autoAlpha: 1,
                scale: 1,
            });
            gsap.to(previewFigures, {
                autoAlpha: 1,
                scale: 1,
            });
            console.log(previewImg);
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(previewFigures[index], {
                autoAlpha: 0,
                scale: 0.9,
                duration: 0.3,
            }); // 마우스 떼면 숨김
            gsap.to(
                previewContainer,
                {
                    autoAlpha: 0,
                    duration: 0.4,
                },
                '<'
            );
        });
    });
    // 커서대신 프리뷰가 따라다니기 y축만
    sec3.addEventListener('mousemove', (e) => {
        gsap.to(previewContainer, { top: e.clientY - e.clientY * 0.5 });
    });

    btnClose.addEventListener('click', () => {
        gsap.to(popWrap, {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.5,
        });
    });

    processBtn.addEventListener('click', function () {
        gsap.to(popWrap, {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
        });
    });

    // 팝업창 갱신시키기
});
