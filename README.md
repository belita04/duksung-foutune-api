# 인터넷 기초[04] 과제2 - 나만의 인공지능 서비스 백엔드

## 개요
- [혈액형으로 성격 알아보기](https://github.com/belita04/duksung_fortune/) 서비스를 위한 LLM 호출 API입니다.
- 프론트엔드의 요청을 받아서 Gemini API를 호출하고, LLM의 답변 생성이 완료되면 그 결과를 다시 프론트엔드 쪽으로 응답합니다.

---

## 기능
- 클라이언트로부터 `POST` 요청을 받고 요청 본문(JSON)에서 사용자 정보를 추출합니다.
- Google의 Gemini LLM을 사용하여 성격 분석 텍스트를 생성합니다.
- 분석 결과를 JSON 형식으로 반환합니다.
- CORS 허용을 통해 다양한 출처에서의 접근을 지원합니다.

---

## 사용 기술
- Node.js
- @google/genai (Google Generative AI SDK)
- Vercel Serverless Functions
- dotenv (환경 변수 관리)

---
