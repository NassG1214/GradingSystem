#include<stdio.h>

struct Grade
{
    int class_code;
    char grade_letter;
    float percentage;
 };

void percentage_to_letter(float percentage){
    struct Grade Grade;
    float grade = percentage;

    if (95 <= grade)
    {
        Grade.grade_letter = 'A';
    }
    if (90 <= grade < 95)
    {
        Grade.grade_letter = 'A-';
    }
    if (87 <= grade < 90)
    {
        Grade.grade_letter = 'B+';
    }
    if (83 <= grade < 87)
    {
        Grade.grade_letter = 'B';
    }
    if (80 <= grade < 83)
    {
        Grade.grade_letter = 'B-';
    }
    if (77 <= grade < 80)
    {
        Grade.grade_letter = 'C+';
    }
    if (70 <= grade < 77)
    {
        Grade.grade_letter = 'C';
    }
    if (60 <= grade < 70)
    {
        Grade.grade_letter = 'D';
    }
    if (grade < 60)
    {
        Grade.grade_letter = 'F';
    }
}

void input_grade(int percentage){
    struct Grade Grade;
    Grade.percentage = percentage;
    percentage_to_letter(percentage);
}