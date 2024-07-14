package com.gradingSystem.project.Entities;

public class Grade {
    private int classCode;
    private char gradeLetter;
    private float percentage;

    // Getters and setters
    public int getClassCode() {
        return classCode;
    }

    public void setClassCode(int classCode) {
        this.classCode = classCode;
    }

    public char getGradeLetter() {
        return gradeLetter;
    }

    public void setGradeLetter(char gradeLetter) {
        this.gradeLetter = gradeLetter;
    }

    public float getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
        this.gradeLetter = percentageToLetter(percentage);
    }

    private char percentageToLetter(float percentage) {
        if (percentage >= 95) {
            return 'A';
        } else if (percentage >= 90) {
            return 'A';
        } else if (percentage >= 87) {
            return 'B';
        } else if (percentage >= 83) {
            return 'B';
        } else if (percentage >= 80) {
            return 'B';
        } else if (percentage >= 77) {
            return 'C';
        } else if (percentage >= 70) {
            return 'C';
        } else if (percentage >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    }
}
