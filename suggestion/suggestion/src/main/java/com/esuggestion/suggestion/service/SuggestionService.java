package com.esuggestion.suggestion.service;

import com.esuggestion.suggestion.dto.SuggestionDTO;
import com.esuggestion.suggestion.mapper.SuggestionMapper;
import com.esuggestion.suggestion.model.Employee;
import com.esuggestion.suggestion.model.Suggestion;
import com.esuggestion.suggestion.model.SuggestionType;
import com.esuggestion.suggestion.repository.EmployeeRepository;
import com.esuggestion.suggestion.repository.SuggestionRepository;
import com.esuggestion.suggestion.repository.SuggestionTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SuggestionService {

    @Autowired
    private SuggestionRepository suggestionRepository;
    @Autowired
    private SuggestionTypeRepository suggestionTypeRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<SuggestionDTO> readAllSuggestions() {
        return suggestionRepository.findAll()
                .stream()
                .map(SuggestionMapper::toDTO)
                .toList();
    }

    public SuggestionDTO readSuggestionById(UUID id) {
        Suggestion sugge = suggestionRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("User Already Exists"));
        return SuggestionMapper.toDTO(sugge);
    }

    public List<Suggestion> readSuggestionsByStatus(String status) {
        return suggestionRepository.findByStatus(status);
    }

    public List<Suggestion> readSuggestionsByEmployeeId(UUID employeeId) {
        return suggestionRepository.findByEmployeeId(employeeId);
    }

    public void createSuggestion(SuggestionDTO suggestionDTO) {
        SuggestionType suggestionType = suggestionTypeRepository.findById(suggestionDTO.getSuggestionTypeId())
            .orElseThrow(()-> new RuntimeException("Suggestion type not found"));
        Employee employee = employeeRepository.findById(suggestionDTO.getEmployeeId())
            .orElseThrow(()-> new RuntimeException("Employee not found"));

        Suggestion suggestion = SuggestionMapper.toEntity(suggestionDTO, suggestionType, employee);
        suggestionRepository.save(suggestion);
    }

    public String deleteSuggestion(UUID id) {
        Optional<Suggestion> s = suggestionRepository.findById(id);
        if (s.isPresent()) {
            suggestionRepository.deleteById(id);
            return "Suggestion Deleted";
        }else{
            return "failed to delete";
        }
    }
    public String changeSuggestion( UUID id, Suggestion suggestion){
        Optional<Suggestion> s = suggestionRepository.findById(id);
        if (s.isPresent()) {
            Suggestion ss = s.get();
            ss.setTitle(suggestion.getTitle());
            ss.setDescription(suggestion.getDescription());
            ss.setStatus(suggestion.getStatus());
            ss.setSuggestionType(suggestion.getSuggestionType());
            suggestionRepository.save(ss);
            return "Suggestion Changed";
        }else{
            return "Suggestion Not Changed";
        }
    }
    
}
