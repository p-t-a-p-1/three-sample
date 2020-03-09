// シーン（3D空間）作成...3Dオブジェクトや光源などの置き場
const scene = new THREE.Scene()
/**
 * カメラ設定
 * PerspectiveCameraは3D空間の様子を2次元の画面に表現するためのカメラ
 */
const camera = new THREE.PerspectiveCamera(
  75, // 視野角（人間が頭部を動かさずに見ることのできる範囲、フォーカスが合うのは60度ほど）
  window.innerWidth / window.innerHeight, // アスペクト比（映画やテレビなどにおける横縦の比のこと）16:9とか4:3とか
  0.1, // 近位のクリッピング面の距離（これより手前の3D空間は描画されない）
  1000 // 遠位のクリッピング面の距離（これより奥の3D空間は描画されない）
)
// カメラを手前に移動
camera.position.z = 5

// レンダラーは"描画する"ということ
// レンダラーインスタンスの生成
const renderer = new THREE.WebGLRenderer()
// 使用領域の設定（低解像度にしたい場合は第3引数にfalse）
renderer.setSize(window.innerWidth, window.innerHeight)
// レンダラー要素をbodyに追加
document.body.appendChild(renderer.domElement)

// キューブのキューブのすべての頂点と塗りつぶし面のデータを持つオブジェクト
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 素材...今回は色属性を指定
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

/**
 * Mesh...ジオメトリを取得し、それにマテリアルを適用、シーンに挿入して自由移動を可能にするオブジェクト
 */
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

/**
 * スクリーンがリフレッシュされるたびにレンダラーがシーンを描画するループ
 * 標準的なスクリーンでは、これは1秒あたり60回行われる
 */
function animate() {
  /**
   * requestAnimationFrameを使うことで別タブに移動した際は一時停止してくれる
   */
  requestAnimationFrame(animate)

  // 回転アニメーション
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()
