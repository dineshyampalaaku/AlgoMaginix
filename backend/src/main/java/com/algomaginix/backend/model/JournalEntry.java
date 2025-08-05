package com.algomaginix.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String inputText;

    private String topEmotion;

    @Column(columnDefinition = "TEXT")
    private String emotionScores;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ Getters
    public Long getId() {
        return id;
    }

    public String getInputText() {
        return inputText;
    }

    public String getTopEmotion() {
        return topEmotion;
    }

    public String getEmotionScores() {
        return emotionScores;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ✅ Setters
    public void setInputText(String inputText) {
        this.inputText = inputText;
    }

    public void setTopEmotion(String topEmotion) {
        this.topEmotion = topEmotion;
    }

    public void setEmotionScores(String emotionScores) {
        this.emotionScores = emotionScores;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
