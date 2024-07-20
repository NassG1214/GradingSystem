package com.gradingSystem.project.Controllers;

import com.gradingSystem.project.Entities.Class;
import com.gradingSystem.project.Services.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes")
public class ClassController {

    @Autowired
    private ClassService classService;

    @GetMapping
    public List<Class> getAllClasses() {
        return classService.getAllClasses();
    }

    @GetMapping("/{id}")
    public Class getClassById(@PathVariable int id) {
        return classService.getClassById(id);
    }

    @PostMapping
    public Class addClass(@RequestBody Class newClass) {
        return classService.addClass(newClass);
    }

    @DeleteMapping("/{id}")
    public void deleteClass(@PathVariable int id) {
        classService.deleteClass(id);
    }
}
