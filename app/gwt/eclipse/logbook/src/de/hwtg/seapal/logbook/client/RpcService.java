package de.hwtg.seapal.logbook.client;

import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;


/**
 * The client side stub for the RPC service.
 */
@RemoteServiceRelativePath("rpcService")
public interface RpcService extends RemoteService {
	public boolean insertLogbook(LogbookRecord data);

	public LogbookRecord[] getLogbooks();

	String rpcTest(String name);
}
