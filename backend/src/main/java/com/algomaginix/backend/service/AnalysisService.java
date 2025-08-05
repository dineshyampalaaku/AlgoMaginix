package com.algomaginix.backend.service;

import com.algomaginix.backend.model.EmotionAnalysisResponse;
import com.algomaginix.backend.model.TextRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AnalysisService {

    private final String FASTAPI_URL = "http://127.0.0.1:8000/analyze";

    public EmotionAnalysisResponse analyzeText(String inputText) {
        RestTemplate restTemplate = new RestTemplate();

        // Prepare JSON body with inputText
        TextRequest request = new TextRequest(inputText);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<TextRequest> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<EmotionAnalysisResponse> response = restTemplate.exchange(
                    FASTAPI_URL,
                    HttpMethod.POST,
                    entity,
                    EmotionAnalysisResponse.class
            );

            return response.getBody();

        } catch (Exception e) {
            // You can customize the fallback/exception handling here
            System.err.println("Error calling FastAPI: " + e.getMessage());

            // Return a default fallback response
            return new EmotionAnalysisResponse("error", null);

        }
    }
}
