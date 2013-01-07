package de.hwtg.seapal.logbook.server;

import de.hwtg.seapal.logbook.client.RpcService;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

import de.hwtg.seapal.logbook.client.LogbookEntry;

/**
 * The server side implementation of the RPC service.
 */
@SuppressWarnings("serial")
public class RpcServiceImpl extends RemoteServiceServlet implements
		RpcService {

	public String rpcTest(String input) {
		return "Hello, " + input + "! I am running !";
	}
	
	public boolean insertLogbook(LogbookEntry data) {
		DB_Logbook db = new DB_Logbook();
		return db.insertLogbookEntry(data);
	}

	public LogbookEntry[] getLogbooks() {
		DB_Logbook db = new DB_Logbook();
		return db.getLogbookEntries();
	}
}
