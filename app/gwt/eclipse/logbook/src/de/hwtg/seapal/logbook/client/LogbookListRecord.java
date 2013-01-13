package de.hwtg.seapal.logbook.client;

import com.google.gwt.user.client.rpc.IsSerializable;
import com.smartgwt.client.widgets.grid.ListGridRecord;


/**
 * Information about a logbook entry.
 */
public class LogbookListRecord extends ListGridRecord implements IsSerializable {
	
	public LogbookListRecord() {
	}
	
	public LogbookListRecord(int id, String name, String type) {
		setId(id);
		setName(name);
		setType(type);
	}
	
	 /**
     * @return the unique ID of the contact
     */
    public int getId() {
    	return getAttributeAsInt("Id");
    }
    
    public void setId(int id) {
    	setAttribute("Id", id);
      }
	
	public String getName() {
		return getAttribute("Name");
	}

	public void setName(String name) {
		setAttribute("Name", name);
	}

	public String getType() {
		return getAttribute("Type");
	}

	public void setType(String type) {
		setAttribute("Type", type);
	}

	public String getOwner() {
		return getAttribute("Owner");
	}

	public void setOwner(String owner) {
		setAttribute("Owner", owner);
	}

	public String getRegisterNumber() {
		return getAttribute("RegisterNumber");
	}

	public void setRegisterNumber(String registerNumber) {
		setAttribute("RegisterNumber", registerNumber);
	}

	public String getSailSign() {
		return getAttribute("Sailsign");
	}

	public void setSailSign(String sailSign) {
		setAttribute("Sailsign", sailSign);
	}

	public String getHomeport() {
		return getAttribute("Homeport");
	}

	public void setHomeport(String homeport) {
		setAttribute("Homeport", homeport);
	}

	public String getYachtclub() {
		return getAttribute("Yachtclub");
	}

	public void setYachtclub(String yachtclub) {
		setAttribute("Yachtclub", yachtclub);
	}

	public String getInsurance() {
		return getAttribute("Insurance");
	}

	public void setInsurance(String insurance) {
		setAttribute("Insurance", insurance);
	}

	public String getCallsign() {
		return getAttribute("Callsign");
	}

	public void setCallsign(String callsign) {
		setAttribute("Callsign", callsign);
	}

	public String getConstructer() {
		return getAttribute("Constructer");
	}

	public void setConstructer(String constructer) {
		setAttribute("Constructer", constructer);
	}

	public String getLength() {
		return getAttribute("Length");
	}

	public void setLength(double length) {
		setAttribute("Length", length);
	}

	public String getWidth() {
		return getAttribute("Width");
	}

	public void setWidth(double width) {
		setAttribute("Width", width);
	}

	public String getGauge() {
		return getAttribute("Gauge");
	}

	public void setGauge(double gauge) {
		setAttribute("Gauge", gauge);
	}

	public String getMastheight() {
		return getAttribute("Mastheight");
	}

	public void setMastheight(double mastheight) {
		setAttribute("Mastheight", mastheight);
	}

	public String getExpulsion() {
		return getAttribute("Expulsion");
	}

	public void setExpulsion(double expulsion) {
		setAttribute("Expulsion", expulsion);
	}

	public String getRigtype() {
		return getAttribute("Rigtype");
	}

	public void setRigtype(String rigtype) {
		setAttribute("Rigtype", rigtype);
	}

	public String getConstructionyear() {
		return getAttribute("Constructionyear");
	}

	public void setConstructionyear(int constructionyear) {
		setAttribute("Constructionyear", constructionyear);
	}

	public String getEngine() {
		return getAttribute("Engine");
	}

	public void setEngine(String engine) {
		setAttribute("Engine", engine);
	}

	public String getSizeFueltank() {
		return getAttribute("SizeFueltank");
	}

	public void setSizeFueltank(int sizeFueltank) {
		setAttribute("SizeFueltank", sizeFueltank);
	}

	public String getSizeWatertank() {
		return getAttribute("SizeWatertank");
	}

	public void setSizeWatertank(int sizeWatertank) {
		setAttribute("SizeWatertank", sizeWatertank);
	}

	public String getSizeSewagetank() {
		return getAttribute("SizeSewagetank");
	}

	public void setSizeSewagetank(int sizeSewagetank) {
		setAttribute("SizeSewagetank", sizeSewagetank);
	}

	public String getSizeMainsail() {
		return getAttribute("SizeMainsail");
	}

	public void setSizeMainsail(int sizeMainsail) {
		setAttribute("SizeMainsail", sizeMainsail);
	}

	public String getSizeGenua() {
		return getAttribute("SizeGenua");
	}

	public void setSizeGenua(int sizeGenua) {
		setAttribute("SizeGenua", sizeGenua);
	}

	public String getSizeSpi() {
		return getAttribute("SizeSpi");
	}

	public void setSizeSpi(int sizeSpi) {
		setAttribute("SizeSpi", sizeSpi);
	}
}