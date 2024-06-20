#include<stdio.h>
#include<student.c>

#define MAX_STUDENTS 50

struct Roster{
    char class_name[50];
    int class_id;    
    struct Student students[MAX_STUDENTS];
};