package com.esuggestion.suggestion.mapper;

import com.esuggestion.suggestion.dto.FeedbackDTO;
import com.esuggestion.suggestion.model.Admin;
import com.esuggestion.suggestion.model.Feedback;
import com.esuggestion.suggestion.model.Suggestion;

public class FeedbackMapper {
    public static FeedbackDTO toDto(Feedback feedback){
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setComments(feedback.getComments());
        dto.setDecision(feedback.getDecision());
        if (feedback.getSuggestion() != null) {
            dto.setSuggestionId(feedback.getSuggestion().getId());
        }
        if (feedback.getAdmin() != null) {
            dto.setAdminid(feedback.getAdmin().getId());
        }
        return dto;
    }
    public static Feedback toEntity(FeedbackDTO feedbackDTO, Suggestion suggestion, Admin admin){
        Feedback dto = new Feedback();
        dto.setId(feedbackDTO.getId());
        dto.setComments(feedbackDTO.getComments());
        dto.setDecision(feedbackDTO.getDecision());
        dto.setSuggestion(suggestion);
        dto.setAdmin(admin);
        return dto;
    }
}
