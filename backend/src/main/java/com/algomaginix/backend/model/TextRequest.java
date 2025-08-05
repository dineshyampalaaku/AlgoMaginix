package com.algomaginix.backend.model;

public class TextRequest {
    private String inputText;

    public TextRequest() {}

    public TextRequest(String inputText) {
        this.inputText = inputText;
    }

    public String getInputText() {
        return inputText;
    }

    public void setInputText(String inputText) {
        this.inputText = inputText;
    }
}
