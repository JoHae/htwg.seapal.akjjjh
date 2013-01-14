package seapal;

import com.fasterxml.jackson.databind.node.*;
import java.sql.*;

import javax.servlet.http.HttpServletRequest;

public class Logbooks {
	
	public static String get() {
		return logbooksGet();
	}
	
	public static String edit(HttpServletRequest request) {
		final String dataId = request.getParameter("dataId");
		
		String query = "";
		if (dataId == null) {
			return "Missing parameter [dataId]";
		} else if (dataId.equals("NULL") == false) {
			query = "UPDATE `seapal`.`logbook` " +
					"SET " +
					"shipname='" + request.getParameter("shipname") + "', " +
					"registnumber='" + request.getParameter("shipregisternumber") + "', " +
					"sailsign='" + request.getParameter("sailsign") + "', " +
					"homeport='" + request.getParameter("homeport") + "', " +
					"yachtclub='" + request.getParameter("yachtclub") + "', " +
					"owner='" + request.getParameter("shipowner") + "', " +
					"insurance='" + request.getParameter("insurance") + "', " +
					"callsign='" + request.getParameter("callsign") + "', " +
					"type='" + request.getParameter("shiptype") + "', " +
					"constructer='" + request.getParameter("constructer") + "', " +
					"length=" + (request.getParameter("shiplength").equals("") ? "NULL" : ("'" + request.getParameter("shiplength") + "'")) + ", " +
					"width=" + (request.getParameter("shipwidth").equals("") ? "NULL" : ("'" + request.getParameter("shipwidth") + "' ")) + ", " +
					"gauge=" + (request.getParameter("gauge").equals("") ? "NULL" : ("'" + request.getParameter("gauge") + "' ")) + ", " +     
					"mastheight=" + (request.getParameter("mastheight").equals("") ? "NULL" : ("'" + request.getParameter("mastheight") + "'")) + ", " +      
					"expulsion=" + (request.getParameter("expulsion").equals("") ? "NULL" : ("'" + request.getParameter("expulsion") + "'")) + ", " +     
					"rigtype='" + request.getParameter("rigtype") + "', " +
					"constructionyear=" + (request.getParameter("constructionyear").equals("") ? "NULL" : ("'" + request.getParameter("constructionyear") + "'")) + ", " +        
					"engine='" + request.getParameter("engine") + "', " +
					"size_fueltank=" + (request.getParameter("size_fueltank").equals("") ? "NULL" : ("'" + request.getParameter("size_fueltank") + "'")) + ", " +         
					"size_watertank=" + (request.getParameter("size_watertank").equals("") ? "NULL" : ("'" + request.getParameter("size_watertank") + "'")) + ", " +         
					"size_sewagetank=" + (request.getParameter("size_sewagetank").equals("") ? "NULL" : ("'" + request.getParameter("size_sewagetank") + "'")) + ", " +         
					"size_mainsail=" + (request.getParameter("size_mainsail").equals("") ? "NULL" : ("'" + request.getParameter("size_mainsail") + "'")) + ", " +       
					"size_genua=" + (request.getParameter("size_genua").equals("") ? "NULL" : ("'" + request.getParameter("size_genua") + "'")) + ", " +         
					"size_spi=" + (request.getParameter("size_spi").equals("") ? "NULL" : ("'" + request.getParameter("size_spi") + "'")) + " " +        
					"WHERE " +
					"logbookID='" + dataId + "'";
		} else {
			query = "INSERT INTO `seapal`.`logbook` \n ( \n" +
							"`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`, \n" +
							"`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`, \n" +
							"`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi` \n" +
							") VALUES ( \n" +
							"NULL, " +
							"'" + request.getParameter("shipname") + "', " +
							"'" + request.getParameter("shipregisternumber") + "', " +
							"'" + request.getParameter("sailsign") + "', " +
							"'" + request.getParameter("homeport") + "', " +
							"'" + request.getParameter("yachtclub") + "', " +
							"'" + request.getParameter("shipowner") + "', " +
							"'" + request.getParameter("insurance") + "', " +
							"'" + request.getParameter("callsign") + "', " +
							"'" + request.getParameter("shiptype") + "', " +
							"'" + request.getParameter("constructer") + "', " +
							(request.getParameter("shiplength").equals("") ? "NULL, " : ("'" + request.getParameter("shiplength") + "', ")) +         
							(request.getParameter("shipwidth").equals("") ? "NULL, " : ("'" + request.getParameter("shipwidth") + "', ")) +            
							(request.getParameter("gauge").equals("") ? "NULL, " : ("'" + request.getParameter("gauge") + "', ")) +         
							(request.getParameter("mastheight").equals("") ? "NULL, " : ("'" + request.getParameter("mastheight") + "', ")) +        
							(request.getParameter("expulsion").equals("") ? "NULL, " : ("'" + request.getParameter("expulsion") + "', ")) +          
							"'" + request.getParameter("rigtype") + "', " +
							(request.getParameter("constructionyear").equals("") ? "NULL, " : ("'" + request.getParameter("constructionyear") + "', ")) +          
							"'" + request.getParameter("engine") + "', " +
							(request.getParameter("size_fueltank").equals("") ? "NULL, " : ("'" + request.getParameter("size_fueltank") + "', ")) +
							(request.getParameter("size_watertank").equals("") ? "NULL, " : ("'" + request.getParameter("size_watertank") + "', ")) +          
							(request.getParameter("size_sewagetank").equals("") ? "NULL, " : ("'" + request.getParameter("size_sewagetank") + "', ")) +         
							(request.getParameter("size_mainsail").equals("") ? "NULL, " : ("'" + request.getParameter("size_mainsail") + "', ")) +      
							(request.getParameter("size_genua").equals("") ? "NULL, " : ("'" + request.getParameter("size_genua") + "', ")) +        
							(request.getParameter("size_spi").equals("") ? "NULL " : ("'" + request.getParameter("size_spi"))) +         
							")";
		}
		
		try {
			Connection connection = DBConn.getConn();
			Statement select = connection.createStatement();
			select.executeUpdate(query);
		} catch (SQLException e) {
			e.printStackTrace();
			return "Error: " + e.getMessage();
		}
		
		return logbooksGet();
	}
	
	public static String delete(HttpServletRequest request) {
		final String removeId = request.getParameter("removeId");
		
		if (removeId == null) {
			return "Missing parameter [removeId]";
		}
		String query = "" + 
				"DELETE FROM `seapal`.`logbook` " +
				"WHERE logbookID=" + removeId;
		
		try {
			Connection connection = DBConn.getConn();
			Statement select = connection.createStatement();
			select.executeUpdate(query);
		} catch (SQLException e) {
			e.printStackTrace();
			return "Error: " + e.getMessage();
		}
		return logbooksGet();
	}
	
	private static String logbooksGet() {
		ArrayNode tJsonResult = JsonNodeFactory.instance.arrayNode();

		String Query = "SELECT * FROM logbook";

		try {
			Connection connection = DBConn.getConn();
			Statement select = connection.createStatement();
			ResultSet result = select.executeQuery(Query);

			while (result.next()) {
				ObjectNode tJsonLogBook = JsonNodeFactory.instance
						.objectNode();
				tJsonLogBook.put("shipname", result.getString("shipname"));
				tJsonLogBook.put("shiptype", result.getString("type"));
				tJsonLogBook.put("shipowner", result.getString("owner"));
				tJsonLogBook.put("shipregisternumber",
						result.getString("registnumber"));
				tJsonLogBook.put("sailsign", result.getString("sailsign"));
				tJsonLogBook.put("homeport", result.getString("homeport"));
				tJsonLogBook
						.put("yachtclub", result.getString("yachtclub"));
				tJsonLogBook
						.put("insurance", result.getString("insurance"));
				tJsonLogBook.put("callsign", result.getString("callsign"));
				tJsonLogBook.put("constructer",
						result.getString("constructer"));
				tJsonLogBook.put("shiplength", result.getString("length"));
				tJsonLogBook.put("engine", result.getString("engine"));
				tJsonLogBook.put("shipwidth", result.getString("width"));
				tJsonLogBook.put("gauge", result.getString("gauge"));
				tJsonLogBook.put("mastheight",
						result.getString("mastheight"));
				tJsonLogBook
						.put("expulsion", result.getString("expulsion"));
				tJsonLogBook.put("rigtype", result.getString("rigtype"));
				tJsonLogBook.put("constructionyear",
						result.getString("constructionyear"));
				tJsonLogBook.put("size_fueltank",
						result.getString("size_fueltank"));
				tJsonLogBook.put("size_watertank",
						result.getString("size_watertank"));
				tJsonLogBook.put("size_sewagetank",
						result.getString("size_sewagetank"));
				tJsonLogBook.put("size_mainsail",
						result.getString("size_mainsail"));
				tJsonLogBook.put("size_genua",
						result.getString("size_genua"));
				tJsonLogBook.put("size_spi", result.getString("size_spi"));
				tJsonLogBook.put("dataId", result.getString("logbookID"));

				tJsonResult.add(tJsonLogBook);
			}
			connection.close();
			return tJsonResult.toString();
		} catch (SQLException e) {
			e.printStackTrace();
			return "Error: " + e.getMessage();
		}
	}
	

}
