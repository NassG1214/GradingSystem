package com.gradingSystem.project.Services;
import com.gradingSystem.project.Entities.Student;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentService {
    public List<Student> getStudents() {
        return List.of(new Student(6222222, "Mike", "OxSmall", "password", "email@gmail.com")
        );
    }
}
