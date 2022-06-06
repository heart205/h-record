# WebGL

## thingJs 的使用

[thingJs](http://www.thingjs.com/guide/main/)

## 建模教程

- [blender3.1 新手 0 基础入门](https://www.bilibili.com/video/BV1US4y1N7xN?p=3)

## three.js

### 通过 npm 安装 three.js

安装：

```js
npm install three
```

以 cjs 的风格引用

```js
var THREE = require('three')
var Scene = require('three').Scene
```

以 ESM 的风格引用

```js
import * as THREE from 'three'
import { Scene } from 'three'
```

一些常用类的引入

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
```

### 辅助坐标系

```js
var width = 10
var axes = new THREE.AxesHelper(width)
scene.add(axes) // 需要添加到对象或者场景中
```

### 轨道控制器 OrbitControls

<a href="#通过-npm-安装-three-js">引入 OrbitControls 的方式</a>

```js
new OrbitControls(camera, labelRenderer.domElement)
```

### 相机

#### 透视相机

```js
const camera = new three.PerspectiveCamera(45, width / height, 0.1, 1000)
```

- 第一个参数是视野角度（FOV） 一般为 45（单位是角度）

- 第二个参数是长宽比（aspect ratio）

- 近截面（near）物体某些部分比摄像机的近截面近 不会渲染

- 远截面（far）物体某些部分比摄像机的远截面远 也不会渲染

```js
// 相机的偏移量 set(x,y,z)
camera.position.set(10, 10, 10)
```

> Threejs 相机对象 Camera 的.lookAt()方法用来设置相机对象看向的位置。<br />.lookAt()方法的参数是三维空间中一个点世界坐标 xyz，参数可以是分别输入 xyz 参数形式.lookAt(x,y,z)，参数也可以是一个表示坐标的三维向量对象.lookAt(new THREE.Vector3(x,y,z))

```js
// scene.position的默认是new THREE.Vector3(0,0,0)
// 这里看向场景的原点的位置
// 在设置lookAt的
camera.position.set(10, 10, 10)
camera.lookAt(scene.position)
```

### 渲染器

#### WebGLRenderer 渲染器

```js
renderer = new THREE.WebGLRenderer() // 创建WebGL对象
renderer.setClearColor(new THREE.Color(0xeeeeee)) //设置默认的渲染颜色
renderer.setSize(width, height) // 设置渲染的尺寸
document.body.appendChild(renderer.domElement) //将渲染的元素挂载到DOM上
```

#### CSS2DRenderer 渲染器

> CSS2DRenderer 相较于精灵的优势在于可以通过 css 控制样式 并且可以添加事件操作
> [跳转案例](https://codesandbox.io/s/icy-star-uv7ob2?file=/src/App.vue)

```js
labelRenderer = new CSS2DRenderer() //新建CSS2DRenderer
labelRenderer.setSize(width, height) // 设置尺寸
// 调整显示的位置
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = 0
document.body.appendChild(renderer.domElement) //将渲染的元素挂载到DOM上
```

### 光线投射 Raycaster

[Raycaster](https://threejs.org/docs/index.html?q=ray#api/zh/core/Raycaster)
用于计算在三维空间中鼠标经过了哪些物体

```js
// 先创建好一个二维向量和一个光线投射对象
var pointer = new THREE.Vector2() // 二维向量
var raycaster = new THREE.Raycaster()

// 监听鼠标移动 获取鼠标映射到三维中的坐标
document.addEventListener('mousemove', onMouseMove, false);

onMouseMove(event) {
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
},

// 之后在render函数中进行对物体的操作

function render() {
  requestAnimationFrame(render);
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(pointer, camera);
  // 计算物体和射线的焦点从而获取到射线上的图形的对象
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
      // 不重复选择元素
    if (dom != intersects[0].object) {
      // 设置获取到的第一个物体的颜色值设置为红色
      dom = intersects[0].object;
      dom.material.color = new THREE.Color(255,0,0);
    }
  } else {
    // 设置成白色
      if(dom) dom.material.color = new THREE.Color(0,0,0);
        dom = null;
      }
  renderer.render(scene, camera);
}
```

### 阴影效果

> Three.js 中 能形成的阴影的光源只有 `THREE.DirectionalLight` 与 `THREE.SpotLight`
> 表现阴影效果的材质只有 `THREE.LambertMaterial` 与 `THREE.PhongMaterial`
> 开启阴影效果支持需要渲染器支持 使用 WebGLRender 开启渲染效果

```js
renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true // 开启阴影效果
```

```js
webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap // 阴影的类型
```

之后设置光源 使灯光可投掷阴影

> 并不是所有的灯光都可以投掷阴影，环境光就不可以

```js
var light = new THREE.PointLight(0xffffff)
light.castShadow = true //灯光投掷阴影
```

如果阴影看起来像马赛克一样 设置阴影分辨率使得阴影更加清晰

```js
light.shadow.mapSize.width = 2048
light.shadow.mapSize.height = 2048
```

创建可以投掷阴影的物体:

```js
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
})
// light.color =  new THREE.Color(0xffff00) // 修改聚光灯颜色
// light.visible = false //聚光灯是否开启
// light.angle = Math.PI / 2 // 聚光灯的角度 设置从聚光灯的位置开始可以辐射的范围，单位是弧度，应该不超过 Math.PI/2。默认值为 Math.PI/3
// light.intensity = 3 // 聚光灯的强度，默认值为 1。
// light.distance = 10; // 聚光灯的距离，默认值为 100。
// light.decay = 2; // 聚光灯的衰减，默认值为 1。
// light.penumbra = 0; // 聚光灯的阴影范围，照射面光影衰减百分比 默认值为 0。
// light.target = scene; // 聚光灯的目标对象，arget属性用来决定光照的方向，一般会指向一个对象  默认值为 null。
// light.exponent = 1; // 聚光灯的衰减系数，默认值为 10。
var mesh = new THREE.Mesh(geometry, material)
mesh.castShadow = true // 物体能够投掷阴影
```

创建可以接收阴影的对象

```js
var plance = new THREE.PlaneGeometry(10, 10)
var material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
})
// 接收阴影
var mesh = new THREE.Mesh(plance, material)
mesh.rotation.x = -0.5 * Math.PI
mesh.position.x = 5
mesh.position.z = 5
mesh.receiveShadow = true // 物体可以接收阴影
```

### gui

<https://lil-gui.georgealways.com/#Examples> 推荐的 GUI 工具
