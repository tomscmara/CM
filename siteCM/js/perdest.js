document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const slideshowContainer = document.querySelector('.slideshow-container');

    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);
    let camera, currentMesh;

    const holograms = {
        0: "CAPITOL.glb",
        1: "DIST 1.glb",
        2: "DIST 2.glb",
        3: "DIST 3.glb",
        4: "DIST 4.glb",
        5: "DIST 5.glb",
        6: "DIST 6.glb",
        7: "DIST 7.glb",
        8: "DIST 8.glb",
        9: "DIST 9.glb",
        10: "DIST 10.glb",
        11: "DIST 11.glb",
        12: "DIST 12.glb",
        13: "DIST 13.glb"
    };

    function initScene() {
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // transparente
        new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        camera = new BABYLON.ArcRotateCamera("arcCamera", Math.PI / 2, Math.PI / 3, 30, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
    }

    function loadHologram(index) {
        const modelFile = holograms[index];
        if (!modelFile) return;

        if (currentMesh) {
            currentMesh.dispose();
        }

        BABYLON.SceneLoader.ImportMesh("", "/hologramas/", modelFile, scene, (meshes) => {
            currentMesh = meshes[0];
            const boundingInfo = currentMesh.getBoundingInfo();
            const center = boundingInfo.boundingBox.centerWorld;
            camera.target = center;
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        loadHologram(index);
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

    initScene();
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    showSlide(slideIndex);
});