package com.gradingSystem.project.Services;

import com.gradingSystem.project.Entities.Class;
import com.gradingSystem.project.Repositories.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    public Class getClassById(int id) {
        return classRepository.findById(id).orElse(null);
    }

    public Class addClass(Class newClass) {
        return classRepository.save(newClass);
    }

    public void deleteClass(int id) {
        classRepository.deleteById(id);
    }
}
