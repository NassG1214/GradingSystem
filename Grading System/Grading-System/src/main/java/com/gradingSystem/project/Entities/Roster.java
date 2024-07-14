package com.gradingSystem.project.Entities;

public class Roster {

    public static final int MAX_STUDENTS = 50;
    public static final int MIN_STUDENTS = 0;
    private String className;
    private int classID;
    private String[] students;
    int numberOfStudents;

    public Roster() {
        students = new String[MAX_STUDENTS];
        numberOfStudents = 0;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public int getClassID() {
        return classID;
    }

    public void setClassID(int classID) {
        this.classID = classID;
    }

    public String[] getStudents() {
        return students;
    }

    public void setStudents(String[] students) {
        this.students = students;
    }

    public int getNumberOfStudents() {
        return numberOfStudents;
    }

    public void addStudent(String student) {
        if (this.numberOfStudents < MAX_STUDENTS) {
            this.students[numberOfStudents + 1] = (student);
            numberOfStudents++;
        } else {
            throw new IllegalStateException("Maximum number of students reached");
        }
    }
}
