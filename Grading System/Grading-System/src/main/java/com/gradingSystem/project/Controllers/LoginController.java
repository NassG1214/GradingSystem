package com.gradingSystem.project.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    /* empty directory to redirect to login
    @GetMapping("/")
    public String loginRedirect() {
        return "redirect:/login";
    }
    */

    @GetMapping("/login")
    public String loginPage() {
        return "LoginPage";
    }

    @GetMapping("/student")
    public String studentPage() {  return "StudentPage"; }

    @GetMapping("/teacher")
    public String teacherPage() {  return "ProfessorPage"; }

    //incase we still do hr
    @GetMapping("/hr")
    public String hrPage() {  return "HR-Page"; }

}
