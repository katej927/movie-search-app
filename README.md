# movie-search-app


![Movie Search App1](https://github.com/katej927/Algorithm/assets/69146527/9468b1f7-1942-49bf-9572-8caa6e37a7d0)


# Table of Contents
1. [Link](#main1)
2. [About](#main2)
3. [Techs](#main3)
4. [Detail](#main4)
    * [Search Tab (검색 탭)](#sub4-1)
    * [Favorites Tab (즐겨찾기 탭)](#sub4-2)
6. [Overall](#main5)
    * [성능 최적화](#sub5-1)
    * [컴포넌트 재활용](#sub5-2)
    * [전역적인 color 관리 (by CSS variables)](#sub5-2)


# 📌 Link<a name="main1"></a>
👉 화면 확인 : [배포 링크](https://clever-tartufo-e20ca8.netlify.app/)

👉 코드 확인 : [깃헙 링크](https://github.com/katej927/movie-search-app)

# 📌 About<a name="main2"></a>
> 영화를 검색하고 즐겨찾기 등록이 가능한 앱
> 

- 개발자: 정선미

- 기간: ‘22.5.10 ~ 5.15 (Design + Development)

# 📌 Techs<a name="main3"></a>
- React + Recoil + Typescript
- Intersection Observer
- Loadable Components
- store.js
- react-beautiful-dnd
- react-virtualized
- react-use
- react-helmet-async
- react-router-dom
- axios
- scss + classnames
- camelcase-keys
- lodash
- netlify

# 📌 Detail<a name="main4"></a>

## 🔸 Search Tab (검색 탭)<a name="sub4-1"></a>
> 영화를 검색하는 탭
> 
![movie-search-app2](https://github.com/katej927/Algorithm/assets/69146527/2e38226c-4e10-45ee-bb9b-be32e004ad63)
1. 앱 첫 진입 시, 첫 화면
    
    처음 검색 결과 영역: "검색 결과가 없습니다."로 노출
    
2. 검색어 입력 후 검색 버튼 클릭 시 영화 출현
    - Infinite scroll (by `Intersection Observer`)

        검색결과 목록을 최하단으로 내렸을 때 API를 이용하여 다음 페이지를 불러와 노출
        
    - api response의 key를 camelcase 로 변환 (by `camelcase-keys`)
3. 검색 결과 중 영화 클릭 시, 즐겨찾기 등록 or 제거 가능
    - 즐겨찾기 탭에서 조회 가능

        "즐겨찾기"된 데이터는 로컬 저장하여, 다음에 접속 했을 때, 즐겨찾기 조회 가능 (by `store.js`)

## 🔸 Favorites Tab (즐겨찾기 탭)<a name="sub4-2"></a>
> 현재까지 즐겨찾기한 영화들의 목록을 보여주는 탭
> 
![movie-search-app3](https://github.com/katej927/Algorithm/assets/69146527/fcc7d151-10bb-46ed-b5a0-5f3576b37e82)
- 즐겨찾기 목록 순서를 드래그&드롭으로 조절 가능 (by `react-beautiful-dnd`)

- 한 번에 모든 데이터를 로딩 ( 별도의 페이징 없이 )
- "즐겨찾기 해제"를 누르는 순간 해당 영화를 목록과 로컬에서 즉시 제거

# 📌 Overall<a name="main5"></a>
## 🔸 성능 최적화<a name="sub5-1"></a>
1. windowing (by `react-virtualized`)
    
    React 공식 문서 추천 참고. 보이지 않는 컴포넌트는 렌더링 되지 않고 크기만 차지하고 스크롤 되면 렌더링.
    
2. Code Splitting (by `Loadable Components`)
    - library 선택 이유: React 공식 문서 추천 참고 (`React.lazy`와 Suspense는 아직 SSR이 불가. 또한 Suspense는 실험 단계)

    - 구현 방식: 검색/즐겨찾기 탭, 에러 페이지를 필요한 시점에 불러와 사용. (불러 오는 동안 loading 바 출현)
3. Intersection Observer (for Infinite scroll)
    
    이 기능은 비동기적으로 실행되기 때문에, **`scroll`** 같은 이벤트 기반의 요소 관찰에서 발생하는 [렌더링 성능](https://developers.google.com/web/fundamentals/performance/rendering/?hl=ko)이나 이벤트 연속 호출 같은 문제 없이 사용 가능
    
4. React.memo
    
    props가 바뀌지 않았다면 리렌더링 하지 않도록 설정
    
## 🔸 컴포넌트 재활용<a name="sub5-2"></a>
두 탭 (검색, 즐겨찾기)은 정해진 layout 안에서 데이터만 변경

layout에서는 header, main, footer은 고정되어 있고 `uselocation`, 데이터 (각 탭에서 내려주는) 등을 통해 다른 화면을 보여준다.

## 🔸 전역적인 color 관리 (by CSS variables)<a name="sub5-3"></a>


- `CSS custom properties (variables)` 활용
- 문서 전반적으로 재사용할 임의의 css(color) 값을 담아 효율적인 css 관리 도모
