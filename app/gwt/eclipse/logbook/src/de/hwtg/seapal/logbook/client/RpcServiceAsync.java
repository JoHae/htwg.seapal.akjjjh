package de.hwtg.seapal.logbook.client;

import com.google.gwt.http.client.Request;
import com.google.gwt.user.client.rpc.AsyncCallback;


/**
 * The async counterpart of <code>GreetingService</code>.
 */
public interface RpcServiceAsync {
	public void insertLogbook(LogbookRecord data, AsyncCallback<Boolean> callback);

	public Request getLogbooks(AsyncCallback<LogbookRecord[]> callback);

	void rpcTest(String input, AsyncCallback<String> callback);
}
