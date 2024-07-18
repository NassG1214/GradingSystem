package com.gradingSystem.project.WebsiteNavigation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    /*
    @GetMapping("/")
    public String loginRedirect() {
        return "redirect:/login";
    }
    */

    @GetMapping("/login")
    public String loginPage() {
        return "LoginPage";
    }
}
