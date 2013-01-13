package de.hwtg.seapal.logbook.server;

import de.hwtg.seapal.logbook.client.RpcService;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

import de.hwtg.seapal.logbook.client.LogbookRecord;


/**
 * The server side implementation of the RPC service.
 */
@SuppressWarnings("serial")
public class RpcServiceImpl extends RemoteServiceServlet implements
		RpcService {

	public String rpcTest(String input) {
		return "Hello, " + input + "! I am running !";
	}
	
	public boolean insertLogbook(LogbookRecord data) {
		DB_Logbook db = new DB_Logbook();
		return db.insertLogbookEntry(data);
	}

	public LogbookRecord[] getLogbooks() {
		DB_Logbook db = new DB_Logbook();
		return db.getLogbookEntries();
	}
}
