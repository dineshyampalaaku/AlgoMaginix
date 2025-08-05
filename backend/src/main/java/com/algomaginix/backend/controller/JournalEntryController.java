package com.algomaginix.backend.controller;

import com.algomaginix.backend.model.EmotionAnalysisResponse;
import com.algomaginix.backend.model.JournalEntry;
import com.algomaginix.backend.model.TextRequest;
import com.algomaginix.backend.repository.JournalEntryRepository;
import com.algomaginix.backend.service.AnalysisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin("*")
public class JournalEntryController {

    @Autowired
    private JournalEntryRepository journalRepo;

    @Autowired
    private AnalysisService analysisService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public List<JournalEntry> getAllEntries() {
        return journalRepo.findAll();
    }

    @GetMapping("/{id}")
    public JournalEntry getEntryById(@PathVariable Long id) {
        return journalRepo.findById(id).orElse(null);
    }

    @PostMapping("/analyze")
    public JournalEntry analyzeAndSave(@RequestBody TextRequest request) {
        EmotionAnalysisResponse response = analysisService.analyzeText(request.getInputText());

        try {
            // ✅ Convert Map<String, Double> to JSON string
            String emotionJson = objectMapper.writeValueAsString(response.getEmotions());

            JournalEntry entry = new JournalEntry();
            entry.setInputText(request.getInputText());
            entry.setTopEmotion(response.getTopEmotion());
            entry.setEmotionScores(emotionJson);

            return journalRepo.save(entry);

        } catch (Exception e) {
            throw new RuntimeException("Failed to convert emotion scores to JSON", e);
        }
    }
}
