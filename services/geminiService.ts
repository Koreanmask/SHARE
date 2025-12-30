import { GoogleGenAI } from "@google/genai";

// We intentionally do not initialize 'ai' here at the top level.
// Initializing it here would cause the entire app to crash with a "Blank Screen"
// if 'process' is undefined in the browser environment (which is common in non-Node builds).
// Instead, we initialize it lazily inside the function where we can safely wrap it or where
// the call stack is isolated from the main render loop.

export const generateAIResponse = async (
  prompt: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    // Check if API key exists to avoid throwing an error inside the SDK immediately
    // We use a safety check for 'process' to avoid ReferenceError in browser-only environments.
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
    
    // To prevent the "Blank Screen" on load, this initialization is moved here.
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `당신은 토목 엔지니어링 파일 공유 플랫폼 'SHARE'의 지능형 비서인 'SHARE AI'입니다.
      
      당신의 목표는 엔지니어들이 리소스를 찾고, 엔지니어링 개념(구조, 지반 등)을 설명하거나 문서 유형을 요약하도록 돕는 것입니다.
      
      플랫폼의 슬로건은 "We Are The Future. Let's SHARE."입니다.
      
      톤: 전문적이고, 미래지향적이며, 도움이 되고, 간결하게 답변하세요.
      
      **중요: 반드시 한국어로 답변해야 합니다.**
      
      파일에 대해 질문을 받으면, 일반적인 엔지니어링 템플릿(DWG, 계산서, 보고서 등) 데이터베이스에 접근할 수 있다고 가정하고 일반적으로 사용 가능한 것을 제안하십시오.`,
      },
      history: history.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Return a friendly error message if the API key is missing or the call fails
    return "죄송합니다. AI 서비스 연결에 문제가 발생했습니다. (API Key 설정 또는 네트워크 상태를 확인해주세요)";
  }
};