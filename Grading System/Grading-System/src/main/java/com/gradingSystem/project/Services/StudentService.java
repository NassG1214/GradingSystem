package com.gradingSystem.project.Services;
import com.gradingSystem.project.Entities.Student;
import java.util.*;

public class StudentService {
    public List<Student> getStudents() {
        return List.of(new Student(6222222L, "Mike", "OxSmall", "password", "email@gmail.com")
        );
    }
}
