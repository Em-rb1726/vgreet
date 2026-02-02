document.addEventListener("DOMContentLoaded", function () {
    const noButton = document.getElementById('no');
    const yesButton = document.getElementById('yes');
    const buttonContainer = document.querySelector('.button-container'); 

    let isAbsolute = false;

    function makeAbsolute() {
        if (isAbsolute) return;
        const rect = noButton.getBoundingClientRect();
        noButton.style.position = 'absolute';
        noButton.style.left = `${rect.left}px`;
        noButton.style.top = `${rect.top}px`;
        isAbsolute = true;
    }

    noButton.addEventListener('mousemove', function (e) {
        makeAbsolute();

        const rect = noButton.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = centerX - mouseX;
        let dy = centerY - mouseY;
        const distance = Math.hypot(dx, dy) || 1;
        const force = 90;

        const pushX = (dx / distance) * force;
        const pushY = (dy / distance) * force;

        let newLeft = Math.max(20, Math.min(rect.left + pushX, window.innerWidth - rect.width - 20));
        let newTop  = Math.max(20, Math.min(rect.top + pushY, window.innerHeight - rect.height - 80));

        noButton.style.left = `${newLeft}px`;
        noButton.style.top = `${newTop}px`;

        noButton.style.transform = 'scale(1.1)';
        setTimeout(() => noButton.style.transform = 'scale(1)', 200);

        noButton.style.transform = 'scale(1.45)';
        setTimeout(() => noButton.style.transform = 'scale(1)', 300);
    });
    const body = document.body;

    noButton.addEventListener('mouseenter', popUpImages);
   
    const popImages = [
    "img/nailong.jpg",            
    "img/gugugaga.jpg",          
    "img/cry.jpg",
    "img/new.jpg",
];
    const yesPopImages = [
    "img/happy.jpg",       
    "img/japi.jpg",
    "img/hapi.jpg"
];
   function popUpImages(imageList) {
    for (let i = 1; i < 4; i++) {  
        if (imageList.length === 2) return;

        const img = document.createElement('img');
        img.src = imageList[Math.floor(Math.random() * imageList.length)];
        img.classList.add('pop-image');
        img.style.position = 'absolute';
        img.style.pointerEvents = 'none';

        const x = Math.random() * (window.innerWidth - 200) + 50;
        const y = Math.random() * (window.innerHeight - 200) + 50;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        body.appendChild(img);

        setTimeout(() => {
            img.style.opacity = '0';
            setTimeout(() => img.remove(), 800);
        }, 1500);
    }
}

noButton.addEventListener('mouseenter', () => {
    popUpImages(popImages);  
});

// NEW: For Yes button
yesButton.addEventListener('mouseenter', () => {
    popUpImages(yesPopImages);   
});


    yesButton.addEventListener('click', function () {
        alert('syempre wala ka namang choice, i shall take u to ondwings, mwehehehe #syempre_sa_gusto_ko_ring_lugar_kita_ililibre #cravings');
        confetti();
        document.getElementById("background-music").play();

        showCelebrationGif();
    });

    function showCelebrationGif() {
        const gifUrl = "img/Cat with a rose.gif"; 

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(0,0,0,0.5)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';

        const gif = document.createElement('img');
        gif.src = gifUrl;
        gif.style.maxWidth = '85vw';   
        gif.style.maxHeight = '85vh';
        gif.style.borderRadius = '25px';
        gif.style.boxShadow = '0 0 40px rgba(255, 105, 180, 0.9)'; // pink glow

        overlay.appendChild(gif);
        body.appendChild(overlay);
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1200);
        }, 20000);

        
        overlay.addEventListener('click', () => overlay.remove());
    }
});