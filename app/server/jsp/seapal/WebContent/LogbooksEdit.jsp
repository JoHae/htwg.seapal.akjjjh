<%@page contentType="application/json; charset=UTF-8"%>

<%@page import="seapal.Logbooks"%>


<%
	out.print(Logbooks.edit(request));
	out.flush();
%>