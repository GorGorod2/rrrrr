import { GoogleGenAI } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiHelp = async (
  question: Question,
  userAnswer: string,
  userRequest: string
): Promise<string> => {
  try {
    const prompt = `
      You are a friendly and helpful English tutor for a Russian-speaking student.
      
      Context:
      The student is working on this question: "${question.question}"
      Topic: ${question.topic}
      Correct Answer: ${question.correctAnswer}
      Student's current input (might be empty or wrong): "${userAnswer}"
      
      The student asks: "${userRequest}"
      
      Task:
      1. Explain the grammar or vocabulary rule simply in Russian (with English examples).
      2. If the student made a mistake, explain why it is wrong without being mean.
      3. Give a hint, but do not give the direct answer immediately unless they are completely stuck and ask for it.
      4. Keep the response concise (under 3 sentences if possible).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Извините, я не могу сейчас ответить. Попробуйте позже.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при соединении с AI репетитором. Проверьте API ключ.";
  }
};

export const getHintForMistake = async (
  question: Question,
  wrongAnswer: string
): Promise<string> => {
  try {
    const prompt = `
      The student gave a wrong answer to an English exercise. Give a very short hint in Russian.
      Question: "${question.question}"
      Correct Answer: "${question.correctAnswer}"
      Student's Wrong Answer: "${wrongAnswer}"
      
      Rules:
      1. Don't give the answer directly.
      2. Explain briefly why the student's answer is wrong or give a grammar tip.
      3. Max 1-2 sentences.
      4. Be encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Попробуйте еще раз! Подумайте о правиле.";
  } catch (error) {
    return "Неверно. Попробуйте еще раз.";
  }
};

export const getMotivation = async (username: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a very short, encouraging message (1 sentence) in Russian for a student named ${username} who is learning English.`,
        });
        return response.text || "Молодец! Так держать!";
    } catch (e) {
        return "Отличная работа!";
    }
}