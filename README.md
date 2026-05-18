# Dark-hero-section-with-3D-rotating-object
This is an immersive dark-themed hero section designed for a modern SaaS or tech product landing page.

---

# 🇰🇷 한국어 문서

## 📌 개요

| 항목 | 내용 |
|---|---|
| **프로젝트명** | AXIOM Hero Section |
| **파일** | `index.html` (단일 파일) |
| **기술 스택** | HTML5, CSS3, Vanilla JavaScript, Three.js r128 |
| **테마** | 다크 / Deep Black `#000000` |
| **폰트** | Bebas Neue (헤드라인), DM Sans (본문) |

---

## 🗂️ 파일 구조

단일 파일로 제공되며, 유지보수 시 아래와 같이 분리를 권장합니다.

```
project/
├── index.html          ← 전체 소스 (HTML + CSS + JS 통합)
├── css/
│   └── style.css       ← (분리 시) 스타일 전체
├── js/
│   ├── three-scene.js  ← (분리 시) Three.js 3D 씬
│   └── main.js         ← (분리 시) UI 인터랙션
└── assets/
    └── fonts/          ← (선택) 웹폰트 로컬 저장
```

---

## 🎨 디자인 시스템

### 색상

| 역할 | 값 |
|---|---|
| 배경 | `#000000` |
| 주요 텍스트 | `#ffffff` |
| 보조 텍스트 | `rgba(255, 255, 255, 0.45)` |
| CTA 액센트 | `#c8e6ff` |
| 글래스 배경 | `rgba(255, 255, 255, 0.04)` |
| 글래스 테두리 | `rgba(255, 255, 255, 0.10)` |
| 포인트 라이트 1 | `#6688ff` (블루-퍼플) |
| 포인트 라이트 2 | `#ffaa44` (웜 앰버) |

### 타이포그래피

| 요소 | 폰트 | 크기 | 속성 |
|---|---|---|---|
| 로고·헤드라인 | Bebas Neue | clamp(72px ~ 160px) | letter-spacing: 2px |
| 서브 텍스트 | DM Sans 300 | clamp(15px ~ 18px) | line-height: 1.7 |
| 네비 링크 | DM Sans 400 | 13px | letter-spacing: 0.5px |
| 레이블 | DM Sans 500 | 11px | uppercase, letter-spacing: 4px |

---

## ⚙️ 주요 기능

### 1. 3D 크롬 토러스 노트

Three.js `TorusKnotGeometry`로 구현된 액체 금속 오브젝트입니다. 천천히 자전하며 위아래로 부유하고, `PMREMGenerator`로 절차적 환경 맵을 생성해 도시 조명 반사를 시뮬레이션합니다. `ACESFilmic` 톤 매핑으로 영화적 색감을 구현합니다.

```javascript
const geo = new THREE.TorusKnotGeometry(1.15, 0.36, 220, 32, 2, 3);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,   // 완전 금속
  roughness: 0.08,  // 거울 수준의 반사
  envMapIntensity: 3.5,
});
```

### 2. 마우스 패럴랙스

마우스 위치에 따라 카메라와 오브젝트가 부드럽게 반응합니다. lerp 보간으로 자연스러운 지연 효과를 구현했습니다.

```javascript
smooth.x += (mouse.x - smooth.x) * 0.04;
camera.position.x = smooth.x * 0.25;
mesh.rotation.y = t * 0.24 + smooth.x * 0.25;
```

### 3. 글라스모피즘

네비게이션 바와 피쳐 카드에 반투명 유리 효과를 적용해 3D 배경과 UI를 시각적으로 분리합니다.

```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.10);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

### 4. CTA 버튼 글로우

호버 시 파란빛 멀티레이어 글로우가 발생합니다.

```css
.cta-btn:hover {
  box-shadow:
    0 0 28px rgba(180, 210, 255, 0.30),
    0 0 60px rgba(180, 210, 255, 0.12),
    inset 0 0 20px rgba(200, 230, 255, 0.08);
}
```

### 5. 진입 애니메이션

페이지 로드 시 요소가 순차적으로 아래에서 위로 등장합니다.

| 요소 | 지연 |
|---|---|
| 레이블 | 0.2s |
| 헤드라인 | 0.4s |
| 서브카피 | 0.6s |
| 피쳐 카드 | 0.8s |
| CTA 버튼 | 1.0s |
| 스크롤 힌트 | 1.5s |

### 6. 파티클 필드

900개의 별빛 파티클이 배경에서 천천히 회전하며 공간감을 더합니다.

---

## 🧩 UI 컴포넌트

### 네비게이션 바

상단에 고정되며 글라스모피즘 배경이 적용된 pill 형태의 링크 버튼으로 구성됩니다.

### 피쳐 카드

| 카드 | 아이콘 |
|---|---|
| Blazing Fast | 번개 아이콘 |
| Enterprise Security | 방패 아이콘 |
| Global Scale | 지구 아이콘 |
| Pricing | 그리드 아이콘 |

### CTA 버튼

**Get Started** 레이블과 화살표 아이콘으로 구성됩니다. 호버 시 아이콘이 우측으로 이동하고 글로우와 함께 위로 부유합니다.

---

## 🔧 커스터마이징 가이드

### 헤드라인 변경

```html
<h1 class="hero-headline">
  원하는<br/>텍스트
</h1>
```

### 색상 변경

```css
:root {
  --cta-color: #c8e6ff;
  --chrome-glow: rgba(180, 210, 255, 0.18);
}
```

### 3D 오브젝트 교체

```javascript
// 구체로 교체
const geo = new THREE.SphereGeometry(1.4, 64, 64);

// 링으로 교체
const geo = new THREE.TorusGeometry(1.2, 0.45, 32, 100);
```

---

## 📦 외부 의존성

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| Three.js | r128 | 3D 렌더링 |
| Google Fonts | — | Bebas Neue, DM Sans |

Three.js는 `cdnjs.cloudflare.com`에서 CDN으로 로드됩니다. 로컬 사용 시 `npm install three` 후 import 방식으로 전환하세요.

---

## 🌐 브라우저 호환성

| 브라우저 | 지원 여부 |
|---|---|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ (`-webkit-backdrop-filter` 필요) |
| Edge 90+ | ✅ |
| IE 11 | ❌ |

---

## 📄 라이선스

MIT License — 자유롭게 사용, 수정, 배포 가능합니다.

---
---
---

# 🇺🇸 English Document

## 📌 Overview

| Item | Details |
|---|---|
| **Project Name** | AXIOM Hero Section |
| **File** | `index.html` (Single file) |
| **Tech Stack** | HTML5, CSS3, Vanilla JavaScript, Three.js r128 |
| **Theme** | Dark / Deep Black `#000000` |
| **Fonts** | Bebas Neue (Headline), DM Sans (Body) |

---

## 🗂️ File Structure

Delivered as a single file. For maintainability, the structure below is recommended.

```
project/
├── index.html          ← Full source (HTML + CSS + JS combined)
├── css/
│   └── style.css       ← (On separation) All styles
├── js/
│   ├── three-scene.js  ← (On separation) Three.js 3D scene
│   └── main.js         ← (On separation) UI interactions
└── assets/
    └── fonts/          ← (Optional) Local webfonts
```

---

## 🎨 Design System

### Colors

| Role | Value |
|---|---|
| Background | `#000000` |
| Primary Text | `#ffffff` |
| Muted Text | `rgba(255, 255, 255, 0.45)` |
| CTA Accent | `#c8e6ff` |
| Glass Background | `rgba(255, 255, 255, 0.04)` |
| Glass Border | `rgba(255, 255, 255, 0.10)` |
| Point Light 1 | `#6688ff` (Blue-Purple) |
| Point Light 2 | `#ffaa44` (Warm Amber) |

### Typography

| Element | Font | Size | Style |
|---|---|---|---|
| Logo · Headline | Bebas Neue | clamp(72px ~ 160px) | letter-spacing: 2px |
| Subtext | DM Sans 300 | clamp(15px ~ 18px) | line-height: 1.7 |
| Nav Links | DM Sans 400 | 13px | letter-spacing: 0.5px |
| Label | DM Sans 500 | 11px | uppercase, letter-spacing: 4px |

---

## ⚙️ Key Features

### 1. Chrome Torus Knot (3D)

A liquid metal object built with Three.js `TorusKnotGeometry`. It slowly rotates and floats up and down. A procedural environment map is generated via `PMREMGenerator` to simulate city light reflections, with `ACESFilmic` tone mapping applied for a cinematic look.

```javascript
const geo = new THREE.TorusKnotGeometry(1.15, 0.36, 220, 32, 2, 3);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,   // Full metal
  roughness: 0.08,  // Near-mirror reflection
  envMapIntensity: 3.5,
});
```

### 2. Mouse Parallax

The camera and object respond smoothly to mouse position, with lerp interpolation providing a natural lag effect.

```javascript
smooth.x += (mouse.x - smooth.x) * 0.04;
camera.position.x = smooth.x * 0.25;
mesh.rotation.y = t * 0.24 + smooth.x * 0.25;
```

### 3. Glassmorphism

A frosted-glass effect is applied to the navbar and feature cards to visually separate the UI from the 3D background.

```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.10);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

### 4. CTA Glow Effect

A multi-layer blue glow fires on hover.

```css
.cta-btn:hover {
  box-shadow:
    0 0 28px rgba(180, 210, 255, 0.30),
    0 0 60px rgba(180, 210, 255, 0.12),
    inset 0 0 20px rgba(200, 230, 255, 0.08);
}
```

### 5. Entrance Animation

Elements appear sequentially from bottom to top on page load.

| Element | Delay |
|---|---|
| Label | 0.2s |
| Headline | 0.4s |
| Subtext | 0.6s |
| Feature Cards | 0.8s |
| CTA Button | 1.0s |
| Scroll Hint | 1.5s |

### 6. Particle Field

900 star-like particles slowly drift in the background, adding depth and atmosphere.

---

## 🧩 UI Components

### Navigation Bar

Fixed at the top with a glassmorphism background, featuring pill-shaped link buttons.

### Feature Cards

| Card | Icon |
|---|---|
| Blazing Fast | Lightning icon |
| Enterprise Security | Shield icon |
| Global Scale | Globe icon |
| Pricing | Grid icon |

### CTA Button

Labeled **Get Started** with an arrow icon. On hover, the arrow shifts right and the button floats upward with a glow effect.

---

## 🔧 Customization Guide

### Change Headline

```html
<h1 class="hero-headline">
  Your<br/>Text Here
</h1>
```

### Change Colors

```css
:root {
  --cta-color: #c8e6ff;
  --chrome-glow: rgba(180, 210, 255, 0.18);
}
```

### Swap 3D Object

```javascript
// Replace with a Sphere
const geo = new THREE.SphereGeometry(1.4, 64, 64);

// Replace with a Torus Ring
const geo = new THREE.TorusGeometry(1.2, 0.45, 32, 100);
```

---

## 📦 Dependencies

| Library | Version | Purpose |
|---|---|---|
| Three.js | r128 | 3D rendering |
| Google Fonts | — | Bebas Neue, DM Sans |

Three.js is loaded via CDN from `cdnjs.cloudflare.com`. For local use, run `npm install three` and switch to ES module imports.

---

## 🌐 Browser Compatibility

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ (requires `-webkit-backdrop-filter`) |
| Edge 90+ | ✅ |
| IE 11 | ❌ |

---

## 📄 License

MIT License — Free to use, modify, and distribute.