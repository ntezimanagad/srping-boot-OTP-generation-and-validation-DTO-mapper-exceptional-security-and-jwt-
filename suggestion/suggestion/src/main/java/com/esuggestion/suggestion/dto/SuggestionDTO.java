package com.esuggestion.suggestion.dto;

import java.util.UUID;

public class SuggestionDTO {
    private UUID id;
    private String title;
    private String description;
    private String status;
    private UUID suggestionTypeId;
    private UUID employeeId;

    

    public SuggestionDTO() {
    }

    
    


    public SuggestionDTO(UUID id, String title, String description, String status, UUID suggestionTypeId,
            UUID employeeId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.suggestionTypeId = suggestionTypeId;
        this.employeeId = employeeId;
    }





    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UUID getSuggestionTypeId() {
        return suggestionTypeId;
    }

    public void setSuggestionTypeId(UUID suggestionTypeId) {
        this.suggestionTypeId = suggestionTypeId;
    }

    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }
}

