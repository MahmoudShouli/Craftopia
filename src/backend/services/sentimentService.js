// services/sentimentService.js
import pkg from "@google-cloud/translate";
import Sentiment from "sentiment";
import * as franc from "franc";
import path from "path";
import { fileURLToPath } from "url";

const { v2 } = pkg;
const { Translate } = v2;

const sentiment = new Sentiment();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translateClient = new Translate({
  keyFilename: path.join(__dirname, "../config/translate-key.json"),
});

const translateToEnglish = async (text) => {
  const [translated] = await translateClient.translate(text, {
    from: "ar",
    to: "en",
  });
  return translated;
};

const preprocessText = (text) => {
  const lowerText = text.toLowerCase();
  const negativePhrases = [
    "didn't like",
    "was slow",
    "not good",
    "very bad",
    "was terrible",
    "was awful",
    "poor service",
    "disappointed",
    "worst",
    "hate",
    "not happy",
    "was bad",
    "unhappy",
  ];

  for (const phrase of negativePhrases) {
    if (lowerText.includes(phrase)) {
      return { forcedScore: -4, adjustedText: lowerText };
    }
  }
  return { forcedScore: null, adjustedText: lowerText };
};

export const analyzeReview = async (reviewText) => {
  let language = franc.franc(reviewText, { minLength: 1 });
  console.log("📌 Detected language:", language);

  let textForAnalysis = reviewText;

  if (["ara", "arb", "ar"].includes(language)) {
    try {
      textForAnalysis = await translateToEnglish(reviewText);
      language = "arabic";
    } catch (err) {
      console.error("Translation failed:", err.message);
      language = "arabic (untranslated)";
    }
  } else {
    language = "english";
  }

  const { forcedScore, adjustedText } = preprocessText(textForAnalysis);

  const customOptions = {
    extras: {
      slow: -2,
      bad: -3,
      terrible: -4,
      awful: -3,
      disappointed: -3,
      poor: -2,
      worst: -4,
      hate: -3,
      unhappy: -2,
    },
  };

  const result = sentiment.analyze(adjustedText, customOptions);
  const finalScore = forcedScore !== null ? forcedScore : result.score;
  console.log("🧠 Final Sentiment score:", finalScore);

  const sentimentLabel = finalScore >= 0 ? "positive" : "negative";

  return {
    sentiment: sentimentLabel,
    language,
    translatedText: language === "arabic" ? textForAnalysis : null,
  };
};
