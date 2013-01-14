package seapal;

import java.sql.Connection;
import java.sql.DriverManager;


public class DBConn {

	/**
     * db conn
     * 
     * Make sure you add a reference library (external jar in build path) JDBC Connector - 
     *   You will see I put it in /opt/classpath/mysql-connector-java-5.1.5/mysql-connector-java-5.1.12-bin.jar
     * 
     * Be sure the connector is in the buildpath!!!!! /war/WEB-INF/lib/mysql-connector.jar
     * 
     * To achieve speed of concurrent/multiple requests, 
     *   theres some cost in authorization, which can be done away with using DBCP Pooling.
     *   I have achieved huge, huge, huge, speed improvements in MySql requests using pooling. 
     *   But, I would get the standard connection down first. You can layer in DBCP pooling later easily. 
     *   I use pooling in csv2Sqlparsing project, you can find more there. I don't have an example here yet. 
     * 
     * @return Connection
     */
    public static Connection getConn() {

            Connection conn = null;

            // figure out what server this application is being hosted on
            String url              = "jdbc:mysql://localhost/";

            String db               = "seapal";
            String driver = "com.mysql.jdbc.Driver";
            String user     = "root";
            String pass     = "";

            
            url = url + db;
            
            //System.out.println("connection url: " + url);
            
            try {

                    Class.forName(driver).newInstance();
                    conn = DriverManager.getConnection(url, user, pass);

            } catch (Exception e) {

                    // error
                    System.err.println("Mysql Connection Error: ");

                    // for debugging error
                    e.printStackTrace();
            }

            if (conn == null)  {
                    System.out.println("~~~~~~~~~~ can't get a Mysql connection");
            }
            
            return conn;
    }
    
}
