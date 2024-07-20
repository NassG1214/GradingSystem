package com.gradingSystem.project.Services;

import com.gradingSystem.project.Entities.Student;
import com.gradingSystem.project.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student addStudent(Student newStudent) {
        return studentRepository.save(newStudent);
    }

    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }
}
