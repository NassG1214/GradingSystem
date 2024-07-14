package com.gradingSystem.project.Entities;

public class Teacher {
    private static final int MAX_CLASSES = 10; //max classes per teacher
    private int faculty_ID;
    private int class_code;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    Class[] classes;

    Teacher() {
        classes = new Class[MAX_CLASSES];
    }

    // Getters and Setters
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getFaculty_ID() {
        return faculty_ID;
    }

    public void setFaculty_ID(int faculty_ID) {
        this.faculty_ID = faculty_ID;
    }

    public int getClass_code() {
        return class_code;
    }

    public void setClass_code(int class_code) {
        this.class_code = class_code;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
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

    public Class[] getClasses() {
        return classes;
    }

    public void setClasses(Class[] classes) {
        this.classes = classes;
    }

}
