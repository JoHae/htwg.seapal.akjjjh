package de.hwtg.seapal.logbook.client;

import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;

/**
 * The client side stub for the RPC service.
 */
@RemoteServiceRelativePath("rpcService")
public interface RpcService extends RemoteService {
	public boolean insertLogbook(LogbookEntry data);

	public LogbookEntry[] getLogbooks();

	String rpcTest(String name);
}
