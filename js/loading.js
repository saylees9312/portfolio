document.addEventListener('DOMContentLoaded', () => {
    const progress = document.querySelector('.progress');
    const progressTxt = progress.querySelector('.progress-text');
    const progressNo = progress.querySelector('.progress-down');
    const progressImg = progress.querySelector('.progress-img');
    const snowContainer = document.querySelector('.snow-container');

    generateSnow(snowContainer);

    document.addEventListener('mousemove', (event) => {
        let windOffset = (event.clientX / window.innerWidth - 0.5) * 50; // 움직이는 반경 증가
        document.querySelectorAll('.snow').forEach((snow, index) => {
            if (index % 3 === 0) {
                // 일부 눈만 영향을 받도록 조정
                snow.style.transform = `translateX(${windOffset}px)`;
            }
        });
    });

    function generateSnow(container) {
        for (let i = 0; i < 100; i++) {
            let snow = document.createElement('div');
            snow.className = 'snow';
            let size = Math.random() * 10 + 4; // 4px ~ 14px 크기 랜덤 지정
            snow.style.width = `${size}px`;
            snow.style.height = `${size}px`;
            snow.style.opacity = Math.random() * 0.5 + 0.5; // 0.5 ~ 1.0 투명도 랜덤 지정
            snow.style.position = 'absolute';
            snow.style.left = `${Math.random() * 100}vw`;
            snow.style.top = `${-Math.random() * 20}vh`;
            snow.style.animation = `fall ${3 + Math.random() * 3}s linear infinite`;
            snow.style.backgroundColor = 'white';
            container.appendChild(snow);
        }
    }

    const text = document.querySelector('.progress-text strong');
    const txt = new SplitType(text, { types: 'chars' });

    const textTl = gsap.timeline({ repeat: -1 });
    textTl.from('.char', {
        duration: 0.5,
        y: -100,
        ease: 'bounce.Out',
        autoAlpha: 0,
        stagger: 0.2,
    });

    const body = document.body;

    // 이미지 로딩 상태를 확인하는 imagesLoaded() 사용.
    const imgLoad = imagesLoaded(body);
    // console.log(imgLoad);

    // 로드할 이미지의 전체 갯수
    const imgTotal = imgLoad.images.length;

    // 현재 로딩된 이미지 갯수
    let imgLoaded = 0;

    // 이미지가 로딩될 때마다 imgLoaded를 증가
    imgLoad.on('progress', () => {
        imgLoaded++;
        // console.log(imgLoaded);
    });

    // 부드럽게 갱신하기 위한 변수(전역설정의 필요)
    let current = 0;

    // 반복될 동작을 함수로 정의 -> 진행상황을 파악해서 할 일들...
    function updateProgress() {
        // 퍼센트 계산
        const percent = (imgLoaded / imgTotal) * 100;
        current += (percent - current) * 0.05;
        // console.log(percent, current);

        // 정보 업데이트
        progressNo.textContent = Math.round(current) + '%';

        if (Math.round(current) < 100) {
            // 로딩이 완료되기 전 상황 --> 부드러운 반복
            requestAnimationFrame(updateProgress);
        } else {
            // 로딩이 완료된 상황
            const tl = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: 'power4.inOut',
                },
            });
            tl.to(progressTxt, { autoAlpha: 0 }, '-=0.4');
            tl.to(progress, { bottom: '100%' }, '-=0.3');
            tl.to(snowContainer, { autoAlpha: 0 }, '-=0.3');
        }
    }

    // 함수 실행
    updateProgress();
});
