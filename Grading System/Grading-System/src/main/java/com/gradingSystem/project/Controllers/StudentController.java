package com.gradingSystem.project.Controllers;
import com.gradingSystem.project.Entities.Student;
import com.gradingSystem.project.Services.StudentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;


@RestController
@RequestMapping(path = "api/v1/student")
public class StudentController {


    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    public List<Student> getAllStudents() {
        return studentService.getStudents();
    }
}
