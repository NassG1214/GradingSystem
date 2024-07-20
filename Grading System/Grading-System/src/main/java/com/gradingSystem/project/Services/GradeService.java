package com.gradingSystem.project.Services;

import com.gradingSystem.project.Entities.Grade;
import com.gradingSystem.project.Repositories.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(int id) {
        return gradeRepository.findById(id).orElse(null);
    }

    public Grade addGrade(Grade newGrade) {
        return gradeRepository.save(newGrade);
    }

    public void deleteGrade(int id) {
        gradeRepository.deleteById(id);
    }
}
