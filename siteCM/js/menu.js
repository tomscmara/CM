document.addEventListener("DOMContentLoaded", () => {
    const districts = document.querySelectorAll('.district');
    const audioMap = {};
    let audioUnlocked = false;

    function unlockAudio() {
        Object.values(audioMap).forEach(audio => {
            // Play and immediately pause to unlock it
            audio.play().then(() => audio.pause()).catch(() => {});
        });
        audioUnlocked = true;
        document.removeEventListener('click', unlockAudio);
    }

    document.addEventListener('click', unlockAudio);

    document.querySelector('.menu-button').addEventListener('click', () => {
        document.querySelector('.menu').classList.toggle('active');
    });

    document.querySelector('.close-menu').addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('active');
    });

    districts.forEach(district => {
        const soundPath = district.getAttribute('data-sound');
        if (soundPath) {
            const audio = new Audio(soundPath);
            audioMap[district.id] = audio;

            district.addEventListener('mouseenter', () => {
                if (audioUnlocked) {
                    audio.currentTime = 0;
                    audio.play();
                }
            });

            district.addEventListener('mouseleave', () => {
                if (audioUnlocked) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        }
    });
});
