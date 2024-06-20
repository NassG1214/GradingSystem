#include<stdio.h>
#include<roster.c>


struct Teacher
{
    int faculty_id;
    int class_code;
    char firstName[20];
    char lastName[20];
    char password;
    char email[20];
    struct Roster rosters[MAX_STUDENTS];
};