package controllers;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.codehaus.jackson.node.ObjectNode;

import play.db.DB;
import play.mvc.Controller;
import play.mvc.Result;

public class Trip extends Controller {

	public static Result getNavigationInfo(String tripId) {
		ObjectNode tJsonNavInfo = play.libs.Json.newObject();
		
		String Query = "SELECT tbTrip.logbookID, tbLogbook.shipname, tbTrip.triptitle, tbTrip.tripID " +
				"FROM seapal.trip AS tbTrip " +
				"JOIN seapal.logbook AS tbLogbook ON tbTrip.logbookID = tbLogbook.logbookID " +
				"WHERE tbTrip.tripID = " + tripId;
		
		try {
			Connection connection = DB.getConnection();
			Statement select = connection.createStatement();
			ResultSet result = select.executeQuery(Query);

			result.next();
			tJsonNavInfo.put("shipname", result.getString("shipname"));
			tJsonNavInfo.put("logbookId", result.getString("logbookID"));
			tJsonNavInfo.put("triptitle", result.getString("triptitle"));
			tJsonNavInfo.put("tripId", result.getString("tripID"));
	
			connection.close();
			return ok(tJsonNavInfo);
		} catch (SQLException e) {
			e.printStackTrace();
			return badRequest(e.getMessage());
		}
	}
}
