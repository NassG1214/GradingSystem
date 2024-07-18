package com.gradingSystem.project.WebsiteNavigation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudentLoginController {

    @GetMapping("/student")
    public String studentPage() {
        return "StudentPage";
    }
}
