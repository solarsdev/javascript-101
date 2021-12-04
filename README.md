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
