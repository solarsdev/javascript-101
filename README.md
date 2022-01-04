# 프론트엔드 필수 브라우저 101

## Web APIs에 대한 이해

### Web API란 무엇인가?

- Application Programming Interface의 약어
- 각종 플랫폼에서 제공하는 데이터를 이용하기 위한 규약
  - 예를 들어 전원 케이블에 소켓을 꼽기만 하면 내부 설계와는 관계없이 바로 이용할수 있음
  - Windows에서 제공하는 API를 이용해서 윈도우 어플리케이션을 제작 가능
  - 유튜브에서 백엔드 서비스 데이터를 API로 제공하는데, 그것을 바로 받아올 수 있음
  - 직접 작성한 클래스의 UserStorage에서 Login, Logout 기능을 제공한다면, 그것 또한 API로 제공하는것이라고 말할 수 있음 (사용자는 내부 기능이 어떻게 구현되어 있는지는 상관없이 바로 원하는 기능을 이용할수 있음)
- 브라우저마다 공통적으로 제공하기로 한 API가 많이 있음
  - DOM APIs (Document Object Model) 웹페이지의 요소를 생성, 삭제, 스타일을 제어
  - Network APIs
  - Graphics APIs Canvas와 같은 것들을 이용할 수 있음
  - Audio/Video APIs 멀티미디어 관련 기능
  - Device APIs 사용자가 온라인인지 오프라인인지, 디바이스의 상태 정보
  - File APIs 사용자의 파일을 읽고 쓰기
  - Storage APIs 브라우저 상에서 임시 정보들을 관리할수 있도록 도와줌
- 어떤 API가 존재하고 어떻게 활용하는지는 어떻게 알수 있을까?
  - MDN Document
    [Introduction to web APIs - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
    [Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API)
    [Here's What JavaScript CAN'T Do](https://www.thoughtco.com/what-javascript-cannot-do-2037666)
    - 쓰레기통 아이콘은 사용하면 안됨 (Deprecated or will be)
    - 경고 API는 최신 내용이 추가된 것들이라 사용할때 주의가 필요
  - 예를 들어 Geolocation API
    - HTTPS일 때만 사용가능하다는 경고 메시지가 출력되어 있음
    - Web APIs에서는 보안을 중요시 하기 때문에, 사용자의 권한 요청이나 HTTPS를 요구할 수 있음
    - HTTP (Hypertext Transfer Protocol)
      - request와 response로 이루어져 있는 통신규약
    - HTTPS (Hypertext Transfer Protocol Secure)
      - request와 response로 이루어져 있지만, 암호화를 통해 보안을 강화한 버전
  - External APIs
    - Twitter, Trello, Youtube, Pinterest, Weather APIs
    - 외부 서비스들도 각자 APIs를 제공하기 때문에 백엔드 데이터에 쉽게 접근할수 있는 방법이 있음

### Browser 구조 분석

- 브라우저에서 웹페이지를 열면 Window라는 오브젝트가 존재
  - Window Object
    - DOM Document Object Model (HTML에서 작성한 요소들이 표기되는 부분)
    - BOM Browser Object Model (Navigator, Location, Fetch, Storage ...)
    - JavaScript (Array, Map, Date ...)
- Chrome의 개발자툴을 이용해서 직접 window 객체를 출력해보면 다양한 함수와 객체들이 있는것을 확인할 수 있음
- window객체는 global object이므로 아무런 오브젝트를 지정하지 않으면 window내에 있는 함수 및 객체를 이용하게 됨
  ```jsx
  // 아래의 커맨드는 동일함
  window.innerWidth; // == innerWidth
  innerWidth; // == window.innerWidth
  ```
- 참고 자료
  - Document
    [Document - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document)
  - Window
    [Window - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window)
  - Viewport
    [Layout viewport - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/layout_viewport)
  - Navigator
    [Navigator - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

### 실습1. 윈도우 사이즈 표기

- 다음 4가지를 출력하는 어플리케이션을 만들어보자
  - window.screen
    - 모니터의 해상도 (브라우저 밖에 있는 것들을 다 합한 사이즈)
  - window.outer
    - URL, 탭 등 전체적인 브라우저의 사이즈
  - window.inner
    - 웹페이지, 스크롤바 포함해서 표시되는 전체 사이즈
  - documentElement.clientWidth
    - 문서의 사이즈, 스크롤바가 있다면 제외한 영역
- 실습 포인트
  - 브라우저의 크기가 변경되면 실시간으로 업데이트 되도록 하기
  - window-size.html

```html
<p style="background-color: lightpink">
  <span>window.screen: </span><span id="screen"></span><br />
  <span>window.outer: </span><span id="outer"></span><br />
  <span>window.inner: </span><span id="inner"></span><br />
  <span>document.Element.clientWidth: </span><span id="documentClientWidth"></span>
</p>
```

```jsx
const screen = document.getElementById('screen');
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');
const documentClientWidth = document.getElementById('documentClientWidth');

const updateSize = () => {
  screen.innerText = `${window.screen.width}, ${window.screen.height}`;
  outer.innerText = `${window.outerWidth}, ${window.outerHeight}`;
  inner.innerText = `${window.innerWidth}, ${window.innerHeight}`;
  documentClientWidth.innerText = `${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`;
};

updateSize();
window.onresize = updateSize;
```

### 브라우저 좌표

- 브라우저의 X축과 Y축에 대한 정리
  - X는 수평축
  - Y는 수직축
  - 좌표는 document의 왼쪽, 최상단에서 (0, 0)으로 시작함
  - Element.getBoundingClientRect()
    - Element 오브젝트의 함수
    - Element라는 것은 DOM에 들어있는 모든 요소들 (이미지, 텍스트등 다양한 태그들)
    - 요소의 위치나 크기등에 대한 정보를 얻어올 수 있음
    - top, left, width, height 등
    - left == x, top == y
    - bottom, right은 태그의 오른쪽 최하단이 됨
    - CSS에서의 right, bottom과는 의미가 조금 다른것이 CSS에서는 브라우저의 외곽에서의 거리를 의미한다면, getBoundingClientRect()에서의 right, bottom은 브라우저의 최상단, 왼쪽에서의 거리를 의미함
- Client x, y vs Page x, y
  - 마우스 클릭시에 발생하는 이벤트에서 구할 수 있는 값
  - Client x, y의 의미는 페이지에 상관없이 브라우저 윈도우 창에서 x, y가 어느정도 떨어져 있는지가 전달됨
  - Page x, y는 페이지를 구성하는 최상단과 왼쪽에서 어느정도 떨어져 있는지가 전달됨 (스크롤링에 대한 이동분도 포함되어 계산되는 구조)

### 실습2. 좌표 실습

- 요구사항
  - div를 복수 만들고, 특정 div만 다른 색상으로 지정할것
  - 다른 색상으로 지정된 div를 클릭하면 client x,y와 page x,y를 출력
  - window-coordinate.html

```html
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box target"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```

```css
body {
  background-color: black;
}
.box {
  background-color: bisque;
  width: 250px;
  height: 250px;
  margin: 10px;
}
.target {
  background-color: pink;
}
```

```jsx
const target = document.querySelector('.target');
target.addEventListener('click', (event) => {
  console.log(target.getBoundingClientRect());
  console.log(`client: ${event.clientX}, ${event.clientY}`);
  console.log(`page: ${event.pageX}, ${event.pageY}`);
});
```

### 실습3. 윈도우 스크롤링 APIs

- 버튼 3개를 이용
  - 100px y좌표
  - 100px x좌표
  - 항상 target으로 이동

```css
body {
  background-color: black;
}
.sticky {
  position: sticky;
  top: 10px;
}
.box {
  background-color: bisque;
  width: 250px;
  height: 250px;
  margin: 10px;
}
.target {
  background-color: pink;
}
```

```html
<div class="sticky">
  <button id="btn100y">Scroll by 100px(y)</button>
  <button id="btn100x">Scroll by 100px(x)</button>
  <button id="btnTarget">Scroll into target</button>
</div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box target"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```

```jsx
const target = document.querySelector('.target');
target.addEventListener('click', (event) => {
  console.log(target.getBoundingClientRect());
  console.log(`client: ${event.clientX}, ${event.clientY}`);
  console.log(`page: ${event.pageX}, ${event.pageY}`);
});
const btn100y = document.getElementById('btn100y');
btn100y.addEventListener('click', (event) => {
  window.scroll(event.pageX, event.pageY + 100);
});
const btn100x = document.getElementById('btn100x');
btn100x.addEventListener('click', (event) => {
  window.scroll(event.pageX + 100, event.pageY);
});
const btnTarget = document.getElementById('btnTarget');
btnTarget.addEventListener('click', (event) => {
  const targetDOMRect = target.getBoundingClientRect();
  console.log(targetDOMRect);
  window.scrollBy(targetDOMRect.x, targetDOMRect.y);
});
```

### 자바스크립트에서 'use strict';를 사용하는 이유

- 타입스크립트를 사용할때는 선언할 필요가 없지만 순수 vanilla 자바스크립트를 사용할때 활용하면 좋음
- 자바스크립트의 유연함이 장점일수 있지만, 개발과정에서는 단점으로 작용할 수 있음
- 기본 자바스크립트에서는 선언되지 않은 변수를 사용한다거나, 기존 변수의 프로토타입을 변경할 수 있음
- ECMAScript5에서 추가된 기능으로 'use strict'; 를 맨 윗줄에 추가하면, 변수 관련 선언 에러를 명시적으로 표시해주기 때문에 활용해야 함

```jsx
'use strict';
console.log('Hello, World!');

myVariable = 6; // ERROR! 명시되지 않은 변수
```

### Window load의 비밀

- 브라우저에서 HTML코드를 해석하다가 리소스를 만나면 필요한 파일들을 다운로드 받게 됨
  [자바스크립트 2. 콘솔에 출력, script async 와 defer의 차이점 및 앞으로 자바스크립트 공부 방향 | 프론트엔드 개발자 입문편 (JavaScript ES5+)](https://www.youtube.com/watch?v=tJieVCgGzhs)
- **head내에 script를 일반적으로 작성하는 방법**
  ```jsx
  <head>
    <script src='main.js'></script>
  </head>
  ```
  1. HTML을 해석하던 도중 그 과정이 중단되고 스크립트를 fetch하여 실행하게 됨
  - 사용자가 웹사이트를 로딩하는데 오래 걸리게 됨
  - 스크립트의 fetch가 완료되어 실행될때 DOM요소가 존재하지 않을 가능성이 큼
- **body 제일 끝에 script를 작성하는 방식**
  ```jsx
  <body>
    <script src='main.js'></script>
  </body>
  ```
  1. HTML을 해석완료 하고나서 JavaScript 파일을 fetch하고 실행
  - 웹페이지의 작동방식이 스크립트에 의존적이라고 하면, 결국 자바스크립트를 완전히 로딩해서 실행하기 전까지는 제대로 표시하는것이라고 보기는 힘들 것임
- **head에 작성하되 async를 붙여서 사용하는 방법**
  ```jsx
  <head>
    <script async src='main.js'></script>
  </head>
  ```
  1. 해당 스크립트 구문을 만났을때는 HTML의 해석과 병렬로 fetch 과정을 수행
  2. fetch가 완료된 순서대로 (정의순서 아님) 스크립트를 실행
  - 스크립트의 fetch가 완료되어 실행될때 DOM요소와의 연계기능이 있다면 아직 해석이 완료되지 않아서 존재하지 않을 가능성 내포
  - HTML 해석 도중에 스크립트 실행을 해야 하기 때문에, 웹페이지의 로딩을 지연시킴
- **head에 작성하고 defer를 붙여서 사용하는 방법**
  ```jsx
  <head>
    <script defer src='main.js'></script>
  </head>
  ```
  1. 해당 스크립트 구문을 만났을때는 HTML의 해석과 병렬로 fetch 과정을 수행
  2. HTML의 해석이 종료되어 웹페이지가 ready 상태가 되었을때 정의한 순서대로 스크립트를 실행
  - body 끝에 작성하는 것과 비슷하게 자바스크립트를 완전히 로딩해서 실행하기 전까지는 제대로 표시할수 없겠지만, HTML해석과정에서 fetch를 병렬로 처리하기 때문에 속도면에서 이득이 있음
  - 결국 현존 여러가지 방법중에는 더이상 깔게 없는 좋은 방식 👍
- 이벤트 리스너 로딩 관련
  ```jsx
  // only document
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
  });

  // after resource (css, images)
  window.addEventListener('load', () => {
    console.log('loaded');
  });

  window.addEventListener('beforeunload', () => {
    console.log('before unload');
  });

  window.addEventListener('unload', () => {
    console.log('unload');
  });
  ```
  1. defer가 가장 먼저 실행됨 (HTML파싱 완료 직후에 실행됨)
  2. DOMContentLoaded (HTML파싱 완료 직후에 실행됨)
  3. load (css나 images와 같이 소스에 추가된 리소스들이 전부 다운로드 되어 로딩되고 나서 수행됨)
  4. beforeunload (브라우저가 종료되기 직전에 수행됨)

## Web APIs 실전

### 실습4. 좌표 찾아 007

- 화면상에 좌표를 실시간으로 업데이트 하면서 이미지 또한 출력하는 어플리케이션

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coordinates</title>
    <script src="main.js" defer></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <img src="img/target.png" alt="target" class="target" />
    <div class="line vertical"></div>
    <div class="line horizontal"></div>
    <div class="positionText">0px, 0px</div>
  </body>
</html>
```

```jsx
'use strict';

const target = document.querySelector('.target');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const positionText = document.querySelector('.positionText');

window.addEventListener('mousemove', (event) => {
  // Target Image Move
  target.style.left = `${event.clientX}px`;
  target.style.top = `${event.clientY}px`;

  // Line Move
  horizontal.style.top = `${event.clientY}px`;
  vertical.style.left = `${event.clientX}px`;
  vertical.style.height = `${window.innerHeight}px`;

  // Text Move
  positionText.innerText = `${event.clientX}px, ${event.clientY}px`;
  positionText.style.left = `${event.clientX + 20}px`;
  positionText.style.top = `${event.clientY + 20}px`;
});
```

```css
body {
  margin: 0;
  background-color: black;
}

.line {
  position: absolute;
  background-color: white;
}

.horizontal {
  width: 100%;
  height: 1px;
}

.vertical {
  width: 1px;
  height: 100%;
}

.positionText {
  position: absolute;
  color: white;
  font-size: 22px;
}

.target {
  position: absolute;
  transform: translate(-50%, -50%);
}
```

### 실습5. 토끼를 찾아라

- 당근들과 토끼들을 수직으로 나열해두고, 버튼을 클릭하면 토끼가 중앙에 위치하도록 하는 어플리케이션
- Element.scrollIntoView() 를 찾아볼것
  [Element.scrollIntoView() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scroll</title>
    <script src="main.js" defer></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
        <button class="btn">Find a rabbit 🐇</button>
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img class="rabbit" src="img/rabbit.png" alt="rabbit" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
        <img src="img/carrot.png" alt="carrot" />
      </div>
    </div>
  </body>
</html>
```

```jsx
'use strict';

const btn = document.querySelector('.btn');
const rabbit = document.querySelector('.rabbit');

btn.addEventListener('click', () => {
  rabbit.scrollIntoView({
    //top: rabbitDOMRect.y + rabbitDOMRect.height * 0.5 - document.documentElement.clientHeight * 0.5,
    block: 'center',
    behavior: 'smooth',
  });
});
```

```css
body {
  background-color: black;
}

.btn {
  color: white;
  background-color: tomato;
  font-size: 16px;
  border-radius: 8px;
  padding: 4px 8px;
}

.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}
```

## DOM 완전 정복

### DOM 큰 그림 이해하기

- 이번 챕터에서 공부할것
  - 브라우저가 웹페이지나 웹어플리케이션을 어떻게 분석해서 정확한 위치에 표시하는지
  - 어떻게 DOM 요소를 조작할 수 있는지
  - 조금 더 깊이있게 브라우저가 렌더링 하는 순서를 공부 어떤 CSS를 써야 브라우저 렌더링 성능이 좋아지는지
- Document Object Model
  - 브라우저는 HTML 태그를 읽어서 분석한뒤 노드로 변환 (JavaScript Node)
  - 노드의 오브젝트 안에는 클래스라던지, 텍스트와 같은 입력한 모든 정보가 들어있음
  - Node는 EventTarget 오브젝트를 상속함 (모든 노드는 이벤트가 발생할 수 있음)
  - Document, Element ... 등은 노드를 상속하며, 이는 또한 이벤트가 발생할 수 있다는 것을 의미
  - **DOM**
    [Introduction to the DOM - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
  - **DOM API**
    [https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API)

### 우리의 조상 이벤트타겟 (EventTarget)

- **EventTarget**
  [EventTarget - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- 브라우저에서 HTML태그는 해석되어 엘리먼트는 Node객체로 변환됨
- Node객체는 EventTarget을 상속받아 구현되었기 때문에, EventTarget의 메소드를 사용가능
  ```jsx
  // 엘리먼트를 자바스크립트에서 변수에 할당해서 addEventListener()를 붙여서 사용가능 했던 이유
  EventTarget.addEventListener();
  EventTarget.removeEventListener();
  EventTarget.dispatchEvent();
  // 엘리먼트는 Node이고 Node는 EventTarget을 상속하기 때문
  ```
- **Node**
  [Node - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node)
- Node에도 각종 Props와 더불어 Methods들 또한 존재하는데, 참고해봄직 함

### 웹페이지 요소 분석🔎 (콘솔툴 활용)

- Chrome의 개발툴 (cmd + shift + i) 에서 Element를 이용하면, 각각의 엘리먼트를 선택할수 있는데, $0으로 참조가 가능함

```jsx
> $0.childNodes
> NodeList(7) [text, img, text, h1#brand, text, h3, text]
```

### 알면 유용한 CSSOM (CSS Object Model)

- DOM에 대한 설명에서, 브라우저가 HTML을 해석하여 각각의 HTML태그를 DOM으로 변환한다고 했는데, CSS는 어떤식으로 처리가 될까?
- CSSOM

  [CSS Object Model (CSSOM) - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)

- HTML태그 자체는 DOM으로 정의되고, 태그 내의 인라인 CSS나 파일에서 정의한 CSS등은 별도 해석되어 DOM의 구조로, 각각의 엘리먼트에 정의된 CSSOM이라는 형태로 만들어짐
- CSSOM에서는 유저가 정의한 CSS외에도 브라우저의 기본CSS등이 포함되어 있음 = computed styles
- CSS는 cascading룰에 의거, 부모에 정의된 룰이 자식으로 전파됨
- **Render Tree**
  - DOM (HTML의 해석에 의해 엘리먼트의 트리로 만들어짐)
  - CSSOM (각각의 요소에 어떤 CSS가 최종적으로 적용되어야 하는가에 대한 룰셋)
  - 상기 2개를 합쳐서 Render Tree의 형태로 적용됨
  - 렌더 트리는 사용자에게 보여지는 파트를 표기하는것이기 때문에, DOM에서도 보이는 부분만 포함됨
    - opacity가 0이거나, visibility가 hidden인 경우에는 Render Tree에는 포함이 됨
    - display가 none인 경우에는 Render Tree에 포함되지 않음
- 정리
  - 브라우저는 DOM → CSSOM → Render Tree를 작성하여 사용자에게 보여줌

### 성능 보장 렌더링 순서 ⚡️

- 웹페이지나 웹어플리케이션의 렌더링 과정에 대해서 공부
- 브라우저에서 URL을 입력하게 되면 다음의 순서로 진행
  1. requests/response (HTML)
  2. loading
  3. scripting (HTML → DOM)
  4. rendering (Render Tree 작성)
  5. layout
  6. painting
- Construction
  1. DOM
  2. CSSOM
  3. Render Tree
  - 상기 이 과정을 빠르게 하기 위한 방법
  - DOM의 요소가 작으면 작을수록, CSS의 크기가 작으면 작을수록
  - 불필요한 태그 남용, 쓸데없는 wraping 클래스의 남용 금지
- Operation
  1. layout
     - Render Tree (DOM + CSSOM) 을 이용해서, 각각의 요소가 어느정도 위치일지 구상
     - x, y, width, height 등을 계산
  2. paint
     - 계산된 내용을 바로 그리는것이 아님
     - 어떻게 배치되어 있는지에 따라 이미지를 파트별로 잘게 나누어서 준비 (비트맵)
       - z-index 값과 같이 같은 레이어상에 있다면 레이어별로 준비한다는 뜻
       - 브라우저의 성능개선을 위해서 일부러 레이어 기능을 이용함 (특정 레이어상의 요소가 변경되면 해당 레이어만 리렌더링하기 위해서)
       - CSS에서 will-change 속성이 있다면, 브라우저가 새로운 레이어에 추가함 (남용금지)
  3. composition
     - 브라우저상에 표기하는 순서를 정해서 표기
  - 오퍼레이션 과정을 빠르게 하기 위한 방법
  - paint가 자주 일어나지 않도록 하자
  - translate를 이용하면 composition만 일어나기 때문에 paint는 발생하지 않음
  - layout이 바뀌면 최악 → 하나의 요소의 이동에 의해 주변요소가 영향을 받는 변경을 되도록이면 자제

### 모르면 후회하는 레이어 데모

- CSS상에서 will-change를 입력해서 브라우저에게 변경을 알려주면 브라우저는 해당 파트를 별도 레이어로 만들어냄
- 레이어는 브라우저 개발툴의 요소 → 레이어에서 확인 가능

### 즐겨찾기하면 좋은 사이트 모음 👨‍💻

[CSS Triggers](http://csstriggers.com/)

- CSS 속성값이 좋은지 안좋은지 확인
- 어떤 속성값이 layout, paint, composition이 발생하는지 확인할 수 있는 사이트
- Blink (크롬)
- Gecko (Firefox)
- Webkit (Safari)
- EdgeHTML (구Edge)
- 좋은 예 (composition만 발생) 😘
  - opacity
  - transform
- 나쁜 예 (layout 유발자) 😭
  - width
  - height

### DOM 조작하기

- querySelector()
  [Document.querySelector() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

```jsx
const image = document.querySelector('img');
console.log(image);

// querySelector()는 첫번째 찾아진 Element를 리턴한다
// 찾지 못하면 null을 리턴한다
// querySelector()는 CSS에서 쓸수있는 선택자를 이용해서 DOM을 받아올 수 있다
// Edge에서는 12버전, 인터넷 익스플로러에서는 8부터 지원이 된다
// 그 전에는 getElementById()를 이용했다
```

- 기존 getElementById(), getElementsByClassName()과의 차이점은 같은 API를 이용하면서 쿼리셀렉터를 이용해서 필터링을 할 수 있다는 점
- querySelectorAll()
  [https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
  - querySelectorAll()은 모든 엘리먼트를 받아오며, 리스트 형태로 반환
- DOM의 작성
  - createElemement()
  ```jsx
  const section = document.querySelector('section');
  const h2 = document.createElement('h2');
  h2.setAttribute('class', 'title'); // <h2 class="title"></h2>
  h2.textContent = 'This is a title'; // <h2 class="title">This is a title</h2>
  section.appendChild(h2);
  // section.insertBefore(newNode, referenceNode)
  const h3 = document.querySelector('h3');
  section.insertBefore(h2, h3); // h3직전에 h2가 들어감
  ```

### innerHTML vs createElement 뭘쓰지?

- innerHTML
  - 전체 HTML코드를 받아오거나 수정이 가능
- element조작
  - 레퍼런스를 포함하고 있기 때문에, 여러가지 API를 이용
  - 업데이트 이후에도 참조값이 있기 때문에 삭제하거나 하는 등 다이나믹한 처리가 가능

## DOM 완전 정복 실전

### 실습7. 쇼핑 목록앱 만들기

- 요구사항
  - ToDo리스트처럼 장바구니에 간단하게 원하는 상품을 기재하고 리스트에 추가하는 기능
  - 리스트에서 상품을 삭제하는 기능
  - 브라우저의 스토리지 기능을 이용해서 세션이 끊어져도 기억하는 기능
  - 디자인

## 이벤트

### 이벤트 정확하게 이해하기 (+이벤트의 종류들)

- 브라우저에서 발생할수 있는 이벤트는 다양함
  - 예를들어, 어떤곳을 클릭했을때도 이벤트가 발생하지만, 그 외에도 아래와 같은 이벤트도 발생함
  - 키보드
  - 리사이징
  - 윈도우 닫기
  - 페이지 로딩
  - 양식 제출
  - 비디오가 재생됨
  - 에러
- 다양한 이벤트들을 직접 살펴보기 (MDN사이트에서 이벤트 레퍼런스 확인)
  [Event reference | MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
- 이러한 다양한 이벤트들을 모두 처리할 필요는 없고, 필요한 이벤트를 원하는 엘리먼트에 걸어서 사용할 수 있음
- 특정 엘리먼트에 이벤트를 등록하면 됨
- 엘리먼트에서 이벤트가 발생하면 이벤트를 오브젝트 형태로 만들어서 등록한 콜백함수에 전달해줌
- EventTarget에는 addEventListener, removeEventListener, dispatchEvent가 존재하는데, 이 중 dispatchEvnet는 인공적으로 이벤트를 발생시키는것을 말함

### 실습8. 필수로 알아야 하는 버블링 & 캡쳐링

- 실습코드를 받은 뒤, Click Me를 누르게 되면 버튼 요소 뿐만 아니라 outer와 middle에서도 이벤트가 발생하는 것을 확인할 수 있음
- 왜 outer와 middle에서 이벤트가 발생했을까?
  - 브라우저에서 이벤트를 처리하는 캡쳐링과 버블링 때문
  - 캡쳐링은 특정 요소에서 이벤트를 발생시킬때, 부모로부터 차근차근 해당 객체까지 식별해 나가는 단계를 말함
  - 버블링은 특정 요소에서 특정 이벤트를 발생시키면, 부모에게도 해당 이벤트가 발생되었음을 알려주는것을 말함
    <aside>
    💡 캡쳐링 단계에서는 자바스크립트에서 어떤 작업을 수행해야 하는 경우가 거의 없기 때문에, 일단 버블링에 집중해서 공부 해보자
    
    </aside>

- event의 stopPropagation()을 이용하면 부모에게 이벤트를 전달하는것을 막을 수 있음 (버블링 금지)
- event의 stopImmediatePropagation()을 이용하면 해당 콜백함수만 실행한뒤 다른 리스너의 실행까지 금지
  - 단, 이벤트의 등록 순서에 따라 실행 순서가 결정되기 때문에, 버튼의 등록된 이벤트의 순서상 중간에 실행할 경우에는 그 전까지의 이벤트는 발생하게 됨
- stopPropagation, stopImmediatePropagtion은 되도록이면 사용하지 않는것이 좋음
  - stopPropagation을 사용한다는 것은, 다른 어떤 이벤트들이 있더라도 무시하고 실행하지 않는것을 말하기 때문에, 다른 어떤 처리가 있는지 무시한채 중지하게 됨
  - 프로젝트의 규모가 커질 경우, 해당 처리때문에 오랜기간 디버깅을 해야 할 수도 있음
  - 그럼 stopPropagation을 대체하려면 어떤것을 해야 하면 될까?
  ```tsx
  // 처리해야 하는 이벤트의 타겟과 currentTarget이 일치하지 않으면 종료하는 문구를 추가
  if (event.target !== event.currentTarget) {
    return;
  }
  ```

### 브라우저의 기본 기능을 취소하기 🚨

- 일반적으로 사용하는 브라우저의 기본 동작을 취소하는 방법
  - event.preventDefault()
  - 패시브 이벤트에서는 preventDefault()를 사용할 수 없음
  - 액티브 이벤트는 무엇이고 패시브 이벤트는 무엇이길래 패시브 이벤트에서는 preventDefault()를 사용할수 없다는 걸까
    - 브라우저의 특정 기능들은 액티브, 패시브가 나누어져 있는데, 그 기준은 다음과 같다
      - 액티브 이벤트: 이벤트에 로직을 넣을 경우, 해당 로직이 전부 실행될때까지 기다렸다가 수행하는 것
      - 패시브 이벤트: 예를 들면 스크롤, 빠르게 무언가 해야 하는 경우에는 브라우저에서 담당한 내용을 무조건 수행함
  - 그렇다면 패시브 이벤트는 절대 취소할수 없는걸까?
    - 할수 있음
    - addEventListener()를 이용해서 이벤트를 등록할때 passive를 false로 주게 되면, 강제적으로 해당 리스너를 액티브하게 만들 수 있음
    - 다만, passive가 기본적으로 true로 설정된 요소에는 강제적으로 액티브로 변경하는것이 좋음

### 이벤트 위임 (event delegation)

- 이벤트 위임을 이해하고, 제대로 쓸수 있도록 공부하기
- 이벤트 버블링에 대해서 이해도가 필요
- 부모 컨테이너는 어떤 자식 요소에서 이벤트가 발생하던, 모든 이벤트를 전부 들을 수 있음
- 가령, 다음과 같은 상황에서 li에 이벤트를 부여하고자 한다면

```tsx
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
</ul>
```

- ul에 이벤트를 부여해서, event의 target이 li일 경우를 조건으로 잡아서 이벤트를 처리할 수 있음

### 쇼핑리스트 개선하기

- 쇼핑 목록 앱의 삭제 버튼에 일일히 이벤트를 부여했는데, 그렇게 하지 말고, 부모에만 부여하는 식으로 변경해보자
