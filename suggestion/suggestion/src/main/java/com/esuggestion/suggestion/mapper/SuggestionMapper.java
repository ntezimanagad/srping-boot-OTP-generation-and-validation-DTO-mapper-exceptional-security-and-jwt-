package com.esuggestion.suggestion.mapper;

import com.esuggestion.suggestion.model.Suggestion;
import com.esuggestion.suggestion.dto.SuggestionDTO;
import com.esuggestion.suggestion.model.Employee;
import com.esuggestion.suggestion.model.SuggestionType;

public class SuggestionMapper {

    public static SuggestionDTO toDTO(Suggestion suggestion) {
        SuggestionDTO dto = new SuggestionDTO();
        dto.setId(suggestion.getId());
        dto.setTitle(suggestion.getTitle());
        dto.setDescription(suggestion.getDescription());
        dto.setStatus(suggestion.getStatus());

        if (suggestion.getSuggestionType() != null) {
            dto.setSuggestionTypeId(suggestion.getSuggestionType().getId());
        }
        if (suggestion.getEmployee() != null) {
            dto.setEmployeeId(suggestion.getEmployee().getId());
        }

        return dto;
    }

    public static Suggestion toEntity(SuggestionDTO dto, SuggestionType suggestionType, Employee employee) {
        Suggestion suggestion = new Suggestion();
        suggestion.setId(dto.getId());
        suggestion.setTitle(dto.getTitle());
        suggestion.setDescription(dto.getDescription());
        suggestion.setStatus(dto.getStatus());
        suggestion.setSuggestionType(suggestionType);
        suggestion.setEmployee(employee);
        return suggestion;
    }
}

