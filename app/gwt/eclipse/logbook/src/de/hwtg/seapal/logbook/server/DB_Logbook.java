package de.hwtg.seapal.logbook.server;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import de.hwtg.seapal.logbook.client.LogbookRecord;
import de.hwtg.seapal.logbook.client.LogbookListRecord;

public class DB_Logbook extends DB_Conn {

	public DB_Logbook() {
	}

	private boolean executeQuery(String sql) {
		try {
			Connection connection = getConn();
			Statement update = connection.createStatement();
			update.executeUpdate(sql);
			connection.close();
			return true;
		} catch (Exception e) {
			System.err.println("Mysql Statement Error: " + sql);
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * insert new Logbook entry into database
	 */
	public boolean insertLogbookEntry(LogbookRecord data) {
		String name = data.getName();
		String registnumber = escapeForSql(data.getRegisterNumber());
		String sailsign = escapeForSql(data.getSailSign());
		String homeport = escapeForSql(data.getHomeport());
		String yachtclub = escapeForSql(data.getYachtclub());
		String owner = escapeForSql(data.getOwner());
		String insurance = escapeForSql(data.getInsurance());
		String callsign = escapeForSql(data.getCallsign());
		String type = escapeForSql(data.getType());
		String constructer = escapeForSql(data.getConstructer());
		double length = data.getLength();
		double width = data.getWidth();
		double gauge = data.getGauge();
		double mastheight = data.getMastheight();
		double expulsion = data.getExpulsion();
		String rigtype = escapeForSql(data.getRigtype());
		int constructionyear = data.getConstructionyear();
		String engine = escapeForSql(data.getEngine());
		int size_fueltank = data.getSizeFueltank();
		int size_watertank = data.getSizeWatertank();
		int size_sewagetank = data.getSizeSewagetank();
		int size_mainsail = data.getSizeMainsail();
		int size_genua = data.getSizeGenua();
		int size_spi = data.getSizeSpi();

		String sql = "INSERT INTO `seapal`.`logbook`(`shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, " +
		"`insurance`, `callsign`, `type`, `constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, " +
		"`constructionyear`, `engine`, `size_fueltank`, `size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`) " +
		"VALUES ('" +
		name + "', '" + registnumber + "', '" + sailsign + "', '" + homeport + "', '" + yachtclub + "', '" + owner + "', '" +
		insurance + "', '" + callsign + "', '" + type + "', '" + constructer + "', '" + length + "', '" + width + "', '" + gauge + "', '" +
		mastheight + "', '" + expulsion + "', '" + rigtype + "', '" + constructionyear + "', '" + engine + "', '" + size_fueltank + "', '" +
		size_watertank + "', '" + size_sewagetank + "', '" + size_mainsail + "', '" + size_genua + "', '" + size_spi +
		"');";

		System.out.println(sql);

		return executeQuery(sql);
	}

	/**
	 * update existing logbookentry
	 */
	public boolean updateLogbookEntry(LogbookListRecord data) {
		int id = data.getId();
		String name = data.getName();

		// prepare for mysql
		String sId = escapeForSql(new Integer(id).toString());
		String sName = escapeForSql(name);

		String sql = "UPDATE `seapal`.`logbook` " +
				"logookID='" + "NULL" + "', " +
				"shipname='" + sName + "' WHERE" +
				"logookID='" + sId + "'";

		System.out.println(sql);

		return executeQuery(sql);
	}

	/**
	 * delete existing logbook entry
	 */
	public boolean deleteLogbookEntry(LogbookListRecord data) {
		int id = data.getId();

		// prepare for mysql
		String sId = escapeForSql(new Integer(id).toString());

		String sql = "DELETE FROM `seapal`.`logbook` WHERE" +
				"logookID='" + sId + "'";

		System.out.println(sql);

		return executeQuery(sql);
	}
	
	public LogbookRecord[] getLogbookEntries() {
		 String query = "SELECT * FROM logbook;";

         // prepare for rpc transport
         LogbookRecord[] data = null;

         try {
                 Connection connection = getConn();
                 Statement select = connection.createStatement();
                 ResultSet result = select.executeQuery(query);

                 // init object into the size we need, like a recordset
                 int rsSize = getResultSetSize(result); //size the array
                 data = new LogbookRecord[rsSize];

                 int i = 0;
                 while (result.next()) {
                	 data[i] = new LogbookRecord();
                	 data[i].setId(result.getInt(1));
                	 data[i].setName(result.getString(2));
                	 data[i].setRegisterNumber(result.getString(3));
                	 data[i].setSailSign(result.getString(4));
                	 data[i].setHomeport(result.getString(5));
                	 data[i].setYachtclub(result.getString(6));
                	 data[i].setOwner(result.getString(7));
                	 data[i].setInsurance(result.getString(8));
                	 data[i].setCallsign(result.getString(9));
                	 data[i].setType(result.getString(10));
                	 data[i].setConstructer(result.getString(11));
                	 data[i].setLength(new Integer(result.getString(12)));
                	 data[i].setWidth(result.getDouble(13));
                	 data[i].setGauge(result.getDouble(14));
                	 data[i].setMastheight(result.getDouble(15));
                	 data[i].setExpulsion(result.getDouble(16));
                	 data[i].setRigtype(result.getString(17));
                	 data[i].setConstructionyear(result.getInt(18));
                	 data[i].setEngine(result.getString(19));
                	 data[i].setSizeFueltank(result.getInt(20));
                	 data[i].setSizeWatertank(result.getInt(21));
                	 data[i].setSizeSewagetank(result.getInt(22));
                	 data[i].setSizeMainsail(result.getInt(23));
                	 data[i].setSizeGenua(result.getInt(24));
                	 data[i].setSizeSpi(result.getInt(25));
                     i++;
                 }

                 // clean up
                 result.close();
                 connection.close();
         } catch(Exception e) {

                 System.err.println("Mysql Statement Error: " + query);
                 e.printStackTrace();

         }

         // return the array
         return data;
	}
}