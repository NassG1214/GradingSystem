package com.gradingSystem.project.Backend;
import java.sql.*;

public class AvgGradeCalc {
    static final String JDBC_DRIVER = "org.h2.Driver";
    static final String URL = "jdbc:h2:mem:testdb";
    static final String USER = "sa";
    static final String PASS = "password";



    public static void main(String[] args) {
        Connection conn = null;
        try {
            Class.forName(JDBC_DRIVER);
             conn = DriverManager.getConnection(URL, USER, PASS);
                int pantherID = 6222222;
                int classCode = 101;
                double averageGrade = calculateAverageGrade(pantherID, classCode, conn);
                System.out.println("Average Grade: " + averageGrade);
        } catch (SQLException e) {
        e.printStackTrace();
    } catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    private static double calculateAverageGrade(int pantherID, int classCode, Connection conn) {
        double averageGrade = 0;
        String query = "SELECT AVG(grade) AS averageGrade FROM gradebook WHERE pantherID = ? AND classCode = ?";
        try (PreparedStatement preparedStatement = conn.prepareStatement(query)) {
            preparedStatement.setInt(1, pantherID);
            preparedStatement.setInt(2, classCode);
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
