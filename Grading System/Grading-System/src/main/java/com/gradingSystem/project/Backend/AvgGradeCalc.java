package com.gradingSystem.project.Backend;
import java.sql.*;

public class AvgGradeCalc {
    static final String JDBC_DRIVER = "org.h2.Driver";
    static final String URL = "jdbc:h2:file:./data/testdb";
    static final String USER = "sa";
    static final String PASS = "password";

    public static void main(String[] args) {
    CalcAvgGrade();
    }
    private static void CalcAvgGrade() {
        try {
            Class.forName(JDBC_DRIVER);
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                int pantherID = 6222222;
                int classCode = 101;
                double averageGrade = calculateAverageGrade(pantherID, classCode, conn);
                System.out.println("Average Grade for student 6222222 in class 101: " + averageGrade);
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
    private static double calculateAverageGrade(int pantherID, int classCode, Connection conn) {
        double averageGrade = 0;
        String query = "SELECT AVG(grade) AS averageGrade FROM gradebook WHERE pantherID = ? AND classCode = ?";
        try (PreparedStatement preparedStatement = conn.prepareStatement(query)) {
            preparedStatement.setInt(1, pantherID);
            preparedStatement.setInt(2, classCode);
            System.out.println(preparedStatement);
            try (ResultSet results = preparedStatement.executeQuery()) {
                if (results.next()) {
                    averageGrade = results.getDouble("averageGrade");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return averageGrade;
    }
}
