package de.hwtg.seapal.logbook.server;

import de.hwtg.seapal.logbook.client.LogbookRecord;

import de.hwtg.seapal.logbook.client.LogbookListRecord;

public class SqlTestClass {

        /**
         * Debug/Run me as a java application to try out the query before you build the client connection
         * Right Click on me > Hit Debug As > Java Application
         * 
         * Make sure you have a JDBC connector in your JVM classpath, or goto Build Path and add external jar. 
         * You will need to change the JDBC connector path in the build path 
         * 
         */
        public static void main(String[] args) {

                LogbookRecord insert_data = new LogbookRecord();
                insert_data.setName("JDBCSchiff");
                insert_data.setRegisterNumber("154");
                insert_data.setOwner("ICH MAN");

                //setup the object
                DB_Logbook db = new DB_Logbook();
                //run my method
                db.insertLogbookEntry(insert_data);
        }
}