const getRandomFloat = (min, max) => (Math.random() * (max - min)) + min;

let width = window.innerWidth;
let height = window.innerHeight;
let allLines = [];
let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(scene.position);
scene.add(camera);

let renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor('#0e0e0f')
document.body.appendChild(renderer.domElement);

render();
randomAddLine(scene);

function render() {

  for (let index = allLines.length - 1; index >= 0; index--) {
    let line = allLines[index]
    if (line.material.dashOffset < -line.diedAt) {
      scene.remove(line);
      allLines.splice(index, 1);
    } else {
      line.material.dashOffset -= 0.02;
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}


function randomAddLine(scene) {
  setInterval(() => {
    if (Math.random() < 0.1) {
      allLines.push(addLine(scene))
    }
  }, 100)
}

/**
 * 在随机位置添加随机长度的线
 * @param {*} scene 
 */
function addLine(scene) {
  let length = getRandomFloat(3, 6); // 随机长度
  let points = createLinePoints(length, 3, new THREE.Vector3(-1, -1, 0));
  let lineMesh = createLineMesh(points, new THREE.Vector3(
    getRandomFloat(-4, 8),
    getRandomFloat(-3, 5),
    getRandomFloat(-2, 5),
  ));
  scene.add(lineMesh);
  return lineMesh;
}

/**
 * 创建指定方向的线上的点。 
 * @param {*} lineLength  线的长度
 * @param {*} nbrOfPoints 点的个数
 * @param {*} orientation 方向
 */
function createLinePoints(lineLength = 2, nbrOfPoints = 3, orientation = new THREE.Vector3(0, 0, 0)) {
  let linePoints = [];
  // 原点
  const currentPoint = new THREE.Vector3(0, 0, 0);
  linePoints.push(currentPoint.clone());

  // 对方向向量归一化，并算出两个点之间长度
  const segment = orientation.normalize().multiplyScalar(lineLength / nbrOfPoints);

  for (let index = 0; index < nbrOfPoints; index++) {
    currentPoint.add(segment);
    linePoints.push(currentPoint.clone());
  }
  // 返回一个 Geometry
  return new THREE.Geometry().setFromPoints(linePoints);
}

/**
 * 创建 Mesh Line
 * @param {*} points line 所依赖的点
 * @param {*} position line 的位置
 * @param {*} option MeshLineMaterial 配置
 */
function createLineMesh(points, position, option) {
  let line = new MeshLine();
  line.setGeometry(points);

  let material = new MeshLineMaterial({
    color: new THREE.Color('#e6e0e3'),
    opacity: 1,
    depthWrite: false,

    lineWidth: .1,

    dashArray: 2, // 0 ~ 1。0, 超过 1 的话
    dashOffset: 0,
    dashRatio: 0.75, // 空白长度/显示的长度 比例。其中每段空白的长度为 线长 * dashArray * dashRatio
  });
  let lineMesh = new THREE.Mesh(line.geometry, material);
  lineMesh.position.set(position.x, position.y, position.z);

  let dashArray = 2;
  let dashRatio = 0.75;
  lineMesh.diedAt = 1 + dashArray - dashArray * dashRatio;

  return lineMesh;
}