package com.gradingSystem.project.Entities;
import java.util.ArrayList;
import java.util.List;

public class Student{

    private static final int MAX_GRADES = 200; // is this a good number?
    private Long pantherID;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private List<Grade> gradebook;

    public Student(Long pantherID, String firstName, String lastName, String password, String email)
    {
        this.pantherID = pantherID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
       // this.gradebook = new ArrayList<>(); not sure if left out on purpose
    }
    public void addGrade(Grade grade){
        if (gradebook.size() <= MAX_GRADES)
            gradebook.add(grade);
        else
            throw new IllegalStateException("Maximum number of grades reached");
    }

    //Getter and Setters
    public Long getPantherID() {
        return pantherID;
    }

    public void setPantherID(Long pantherID) {
        this.pantherID = pantherID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Grade> getGrades() {
        return gradebook;
    }

    public void setGrades(List<Grade> grades) {
        gradebook = grades;
    }

}
