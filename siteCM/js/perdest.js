document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const slideshowContainer = document.querySelector('.slideshow-container');

    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);
    let camera, currentMesh;

    const holograms = {
        0: "DIST 1.glb",
        1: "D2.glb",
        2: "district3.glb",
        3: "district4.glb",
        4: "district5.glb",
        5: "district6.glb",
        6: "district7.glb",
        7: "district8.glb",
        8: "district9.glb",
        9: "district10.glb",
        10: "district11.glb",
        11: "district12.glb",
        12: "district13.glb"
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

    initScene();
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    showSlide(slideIndex);
});