package com.algomaginix.backend.controller;

import com.algomaginix.backend.model.JournalEntry;
import com.algomaginix.backend.repository.JournalEntryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/ml")
@CrossOrigin("*")
public class MLController {

    private final WebClient webClient = WebClient.create("http://127.0.0.1:8000");

    @Autowired
    private JournalEntryRepository journalRepo;

    private final ObjectMapper objectMapper = new ObjectMapper(); // for JSON conversion

    @PostMapping("/analyze")
    public Mono<Map<String, Object>> analyzeText(@RequestBody Map<String, String> body) {
        String text = body.get("text");

        return webClient.post()
                .uri("/analyze")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("text", text))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .doOnNext(result -> {
                    try {
                        String topEmotion = (String) result.get("top_emotion");
                        String emotionScores = objectMapper.writeValueAsString(result.get("emotions"));

                        JournalEntry entry = new JournalEntry();
                        entry.setInputText(text);
                        entry.setTopEmotion(topEmotion);
                        entry.setEmotionScores(emotionScores);

                        journalRepo.save(entry);
                    } catch (Exception e) {
                        e.printStackTrace(); // optional: log error
                    }
                });
    }
}
