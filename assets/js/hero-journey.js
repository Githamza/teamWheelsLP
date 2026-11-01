/*
  Hero journey — subtle isometric Three.js backdrop behind the pill + H1 of
  the one-column hero (layouts/partials/hero-journey.html). Bundled by Hugo's
  js.Build, which tree-shakes `three` from node_modules.

  One road, drawn like the hero's decorative swoosh (a thick, rounded,
  off-white ribbon, no ground): it starts among the homes bottom-left,
  loops up, runs above the pill with a second loop, loops again on the
  right and ends at Site A's car park; a short spur leads down to Site B.

  The road is authored in *screen* proportions (ROUTE_UV: u = 0…1 across the
  stage, v = 0…1 down it, for a DESIGN_ASPECT-wide stage) and projected onto
  the ground plane, so its shape matches the sketch whatever the camera.

  Two scenarios on the same map and the same 9 colleagues, played in turn:
  - "without": 9 solo cars → slow loops, smoke, the car parks fill up, a
    honking queue at the car-park entrance.
  - "with": 3 TeamWheels carpools (driver + pick-ups), chat bubbles, free
    spots; then two colleagues ride to Site B (inter-site trip).
*/
import {
  Scene, OrthographicCamera, WebGLRenderer, Color, Vector3, Group, Mesh,
  BoxGeometry, CylinderGeometry, SphereGeometry, CircleGeometry, IcosahedronGeometry,
  PlaneGeometry, BufferGeometry, Float32BufferAttribute, CatmullRomCurve3, Shape, ExtrudeGeometry,
  MeshLambertMaterial, MeshBasicMaterial, ShadowMaterial, HemisphereLight, DirectionalLight,
  Sprite, SpriteMaterial, CanvasTexture, PCFSoftShadowMap, SRGBColorSpace,
} from 'three';

const HW = 20;                 // half the stage width, in world units
const DESIGN_ASPECT = 3.6;     // stage width / height the route is drawn for
const ROAD_W = 1.1;
const CAR_GAP = 1.05;          // centre-to-centre distance kept to the car ahead
const ACCEL = 9, BRAKE = 18;
const SPEED = 7, LOT_SPEED = 2.8;
const WALK = 2.2;
const MAX_LENGTH = 32;         // safety cap per scenario (seconds)
const HOLD = 3;                // pause on the finished scene before switching

// The sketch: homes bottom-left → loop → above the pill (loop) → loop → Site A.
const ROUTE_UV = [
  [0.045, 0.60], [0.09, 0.58], [0.135, 0.52], [0.165, 0.43], [0.165, 0.32],  // up from the homes
  [0.145, 0.22], [0.115, 0.22], [0.10, 0.31], [0.12, 0.41], [0.165, 0.46],   // loop 1 (crosses itself)
  [0.23, 0.46], [0.30, 0.38], [0.36, 0.26], [0.41, 0.15],                     // rise towards the pill
  [0.45, 0.10], [0.49, 0.14], [0.49, 0.24], [0.455, 0.27], [0.43, 0.20],     // loop 2, above the pill
  [0.46, 0.11], [0.52, 0.065], [0.59, 0.06], [0.64, 0.11],                    // over the top
  [0.69, 0.20], [0.725, 0.28], [0.755, 0.22], [0.755, 0.13], [0.73, 0.11],   // down into loop 3
  [0.715, 0.18], [0.735, 0.28], [0.765, 0.33], [0.79, 0.345],                 // out of it → Site A
];

const C = {
  road: 0xeef2f9, lot: 0xc5cfe6, line: 0xffffff,
  tree: 0x6cbf8a, tree2: 0x9ad4a0, trunk: 0x8a6a55,
  hero: 0x6d4fc7, pool1: 0x4d51a9, pool2: 0x1f6fc4,
  solo: [0xf5b83d, 0xf2784b, 0xe0566a, 0x8c95a8, 0x2bb3a6, 0x5b6078, 0xd98fb5],
  parked: [0xd9dfeb, 0xc3cad9, 0xeedaa8, 0xcfd6e4, 0xeec2b0],
  walls: [0xffffff, 0xfdf3e7, 0xf3f0ff, 0xeef6ff, 0xfff4f2],
  roofs: [0xf2a49a, 0x8f93cf, 0xf6c49b, 0x9cc3ee, 0xc9b8ef, 0xf7b8b0],
  shirts: [0x6d4fc7, 0x1f6fc4, 0xe58f6f, 0x2fa37a, 0xe6b35a, 0xd9587a, 0x4d51a9],
  skins: [0xf1c7a5, 0xd9a07a, 0xa86f4c, 0x7a4b31, 0xf5d6bf],
};

/* --------------------------------------------------------------- paths --- */

const v3 = (x, z) => new Vector3(x, 0, z);

class Path {
  constructor(pts) {
    this.pts = pts;
    this.cum = [0];
    for (let i = 1; i < pts.length; i++) this.cum.push(this.cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
    this.length = this.cum[this.cum.length - 1];
  }
  seg(d) {
    let lo = 0, hi = this.cum.length - 2;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (this.cum[mid] <= d) lo = mid; else hi = mid - 1;
    }
    return lo;
  }
  at(d, pos, dir) {
    d = Math.min(Math.max(d, 0), this.length);
    const i = this.seg(d);
    const a = this.pts[i], b = this.pts[i + 1];
    const t = (d - this.cum[i]) / (this.cum[i + 1] - this.cum[i] || 1);
    pos.copy(a).lerp(b, t);
    if (dir) dir.copy(b).sub(a).normalize();
  }
  distOf(p) {
    let best = Infinity, bestD = 0;
    const ab = new Vector3(), ap = new Vector3(), q = new Vector3();
    for (let i = 0; i < this.pts.length - 1; i++) {
      const a = this.pts[i], b = this.pts[i + 1];
      ab.copy(b).sub(a);
      const len = ab.length();
      const t = Math.min(Math.max(ap.copy(p).sub(a).dot(ab) / (len * len || 1), 0), 1);
      q.copy(a).addScaledVector(ab, t);
      const dist = q.distanceTo(p);
      if (dist < best - 1e-6) { best = dist; bestD = this.cum[i] + t * len; }
    }
    return bestD;
  }
  // distance from a point to the path (keeps houses and trees off the road)
  clearance(p) {
    let best = Infinity;
    for (let i = 0; i < this.pts.length; i += 3) best = Math.min(best, this.pts[i].distanceTo(p));
    return best;
  }
}

/* ------------------------------------------------------------ textures --- */

function rr(g, x, y, w, h, r) {
  if (g.roundRect) g.roundRect(x, y, w, h, r);
  else g.rect(x, y, w, h);
}

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'));
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

const bubbleTexture = (text, opts = {}) => canvasTex(128, 128, (g) => {
  g.fillStyle = opts.bg || '#ffffff';
  g.strokeStyle = opts.stroke || 'rgba(11,19,43,.12)';
  g.lineWidth = opts.stroke ? 5 : 3;
  g.beginPath();
  rr(g, 10, 8, 108, 86, 30);
  g.moveTo(52, 92); g.lineTo(64, 116); g.lineTo(76, 92);
  g.fill(); g.stroke();
  g.fillStyle = opts.fg || '#0b132b';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = opts.font || '56px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  g.fillText(text, 64, 53);
});

const labelTexture = (text) => canvasTex(256, 72, (g) => {
  g.fillStyle = 'rgba(255,255,255,.92)';
  g.beginPath(); rr(g, 4, 6, 248, 60, 30); g.fill();
  g.fillStyle = '#4d51a9';
  g.font = '700 30px Catamaran, system-ui, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 128, 38);
});

const windowsTexture = () => canvasTex(128, 128, (g) => {
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#c7d6f0';
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) g.fillRect(12 + x * 28, 14 + y * 28, 16, 16);
});

/* --------------------------------------------------------------- scene --- */

export function mount(root) {
  const stage = root.querySelector('.hero-journey__stage');
  const haze = root.querySelector('.hero-journey__haze');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    root.classList.add('is-fallback');
    return;
  }
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.outputColorSpace = SRGBColorSpace;
  stage.prepend(renderer.domElement);

  const scene = new Scene();
  const camera = new OrthographicCamera(-HW, HW, HW / DESIGN_ASPECT, -HW / DESIGN_ASPECT, 0.1, 200);
  camera.position.set(3.2, 13, 15).multiplyScalar(2);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();

  // screen proportions (design frustum) ↔ ground plane
  const viewDir = new Vector3(0, 0, -1).transformDirection(camera.matrixWorld);
  function ground(u, v) {
    const p = new Vector3(u * 2 - 1, 1 - v * 2, 0).unproject(camera);
    return p.addScaledVector(viewDir, -p.y / viewDir.y).setY(0);
  }
  function screenUV(p) {
    const q = p.clone().project(camera);
    return [(q.x + 1) / 2, (1 - q.y) / 2];
  }

  scene.add(new HemisphereLight(0xffffff, 0xc9d3ea, 1.8));
  const sun = new DirectionalLight(0xfff6e8, 1.5);
  sun.position.set(-8, 18, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 1024);
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 14, bottom: -14, near: 1, far: 70 });
  sun.shadow.bias = -0.0008;
  scene.add(sun);

  const mats = new Map();
  const mat = (color) => {
    if (!mats.has(color)) mats.set(color, new MeshLambertMaterial({ color }));
    return mats.get(color);
  };
  const geoBox = new BoxGeometry(1, 1, 1);
  function box(parent, w, h, d, color, x, y, z, shadow = true) {
    const m = new Mesh(geoBox, typeof color === 'number' ? mat(color) : color);
    m.scale.set(w, h, d);
    m.position.set(x, y + h / 2, z);
    m.castShadow = shadow;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  let rnd = 1;
  const rand = () => ((rnd = (rnd * 16807) % 2147483647) / 2147483647);
  const pick = (a) => a[Math.floor(rand() * a.length)];

  /* ---- static world ---- */
  const world = new Group();
  scene.add(world);

  // no ground: the hero background shows through; this only catches shadows
  const catcher = new Mesh(new PlaneGeometry(120, 60), new ShadowMaterial({ opacity: 0.12 }));
  catcher.rotation.x = -Math.PI / 2;
  catcher.receiveShadow = true;
  world.add(catcher);

  // the route
  const curve = new CatmullRomCurve3(ROUTE_UV.map(([u, v]) => ground(u, v)), false, 'centripetal');
  const MAIN_PTS = curve.getSpacedPoints(900);
  const MAIN = new Path(MAIN_PTS);
  const E = MAIN_PTS[MAIN_PTS.length - 1].clone();          // car-park entrance

  const roadMat = new MeshLambertMaterial({ color: C.road });
  function ribbon(pts, width) {
    const pos = [], idx = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
      const dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1;
      const nx = -dz / l * width / 2, nz = dx / l * width / 2;
      const y = 0.01 + i * 0.00002;                           // later part on top where it crosses
      pos.push(pts[i].x + nx, y, pts[i].z + nz, pts[i].x - nx, y, pts[i].z - nz);
      if (i) { const k = i * 2; idx.push(k - 2, k, k - 1, k - 1, k, k + 1); }
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = new Mesh(g, roadMat);
    m.receiveShadow = true;
    world.add(m);
    // round cap at the start, like the swoosh
    const cap = new Mesh(new CircleGeometry(width / 2, 20), roadMat);
    cap.rotation.x = -Math.PI / 2;
    cap.position.set(pts[0].x, 0.009, pts[0].z);
    world.add(cap);
  }
  ribbon(MAIN_PTS, ROAD_W);

  // companies on the right: Site A's car park at the end of the road,
  // a spur down to Site B and its car park
  const SPOTS = 6, SP = 0.72;
  const spotX = (i) => E.x + 0.9 + i * SP;
  const AISLE_END = spotX(SPOTS - 1) + 0.9;                   // x of the spur
  const LOT = {
    A: { aisleZ: E.z, spotZ: E.z - 1.0, door: v3(E.x + 2.6, E.z - 2.0) },
    B: { aisleZ: E.z + 2.9, spotZ: E.z + 3.9, door: v3(E.x + 2.6, E.z + 4.9) },
  };
  const sideRoad = (x0, z0, x1, z1) => box(world, Math.abs(x1 - x0) + ROAD_W, 0.012, Math.abs(z1 - z0) + ROAD_W, roadMat, (x0 + x1) / 2, 0.004, (z0 + z1) / 2, false);
  sideRoad(E.x, E.z, AISLE_END, E.z);
  sideRoad(AISLE_END, E.z, AISLE_END, LOT.B.aisleZ);
  sideRoad(spotX(0) - 0.4, LOT.B.aisleZ, AISLE_END, LOT.B.aisleZ);
  for (const lot of Object.values(LOT)) {
    box(world, SPOTS * SP + 0.3, 0.01, 0.95, C.lot, spotX(0) + (SPOTS - 1) * SP / 2, 0.002, lot.spotZ, false);
    for (let i = 0; i <= SPOTS; i++) box(world, 0.035, 0.004, 0.85, C.line, spotX(0) - SP / 2 + i * SP, 0.012, lot.spotZ, false);
  }

  const winTex = windowsTexture();
  const wallMats = new Map();
  const wall = (color) => {
    if (!wallMats.has(color)) wallMats.set(color, new MeshLambertMaterial({ color, map: winTex }));
    return wallMats.get(color);
  };
  function building(x, z, w, h, d, color, trim) {
    const roof = mat(0xf4f6fb);
    const m = new Mesh(geoBox, [wall(color), wall(color), roof, roof, wall(color), wall(color)]);
    m.scale.set(w, h, d);
    m.position.set(x, h / 2, z);
    m.castShadow = m.receiveShadow = true;
    world.add(m);
    box(world, w + 0.06, 0.07, d + 0.06, trim || color, x, h, z);
  }
  function label(text, x, y, z) {
    const s = new Sprite(new SpriteMaterial({ map: labelTexture(text), depthTest: false }));
    s.scale.set(2.2, 0.62, 1);
    s.position.set(x, y, z);
    s.renderOrder = 10;
    world.add(s);
  }
  const ax = spotX(0) + (SPOTS - 1) * SP / 2;
  building(ax - 0.5, LOT.A.spotZ - 1.45, 2.6, 1.3, 1.3, 0xf6c49b);
  building(ax + 1.5, LOT.A.spotZ - 1.6, 1.1, 2.4, 1.1, 0x8fb4ee, C.hero);      // glass tower, brand roof
  building(ax - 0.2, LOT.B.spotZ + 1.35, 3, 0.95, 1.2, 0xf2a49a);
  building(ax + 1.9, LOT.B.spotZ + 1.3, 1, 1.5, 1, 0xffffff, C.pool1);
  label('Site A', ax + 0.4, 3.3, LOT.A.spotZ - 1.5);
  label('Site B', ax + 0.4, 2.3, LOT.B.spotZ + 1.3);
  const company = [E.x - 0.2, AISLE_END + 0.8, LOT.A.spotZ - 2.4, LOT.B.spotZ + 2.2];
  const inCompany = (p, m = 0) => p.x > company[0] - m && p.x < company[1] + m && p.z > company[2] - m && p.z < company[3] + m;

  // homes: little pitched-roof houses facing the road
  const roofGeo = (() => {
    const sh = new Shape();
    sh.moveTo(-0.48, 0); sh.lineTo(0.48, 0); sh.lineTo(0, 0.34); sh.lineTo(-0.48, 0);
    const g = new ExtrudeGeometry(sh, { depth: 0.78, bevelEnabled: false });
    g.translate(0, 0, -0.39);
    return g;
  })();
  const houses = [];
  const roomFor = (p, r) => MAIN.clearance(p) > r && !inCompany(p, 0.6) && houses.every((h) => h.pos.distanceTo(p) > 1.05);
  function addHouse(p, faceDir, i) {
    const g = new Group();
    g.position.copy(p);
    g.rotation.y = Math.atan2(faceDir.x, faceDir.z);           // local +z (door) → faceDir
    box(g, 0.8, 0.46, 0.7, C.walls[i % C.walls.length], 0, 0, 0);
    const roof = new Mesh(roofGeo, mat(C.roofs[i % C.roofs.length]));
    roof.rotation.y = Math.PI / 2;
    roof.position.y = 0.46;
    roof.castShadow = true;
    g.add(roof);
    box(g, 0.18, 0.26, 0.02, 0x6b5160, 0, 0, 0.36, false);
    world.add(g);
    const h = { pos: p.clone(), door: p.clone().addScaledVector(faceDir, 0.45) };
    houses.push(h);
    return h;
  }
  // a story house beside the road at distance d (on the side with room)
  const tmpP = new Vector3(), tmpD = new Vector3();
  function homeAt(d, i) {
    MAIN.at(d, tmpP, tmpD);
    const n = new Vector3(-tmpD.z, 0, tmpD.x);
    for (const off of [1.05, 1.35, 1.7]) {
      for (const s of [1, -1]) {
        const p = tmpP.clone().addScaledVector(n, s * off);
        if (roomFor(p, 0.95)) return { ...addHouse(p, n.clone().multiplyScalar(-s), i), d };
      }
    }
    return { ...addHouse(tmpP.clone().addScaledVector(n, 1.9), n.clone().multiplyScalar(-1), i), d };
  }
  // the 9 colleagues' homes, spread along the road (same in both stories):
  // 3 at the start, 6 on the way — carpools pick them up as they pass
  const HOME = [0.4, 1.7, 1.75].map((d, i) => homeAt(d, i))
    .concat([0.17, 0.27, 0.36, 0.46, 0.56, 0.66].map((f, i) => homeAt(f * MAIN.length, i + 3)));
  // more homes around them
  const start = MAIN_PTS[0];
  for (let k = 0, n = 0; k < 300 && n < 14; k++) {
    const p = start.clone().add(v3((rand() - 0.35) * 9, (rand() - 0.75) * 9));
    const [u, v] = screenUV(p);
    if (u < 0.03 || u > 0.26 || v < 0.12 || v > 0.7 || (u > 0.1 && v > 0.56)) continue;   // clear of the H1
    if (!roomFor(p, 1.0)) continue;
    const near = new Vector3();
    MAIN.at(MAIN.distOf(p), near);
    addHouse(p, near.sub(p).setY(0).normalize(), n + 3);
    n++;
  }

  // round trees around homes and companies; the centre (behind the H1) stays calm
  const trunkGeo = new CylinderGeometry(0.045, 0.06, 0.24, 6);
  const crownGeo = new IcosahedronGeometry(0.27, 0);
  const treeMat = new MeshLambertMaterial({ color: C.tree, flatShading: true });
  const treeMat2 = new MeshLambertMaterial({ color: C.tree2, flatShading: true });
  const trees = [];
  for (let k = 0, n = 0; k < 700 && n < 34; k++) {
    const p = v3((rand() - 0.5) * 2 * HW, (rand() - 0.5) * 14);
    const [u, v] = screenUV(p);
    if (u < 0.04 || u > 0.96 || v < 0.05 || v > 0.9) continue;
    if (u > 0.22 && u < 0.76 && v > 0.36) continue;
    if (MAIN.clearance(p) < 0.85 || inCompany(p, 0.2)) continue;
    if (houses.some((h) => h.pos.distanceTo(p) < 0.7) || trees.some((q) => q.distanceTo(p) < 0.45)) continue;
    trees.push(p);
    n++;
    const s = 0.8 + rand() * 0.4;
    const trunk = new Mesh(trunkGeo, mat(C.trunk));
    trunk.position.set(p.x, 0.12, p.z);
    const crown = new Mesh(crownGeo, rand() < 0.5 ? treeMat : treeMat2);
    crown.scale.setScalar(s);
    crown.position.set(p.x, 0.24 + 0.22 * s, p.z);
    crown.castShadow = trunk.castShadow = true;
    world.add(trunk, crown);
  }

  // drifting clouds
  const cloudMat = new MeshLambertMaterial({ color: 0xffffff });
  const cloudGeo = new SphereGeometry(0.42, 12, 8);
  const clouds = [[-14, -3], [-2, 2], [10, -4]].map(([x, z], i) => {
    const g = new Group();
    [[0, 0, 1], [0.45, 0.1, 0.8], [-0.45, 0, 0.75], [0.12, 0.28, 0.7]].forEach(([dx, dy, s]) => {
      const m = new Mesh(cloudGeo, cloudMat);
      m.position.set(dx, dy, 0);
      m.scale.set(s * 1.3, s * 0.8, s);
      m.castShadow = true;
      g.add(m);
    });
    g.position.set(x, 4 + (i % 2) * 0.5, z);
    world.add(g);
    return g;
  });

  // speed limit along the road: slow in the loops, braking ahead of them
  const VSTEP = 0.25;
  const vlim = [];
  {
    const a = new Vector3(), b = new Vector3(), da = new Vector3(), db = new Vector3();
    for (let d = 0; d <= MAIN.length; d += VSTEP) {
      MAIN.at(d, a, da); MAIN.at(d + 0.4, b, db);
      const k = Math.acos(Math.min(1, Math.max(-1, da.dot(db)))) / 0.4;
      vlim.push(Math.min(SPEED, Math.max(2.8, 2.4 / Math.max(k, 1e-3))));
    }
    for (let i = vlim.length - 2; i >= 0; i--) vlim[i] = Math.min(vlim[i], Math.sqrt(vlim[i + 1] ** 2 + 2 * 5 * VSTEP));
  }
  const limitAt = (d) => vlim[Math.min(vlim.length - 1, Math.max(0, Math.round(d / VSTEP)))];

  /* ---- shared dynamic assets ---- */
  const tex = {
    happy: ['💬', '😄', '😂', '🎶', '👋', '☕'].map((e) => bubbleTexture(e)),
    // red-faced fury (red-tinted bubble, red outline) and tired/annoyed faces
    angry: ['😡', '🤬', '😡', '🤬', '😤', '💢'].map((e) => bubbleTexture(e, { bg: '#ffe1dc', stroke: '#e0483e' })),
    grumpy: ['😩', '😫', '😠', '😒'].map((e) => bubbleTexture(e, { bg: '#fff3ea' })),
    honk: bubbleTexture('BEEP!', { bg: '#ffe1dc', stroke: '#e0483e', fg: '#d6453d', font: '800 30px system-ui, sans-serif' }),
  };
  const geo = {
    wheel: new CylinderGeometry(0.09, 0.09, 0.07, 10),
    head: new SphereGeometry(0.075, 10, 8),
    body: new CylinderGeometry(0.075, 0.095, 0.26, 8),
    puff: new SphereGeometry(0.13, 8, 6),
    disc: new CircleGeometry(0.75, 28),
  };
  const glass = new MeshLambertMaterial({ color: 0xdfe7ff, transparent: true, opacity: 0.45, depthWrite: false });

  /* ---- scenario state ---- */
  let cars = [], walkers = [], spots = {}, t = 0, mode = 'without';
  const dynamic = new Group();
  scene.add(dynamic);
  const puffs = [];
  for (let i = 0; i < 90; i++) {
    const m = new Mesh(geo.puff, new MeshBasicMaterial({ color: 0x8d8a86, transparent: true, depthWrite: false }));
    m.visible = false;
    m.userData.life = 0;
    scene.add(m);
    puffs.push(m);
  }
  let puffIdx = 0;
  let smogLevel = 0;
  const smogColor = new Color(0xa9a49c);

  function makeCar(color, glow) {
    const g = new Group();
    box(g, 0.9, 0.24, 0.48, color, 0, 0.09, 0);
    const cab = new Mesh(geoBox, glass);
    cab.scale.set(0.5, 0.2, 0.42);
    cab.position.set(-0.05, 0.43, 0);
    g.add(cab);
    box(g, 0.52, 0.03, 0.44, color, -0.05, 0.53, 0);
    for (const [x, z] of [[0.28, 0.25], [-0.28, 0.25], [0.28, -0.25], [-0.28, -0.25]]) {
      const w = new Mesh(geo.wheel, mat(0x23263a));
      w.rotation.x = Math.PI / 2;
      w.position.set(x, 0.09, z);
      g.add(w);
    }
    const heads = [[0.08, -0.1], [0.08, 0.1], [-0.17, 0]].map(([x, z]) => {
      const h = new Mesh(geo.head, mat(pick(C.skins)));
      h.position.set(x, 0.42, z);
      h.visible = false;
      g.add(h);
      return h;
    });
    if (glow) {
      const d = new Mesh(geo.disc, new MeshBasicMaterial({ color: glow, transparent: true, opacity: 0.22, depthWrite: false }));
      d.rotation.x = -Math.PI / 2;
      d.position.y = 0.035;
      g.add(d);
    }
    const bubble = new Sprite(new SpriteMaterial({ depthTest: false }));
    bubble.position.y = 1.25;
    bubble.visible = false;
    bubble.renderOrder = 20;
    g.add(bubble);
    dynamic.add(g);
    return {
      group: g, heads, bubble, bubbleT: 0, bubbleDur: 1, nextBubble: 1 + rand() * 2,
      occupants: 0, pending: 0, speed: 0, d: 0, angryFor: 0, smokeT: rand() * 0.4,
      dir: new Vector3(1, 0, 0), heading: 0, lot: null, spot: -1, stops: [],
    };
  }

  function person() {
    const g = new Group();
    const b = new Mesh(geo.body, mat(pick(C.shirts)));
    b.position.y = 0.13;
    const h = new Mesh(geo.head, mat(pick(C.skins)));
    h.position.y = 0.33;
    b.castShadow = h.castShadow = true;
    g.add(b, h);
    dynamic.add(g);
    return g;
  }

  function walk(from, to, delay, onDone) {
    const mesh = person();
    mesh.visible = false;
    mesh.position.copy(from);
    walkers.push({ mesh, from: from.clone(), to: to.clone(), t: -delay, dur: Math.max(from.distanceTo(to) / WALK, 0.4), onDone });
  }

  function aboard(c) {
    c.heads[Math.min(c.occupants, 2)].visible = true;
    c.occupants++;
    c.pending--;
    if (mode === 'without') { showBubble(c, pick(rand() < 0.5 ? tex.angry : tex.grumpy), 1.3); c.nextBubble = 1 + rand(); }   // off alone, again
  }

  function board(c, doors) {
    c.state = 'boarding';
    c.pending += doors.length;
    doors.forEach((p, i) => walk(p, c.group.position, i * 0.15, () => aboard(c)));
  }

  // a car on the road: starts at its home's road point, stops at pick-ups
  function car(opts) {
    const c = Object.assign(makeCar(opts.color, opts.glow), {
      path: MAIN, d: opts.d || 0, state: 'idle', startAt: opts.startAt || 0,
      stops: (opts.stops || []).map((s) => ({ ...s })), boardFrom: opts.boardFrom || [],
      prefer: opts.prefer || 'A', onPark: opts.onPark,
    });
    c.path.at(c.d, c.group.position, c.dir);
    c.heading = c.group.rotation.y = Math.atan2(-c.dir.z, c.dir.x);
    cars.push(c);
    return c;
  }

  function parkedCar(lot, i, facingAisle) {
    const c = Object.assign(makeCar(pick(C.parked)), { state: 'parked', lot, spot: i, startAt: 0 });
    spots[lot][i] = c;
    c.group.position.set(spotX(i), 0, LOT[lot].spotZ);
    const toAisle = lot === 'A' ? -Math.PI / 2 : Math.PI / 2;  // A: aisle is south (+z), B: north
    c.heading = c.group.rotation.y = facingAisle ? toAisle : -toAisle;
    c.dir.set(Math.cos(c.heading), 0, -Math.sin(c.heading));
    cars.push(c);
    return c;
  }

  // route from the car-park entrance (E) to a spot
  function lotRoute(lot, i) {
    const x = spotX(i);
    if (lot === 'A') return [v3(x, E.z), v3(x, LOT.A.spotZ)];
    return [v3(AISLE_END, E.z), v3(AISLE_END, LOT.B.aisleZ), v3(x, LOT.B.aisleZ), v3(x, LOT.B.spotZ)];
  }

  function reserve(prefer) {
    for (const lot of [prefer, prefer === 'A' ? 'B' : 'A']) {
      const i = spots[lot].findIndex((s) => !s);
      if (i >= 0) { spots[lot][i] = 'reserved'; return [lot, i]; }
    }
    return null;
  }

  function giveSpot(c, lot, i) {
    spots[lot][i] = 'reserved';
    c.lot = lot; c.spot = i;
    if (c.state === 'queue') {
      c.path = new Path([E.clone(), ...lotRoute(lot, i)]);
      c.d = 0;
      c.state = 'driving';
    } else {
      c.path = new Path([...MAIN_PTS, ...lotRoute(lot, i)]);   // same parametrisation as MAIN
    }
  }

  function freeSpot(lot, i) {
    spots[lot][i] = null;
    const waiting = cars.filter((c) => c.needSpot && c.lot === null)
      .sort((a, b) => (b.state === 'queue') - (a.state === 'queue') || b.d - a.d)[0];
    if (waiting) giveSpot(waiting, lot, i);
  }

  function clearScenario() {
    dynamic.traverse((o) => { if (o.isSprite || (o.material && o.material.transparent && o.material !== glass)) o.material.dispose(); });
    dynamic.clear();
    cars = []; walkers = []; t = 0;
    spots = { A: Array(SPOTS).fill(null), B: Array(SPOTS).fill(null) };
    puffs.forEach((p) => { p.visible = false; p.userData.life = 0; });
    rnd = 7;
  }

  /* ---- the two stories ---- */
  function scenarioWithout() {
    clearScenario();
    [0, 1, 2, 4].forEach((i) => parkedCar('A', i, false));
    [0, 1, 2, 3, 5].forEach((i) => parkedCar('B', i, false));
    // everyone drives alone
    HOME.forEach((h, n) => car({
      color: C.solo[n % C.solo.length], d: h.d, prefer: n % 2 ? 'B' : 'A',
      startAt: 0.2 + n * 0.3, boardFrom: [h.door],
    }));
  }

  function scenarioWith() {
    clearScenario();
    [1, 3].forEach((i) => parkedCar('A', i, false));
    [0, 4].forEach((i) => parkedCar('B', i, false));
    const shuttle = parkedCar('A', 5, true);
    // HOME: h1 h2 h3 at the start, then h4…h9 along the road in that order
    const [h1, h2, h3, h4, h5, h6, h7, h8, h9] = HOME;
    car({
      color: C.hero, glow: C.hero, d: h1.d, startAt: 0.4, prefer: 'A', boardFrom: [h1.door],
      stops: [{ d: h5.d, doors: [h5.door] }, { d: h7.d, doors: [h7.door] }],
      onPark: (c) => {
        // one colleague works at Site A; the two others ride to Site B
        const p = c.group.position;
        walk(p, LOT.A.door, 0, null);
        const sPos = shuttle.group.position.clone();
        const [lotB, iB] = reserve('B');
        const x0 = spotX(5);
        shuttle.path = new Path([v3(x0, LOT.A.spotZ), v3(x0, E.z), ...lotRoute(lotB, iB)]);
        shuttle.d = 0;
        shuttle.lot = lotB; shuttle.spot = iB; shuttle.leaving = ['A', 5];
        shuttle.state = 'boarding';
        shuttle.pending = 3;
        walk(p, sPos, 0.3, () => aboard(shuttle));
        walk(p, sPos, 0.55, () => aboard(shuttle));
        walk(LOT.A.door, sPos, 0.8, () => aboard(shuttle));
      },
    });
    car({
      color: C.pool1, glow: C.pool1, d: h2.d, startAt: 0.8, prefer: 'B', boardFrom: [h2.door, h3.door],
      stops: [{ d: h6.d, doors: [h6.door] }],
    });
    car({
      color: C.pool2, glow: C.pool2, d: h4.d, startAt: 0.2, prefer: 'A', boardFrom: [h4.door],
      stops: [{ d: h8.d, doors: [h8.door] }, { d: h9.d, doors: [h9.door] }],
    });
  }

  /* ---- simulation ---- */
  const tmpDir = new Vector3(), tmp = new Vector3();

  function showBubble(c, texture, dur) {
    c.bubble.material.map = texture;
    c.bubble.material.needsUpdate = true;
    c.bubble.visible = true;
    c.bubbleT = c.bubbleDur = dur;
  }

  function emit(c) {
    const p = puffs[puffIdx++ % puffs.length];
    p.visible = true;
    p.userData.life = 1;
    p.position.copy(c.group.position).addScaledVector(c.dir, -0.55);
    p.position.y = 0.18;
    p.position.x += (rand() - 0.5) * 0.1;
  }

  // free road ahead of c (centre-to-centre), Infinity when nothing is close
  const LOOK = CAR_GAP + 2.5;
  // still on the shared road (or queued at its end): d is comparable between such cars
  const onMainParam = (c) => c.path.pts[0] === MAIN_PTS[0] && c.d <= MAIN.length + 0.01;
  function gapAhead(c) {
    const p = c.group.position;
    let gap = Infinity;
    for (const o of cars) {
      if (o === c || !o.onRoad) continue;
      // same road: measure along it, so curves don't hide the car ahead
      if (onMainParam(c) && onMainParam(o)) {
        const dd = o.d - c.d;
        if (dd > 0 && dd < LOOK) gap = Math.min(gap, dd);
        if (dd > -LOOK && dd < LOOK) continue;
      }
      tmp.copy(o.group.position).sub(p);
      const ahead = tmp.dot(c.dir);
      if (ahead <= 0 || ahead > LOOK) continue;
      const lateral = Math.abs(tmp.x * c.dir.z - tmp.z * c.dir.x);
      if (lateral > 0.34) continue;
      // crossing / mutual block: the older car goes first
      tmp.multiplyScalar(-1);
      if (tmp.dot(o.dir) > 0 && tmp.dot(o.dir) < LOOK && cars.indexOf(o) > cars.indexOf(c)) continue;
      gap = Math.min(gap, ahead);
    }
    return gap;
  }

  function arrive(c) {
    if (c.lot === null) {                                     // no spot: wait at the entrance
      c.state = 'queue';
      c.speed = 0;
      return;
    }
    c.state = 'parked';
    c.speed = 0;
    spots[c.lot][c.spot] = c;
    c.bubble.visible = false;
    const n = c.occupants;
    c.heads.forEach((h) => (h.visible = false));
    c.occupants = 0;
    if (c.onPark) { c.onPark(c); return; }
    for (let i = 0; i < n; i++) walk(c.group.position, LOT[c.lot].door, i * 0.25, null);
  }

  function step(dt) {
    t += dt;

    for (const c of cars) c.onRoad = c.state === 'driving' || c.state === 'queue' || (c.state === 'boarding' && !c.leaving);

    for (const c of cars) {
      if (c.state === 'idle' && t >= c.startAt) board(c, c.boardFrom);
      if (c.state === 'boarding' && c.pending === 0 && t >= c.startAt) {
        if (c.leaving) { const [l, i] = c.leaving; c.leaving = null; freeSpot(l, i); }
        c.state = 'driving';
      }

      if (c.state === 'driving') {
        const onMain = c.path.pts[0] === MAIN_PTS[0] && c.d < MAIN.length;
        let target = onMain ? limitAt(c.d) : LOT_SPEED;
        // pick a spot shortly before the car park
        if (onMain && c.lot === null && !c.needSpot && c.d > MAIN.length - 3) {
          c.needSpot = true;
          const s = reserve(c.prefer);
          if (s) giveSpot(c, s[0], s[1]);
        }
        const stop = c.stops.find((s) => !s.done);
        const end = stop ? stop.d : c.path.length;
        target = Math.min(target, Math.sqrt(2 * BRAKE * 0.35 * Math.max(end - c.d, 0)));
        // brake early enough to stop CAR_GAP behind the car ahead (never inside it)
        const gap = gapAhead(c);
        if (gap < Infinity) target = Math.min(target, Math.sqrt(2 * BRAKE * 0.35 * Math.max(gap - CAR_GAP, 0)));
        c.speed += Math.max(Math.min(target - c.speed, ACCEL * dt), -BRAKE * dt);
        c.d += c.speed * dt;
        c.path.at(c.d, c.group.position, tmpDir);
        c.dir.copy(tmpDir);

        c.angryFor = c.speed < 0.45 ? c.angryFor + dt : 0;
        c.smokeT -= dt;
        if (c.smokeT <= 0) { emit(c); c.smokeT = c.speed < 0.3 ? 0.34 : 0.5; }

        if (stop && c.d >= stop.d - 0.02 && c.speed < 0.15) { stop.done = true; board(c, stop.doors); }
        else if (!stop && c.d >= c.path.length - 0.02) arrive(c);
      } else if (c.state === 'queue') {
        c.angryFor += dt;
        c.smokeT -= dt;
        if (c.smokeT <= 0) { emit(c); c.smokeT = 0.4; }
      }

      if (c.state === 'driving' || c.state === 'queue') {
        const want = Math.atan2(-c.dir.z, c.dir.x);
        let diff = want - c.heading;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        c.heading += diff * Math.min(1, dt * 10);
        c.group.rotation.y = c.heading;
      }

      // bubbles: chat in carpools, anger when stuck alone
      c.bubbleT -= dt;
      if (c.bubbleT <= 0) c.bubble.visible = false;
      const live = c.state === 'driving' || c.state === 'queue' || c.state === 'boarding';
      if (live && c.occupants > 0) {
        c.nextBubble -= dt;
        if (c.nextBubble <= 0) {
          if (c.occupants >= 2 && c.state !== 'boarding') { showBubble(c, pick(tex.happy), 1.4); c.nextBubble = 1.6 + rand() * 1.2; }
          else if (mode === 'without' && c.occupants === 1) {
            // alone at the wheel: tired or red-faced all the way, furious (and honking) when stuck
            const stuck = c.angryFor > 0.6;
            showBubble(c, stuck ? (rand() < 0.3 ? tex.honk : pick(tex.angry)) : pick(rand() < 0.6 ? tex.angry : tex.grumpy), 1.2);
            c.nextBubble = stuck ? 0.6 + rand() * 0.8 : 1 + rand() * 1.2;
          }
          else c.nextBubble = 0.4;
        }
      }
      if (c.bubble.visible) {
        const k = Math.min(1, c.bubbleT * 5, (c.bubbleDur - c.bubbleT) * 6 + 0.3);
        c.bubble.scale.setScalar(1.1 * Math.max(0.05, k));
        c.bubble.position.y = 1.25 + Math.sin(t * 6) * 0.04;
      }
    }

    for (let i = walkers.length - 1; i >= 0; i--) {
      const w = walkers[i];
      w.t += dt;
      if (w.t < 0) continue;
      w.mesh.visible = true;
      const k = Math.min(w.t / w.dur, 1);
      w.mesh.position.copy(w.from).lerp(w.to, k);
      w.mesh.position.y = Math.abs(Math.sin(w.t * 12)) * 0.04;
      w.mesh.rotation.y = Math.atan2(w.to.x - w.from.x, w.to.z - w.from.z);
      const fade = k > 0.85 ? (1 - k) / 0.15 : 1;
      w.mesh.scale.setScalar(1.4 * Math.max(fade, 0.01));
      if (k >= 1) {
        dynamic.remove(w.mesh);
        walkers.splice(i, 1);
        if (w.onDone) w.onDone();
      }
    }

    let active = 0;
    for (const p of puffs) {
      if (p.userData.life <= 0) continue;
      active++;
      p.userData.life -= dt / 1.8;
      const k = 1 - p.userData.life;
      p.position.y += dt * 0.35;
      p.scale.setScalar(0.6 + k * 2.2);
      p.material.opacity = 0.5 * p.userData.life;
      if (p.userData.life <= 0) p.visible = false;
    }
    smogLevel += (Math.min(active / 55, 1) - smogLevel) * Math.min(1, dt * 1.5);
    roadMat.color.set(C.road).lerp(smogColor, smogLevel * 0.5);
    treeMat.color.set(C.tree).lerp(smogColor, smogLevel * 0.5);
    treeMat2.color.set(C.tree2).lerp(smogColor, smogLevel * 0.5);
    for (const c of clouds) { c.position.x += dt * 0.3; if (c.position.x > HW + 4) c.position.x = -HW - 4; }
    if (haze) haze.style.opacity = String(Math.min(smogLevel * 0.9, 0.6));
  }

  /* ---- camera fit: keep the design width, extend/crop vertically ---- */
  let running = false;
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(2.4e6 / (w * h))));
    renderer.setSize(w, h, false);
    let hw = HW, hh = HW / (w / h);
    if (hh < HW / DESIGN_ASPECT) { hh = HW / DESIGN_ASPECT; hw = hh * (w / h); }   // wider than designed: widen, never crop the loops
    Object.assign(camera, { left: -hw, right: hw, top: hh, bottom: -hh });
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  }

  /* ---- mode switching, autoplay, visibility ---- */
  const buttons = [...root.querySelectorAll('[data-mode]')].filter((b) => b.tagName === 'BUTTON');
  const srLabel = root.querySelector('[data-journey-label]');
  const pauseBtn = root.querySelector('.hero-journey__pause');
  // sliding background behind the active mode button (CSS animates left/width)
  const ctrl = root.querySelector('.hero-journey__ctrl');
  const pill = ctrl && ctrl.insertBefore(document.createElement('span'), ctrl.firstChild);
  if (pill) { pill.className = 'hero-journey__pill'; pill.setAttribute('aria-hidden', 'true'); ctrl.classList.add('has-pill'); }
  function placePill() {
    const b = pill && buttons.find((x) => x.dataset.mode === mode);
    if (!b) return;
    pill.style.left = b.offsetLeft + 'px';
    pill.style.width = b.offsetWidth + 'px';
    pill.classList.toggle('is-with', mode === 'with');
  }
  let pinned = false, doneAt = null, paused = reduce, visible = true;

  function setMode(m) {
    mode = m;
    root.dataset.mode = m;
    buttons.forEach((b) => {
      const on = b.dataset.mode === m;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    placePill();
    if (srLabel) srLabel.textContent = srLabel.dataset[m === 'with' ? 'captionWith' : 'captionWithout'];
    (m === 'with' ? scenarioWith : scenarioWithout)();
    doneAt = null;
    if (reduce || paused) {
      // still frame: run the story to a telling moment, draw once
      for (let i = 0; i < (m === 'with' ? 330 : 480); i++) step(1 / 30);
      renderer.render(scene, camera);
    }
  }

  function finished() {
    // the story is over once every car is parked (or stuck in the queue)
    if (t > MAX_LENGTH) return true;
    return t > 4 && walkers.length === 0 && cars.every((c) => c.state === 'parked' || c.state === 'queue' ||
      (c.state === 'driving' && c.speed < 0.05 && c.angryFor > 2));   // stuck in the jam behind the queue
  }

  let last = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000 || 0, 1 / 20);
    last = now;
    step(dt);
    if (finished()) {
      if (doneAt === null) doneAt = t;
      if (t - doneAt > HOLD) setMode(pinned ? mode : mode === 'with' ? 'without' : 'with');
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  function updateRunning() {
    const should = visible && !paused && !document.hidden;
    if (should && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
    else if (!should) running = false;
  }

  buttons.forEach((b) => b.addEventListener('click', () => {
    pinned = true;
    setMode(b.dataset.mode);
  }));
  if (pauseBtn) {
    pauseBtn.hidden = reduce;
    pauseBtn.addEventListener('click', () => {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', String(paused));
      pauseBtn.setAttribute('aria-label', pauseBtn.dataset[paused ? 'labelPlay' : 'labelPause']);
      updateRunning();
    });
  }
  new ResizeObserver(resize).observe(stage);
  if (ctrl) new ResizeObserver(placePill).observe(ctrl);   // label widths change with fonts/breakpoints
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; updateRunning(); }).observe(root);
  document.addEventListener('visibilitychange', updateRunning);

  resize();
  setMode('without');
  renderer.render(scene, camera);
  root.classList.add('is-ready');
  if (pill) requestAnimationFrame(() => ctrl.classList.add('pill-anim'));   // no slide on first placement
  updateRunning();
}

const el = document.querySelector('[data-hero-journey]');
if (el) mount(el);
