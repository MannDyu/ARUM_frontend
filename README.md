# ARUM_frontend

**요약
(mac은 필요한 것 찾아서 설치 필요)
1. git clone
2. 필수 구성요소 설치
3. 폰에 Expo Go 앱 설치 -> https://velog.io/@dngur9801/React-Native-expo%EB%A1%9C-React-Native-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0 참고
   (mac은 xcode 를 설치해서 웹으로도 개발 가능) 
5. yarn install / npm install
6. npm start OR npx expo start
   (expo go app에서 request timed-out 될 경우 : 명령어 뒤에 --tunnel 붙이기)
---
    
## 필수 구성 요소
- Node.js (>= 14.x)
- Yarn
```sh
npm install -g yarn
```
- Expo CLI
```sh
npm install -g expo-cli
```
- 핸드폰 app : Expo Go
설치 후 회원가입
expo Go 사용 방법 




## 프로젝트 클론 방법
```sh
git clone <repository-url>
cd <project-directory>
```


## 프로젝트 dependency 설치 
```sh
yarn install
```
package.json 의 dependency 들이 설치됩니다. 


## 개발 서버 실행 
```sh
expo start
```
Android 에뮬레이터에서 실행: expo start 후 a 키를 누릅니다.
iOS 시뮬레이터에서 실행: expo start 후 i 키를 누릅니다.


---
## 빌드 및 배포 
```sh
expo build:android
expo build:ios
```

## 테스트 실행
```sh
yarn test
```




----
# 브랜치 설정

## 브랜치 전략
이 프로젝트는 페이지별 브랜치 전략을 사용합니다. 각 페이지 작업을 위해 별도의 브랜치를 생성하고, 작업이 완료되면 PR을 통해 메인 브랜치에 병합합니다.


### 브랜치 명명 규칙
- `feature/페이지이름`: 페이지별 브랜치
  - 예시: `feature/홈페이지`, `feature/로그인페이지`, `feature/프로필페이지`

### 브랜치 생성 방법
1. 새로운 페이지 작업을 시작할 때
```sh
git checkout -b 'feat/기능이름'
```


## 작업 후 loal에 커밋 
```sh
git add .
git commit -m 'commit 내용'
```

## 원격 브랜치에 push
```sh
git push origin '작업한 브랜치 이름'
```


기능이 완료? => 일단 냅두기로


## PR 생성 및 리뷰
PR 생성 -> 리뷰 후 메인 브랜치에 병합 





