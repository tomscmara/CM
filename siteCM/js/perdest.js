document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const slideshowContainer = document.querySelector('.slideshow-container');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    document.querySelector('.next').addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            slideshowContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    showSlide(slideIndex);
});
