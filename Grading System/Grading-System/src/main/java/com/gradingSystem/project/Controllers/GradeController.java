package com.gradingSystem.project.Controllers;

import com.gradingSystem.project.Entities.Grade;
import com.gradingSystem.project.Services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @GetMapping
    public List<Grade> getAllGrades() {
        return gradeService.getAllGrades();
    }

    @GetMapping("/{id}")
    public Grade getGradeById(@PathVariable int id) {
        return gradeService.getGradeById(id);
    }

    @PostMapping
    public Grade addGrade(@RequestBody Grade newGrade) {
        return gradeService.addGrade(newGrade);
    }

    @DeleteMapping("/{id}")
    public void deleteGrade(@PathVariable int id) {
        gradeService.deleteGrade(id);
    }
}
