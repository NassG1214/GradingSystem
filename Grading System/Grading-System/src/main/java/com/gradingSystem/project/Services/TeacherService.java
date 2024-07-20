package com.gradingSystem.project.Services;

import com.gradingSystem.project.Entities.Teacher;
import com.gradingSystem.project.Repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(int id) {
        return teacherRepository.findById(id).orElse(null);
    }

    public Teacher addTeacher(Teacher newTeacher) {
        return teacherRepository.save(newTeacher);
    }

    public void deleteTeacher(int id) {
        teacherRepository.deleteById(id);
    }
}
