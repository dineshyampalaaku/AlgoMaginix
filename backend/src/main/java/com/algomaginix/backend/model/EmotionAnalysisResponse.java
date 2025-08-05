package com.algomaginix.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class EmotionAnalysisResponse {

    @JsonProperty("top_emotion")  // 🔁 maps FastAPI's snake_case to camelCase
    private String topEmotion;

    private Map<String, Double> emotions;

    public EmotionAnalysisResponse() {}

    public EmotionAnalysisResponse(String topEmotion, Map<String, Double> emotions) {
        this.topEmotion = topEmotion;
        this.emotions = emotions;
    }

    public String getTopEmotion() {
        return topEmotion;
    }

    public void setTopEmotion(String topEmotion) {
        this.topEmotion = topEmotion;
    }

    public Map<String, Double> getEmotions() {
        return emotions;
    }

    public void setEmotions(Map<String, Double> emotions) {
        this.emotions = emotions;
    }
}
