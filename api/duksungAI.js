import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  const allowedOrigin = "https://belita04.github.io/"

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 허용됩니다." });
  }

  try {
    const { name, birth, bloodType } = req.body;

    if (!name || !birth || !bloodType) {
      return res.status(400).json({ error: "이름(name), 생년월일(birth), 혈액형(bloodType)이 모두 필요합니다." });
    }

    const today = new Date().toISOString().slice(0, 10);

    const prompt = `
이름: ${name}
생년월일: ${birth}
혈액형: ${bloodType}
오늘 날짜: ${today}

이 사람의 혈액형을 바탕으로 오늘의 기분, 주요 성격 특징, 강점과 약점을 150자 이내로 간단하고 긍정적으로 설명해 주세요.
읽는 사람이 기분 좋아질 수 있도록 작성하고, 마지막에는 희망을 주는 짧은 격언도 덧붙여 주세요.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "당신은 60년 경력의 성격 분석 전문가입니다. 사람들의 혈액형 성격 분석 결과를 150자 내외로 긍정적이고 친근하게 전해주세요. 부정적인 내용은 포함하지 말고, 마지막에는 희망과 용기의 메시지를 한 줄 덧붙여 주세요.",
      },
    });

    res.status(200).json({ answer: result.text });
  } catch (err) {
    console.error("Gemini API 오류:", err);
    res.status(500).json({ error: "Gemini API 오류 발생" });
  }
}
