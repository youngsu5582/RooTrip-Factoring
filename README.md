# RooTrip-Factoring

![165 229 86 126_8080_ (1)](https://user-images.githubusercontent.com/44726494/228187883-256028d0-c7e6-44dd-afaf-717f0e8d1de8.png)
**나의 여행을 공유하는 여행용 SNS**

## Table of Contents

1. <a href="#커밋-컨벤션">커밋 컨벤션</a>
2. <a href="#폴더-규칙">폴더 규칙</a>
3. <a href="#팀원">팀원</a>

## 커밋 컨벤션

<img src="https://user-images.githubusercontent.com/44726494/222941077-0441e481-34ce-44d8-9673-7108840d09e6.png" alt="commit convention" width="432px" />

## 브랜치 전략
1인 작성에 따른 간편화
=> branch 3개로 작동 + domain 내 큰 기능 작성시에만 PR로 Merge
### main
상시 배포 되는 branch
### develop
feature 에서 개발한 것을 집합하는 branch
### feature
기능을 개발하는 branch

## 폴더 규칙

```
└─ src
 ├─ configs                  설정 관련
 ├─ decorators               데코레이터
 ├─ libs                     서버 구축에 사용한 코드
 ├─ ├─ api                   요청 , 응답 관련
 ├─ ├─ application           어플리케이션 관련
 ├─ ├─ database              디비 관련
 ├─ ├─ ddd                   ddd 설계 관련
 ├─ ├─ exception             에러 관련
 ├─ modules                  모듈
 ├─ ├─ <domain>             
 ├─ ├─ ├─ domain             도메인이 로직 내 사용할 entity,error,type
 ├─ ├─ ├─ commands           DB 에 수정 가하는 Commands
 ├─ ├─ ├─ queries            DB 에 조회 가하는 Queries
 ├─ ├─ ├─ queries            DB 로직
 ├─ providers                공통 사용 프로바이더
 ├─ utils                    유틸 함수
 ├─ app.module.ts            서버 구성 모듈
 ├─ main.ts                  서버 실행
 ├─ boostrap.application.ts  서버 세팅
 
```

## 팀원

| 이름   | 역할  | 주소                                     |
| ------ | ----- | ---------------------------------------- |
| 김힘찬 | 🛠 PM  | [Github](https://github.com/HmDol)       |
| 강병준 | 🌞 FE | [Github](https://github.com/bangdori)    |
| 정문규 | 🌞 FE | [Github](https://github.com/JungMunGyu)  |
| 우재민 | 🌚 BE | [Github](https://github.com/WooJJam)     |
| 이영수 | 🌚 BE | [Github](https://github.com/youngsu5582) |

🛠 Address: [Notion](https://www.notion.so/e0bed146cc4c4280b7c5a05f4df22b90?v=975aa4fe34d6456e9ca84e4fd59690d6)
<br/> 🌞 Address: [RooTrip-FE](https://github.com/JungMunGyu/RooTrip-Front)
<br/> 🌚 Address: [RooTrip-BE](https://github.com/youngsu5582/RooTrip-Clone)
