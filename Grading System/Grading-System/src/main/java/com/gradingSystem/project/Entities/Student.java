package com.gradingSystem.project.Entities;

import java.util.List;

public class Student{

    private static final int MAX_GRADES = 200; // is this a good number?
    private int pantherID;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private List<Grade> gradebook;

    public void addGrade(Grade grade){
        if (gradebook.size() <= MAX_GRADES)
            gradebook.add(grade);
        else
            throw new IllegalStateException("Maximum number of grades reached");
    }

    //Getter and Setters
    public int getPantherID() {
        return pantherID;
    }

    public void setPantherID(int pantherID) {
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
