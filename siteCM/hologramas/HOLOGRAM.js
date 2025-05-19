window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Luz simples
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Variáveis para a câmera — valores iniciais temporários
    let cameraAlpha = Math.PI / 2;
    let cameraBeta = Math.PI / 3;
    let cameraRadius = 10;
    let cameraTarget = BABYLON.Vector3.Zero();

    // Cria a câmera, sem target ainda
    const camera = new BABYLON.ArcRotateCamera('camera', cameraAlpha, cameraBeta, cameraRadius, cameraTarget, scene);
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = cameraRadius;
    camera.upperRadiusLimit = cameraRadius;
    camera.allowUpsideDown = false;
    camera.panningSensibility = 50;
    camera.wheelPrecision = 1;

    // Carrega o modelo
    BABYLON.SceneLoader.Append('/hologramas/', 'CAPITOL.glb', scene, () => {
      console.log('Model loaded!');

      // Acede ao mesh do objeto carregado
      const mesh = scene.meshes[scene.meshes.length - 1]; // geralmente o último é o carregado

      // Centraliza o objeto
      mesh.position = new BABYLON.Vector3(0, 0, 0);

      // Calcula o bounding info
      const boundingInfo = mesh.getBoundingInfo();

      // Pega o centro do bounding box
      const center = boundingInfo.boundingBox.centerWorld;

      // Ajusta o alvo da câmera para o centro do objeto
      camera.target = center;

      // Calcula o raio para a câmera baseado no tamanho do bounding box
      const extendSize = boundingInfo.boundingBox.extendSizeWorld;
      const maxExtend = Math.max(extendSize.x, extendSize.y, extendSize.z);

      // Define limites de zoom
      camera.lowerRadiusLimit = maxExtend * 5;  // Zoom máximo
      camera.upperRadiusLimit = maxExtend * 15; // Zoom mínimo

      // Define limites de ângulo vertical da câmera
      camera.lowerBetaLimit = Math.PI / 6;  // Ângulo mínimo
      camera.upperBetaLimit = Math.PI / 2;  // Ângulo máximo

      // Ajusta o raio inicial da câmera
      camera.radius = maxExtend * 1;

      // Multiplicador para afastar mais a câmera, experimenta aumentar se quiseres
      const distanceFactor = 1;

      cameraRadius = maxExtend * distanceFactor;

      // Aplica o raio à câmera
      
    }, null, (scene, message) => {
      console.error('Error loading model:', message);
    });

// Variável para guardar ângulo inicial da câmera (mesmo valor inicial que cameraAlpha)
const initialAlpha = Math.PI / 2;
const initialBeta = Math.PI / 3;

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const normalizedX = x / rect.width;
  const normalizedY = y / rect.height;

  // Ajusta o alpha para girar em torno do initialAlpha (centro da tela)
  targetAlpha = initialAlpha + (0.5 - normalizedX) * Math.PI; // -0.5 a +0.5 mapeado para -π/2 a +π/2 offset

  // Beta continua igual, mapeando de cima para baixo
  targetBeta = Math.PI / 4 + normalizedY * (Math.PI / 6);

  updateCamera();
});

    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
});
