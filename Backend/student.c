#include<stdio.h>
#include<grade.c>

#define MAX_GRADES
struct Student
{
    int pantherID;
    char firstName[20];
    char lastName[20];
    char password;
    char email[20];
    struct Grade grades[MAX_GRADES];
};

