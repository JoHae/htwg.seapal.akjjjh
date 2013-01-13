package de.hwtg.seapal.logbook.client;

import com.google.gwt.user.client.rpc.IsSerializable;

/**
 * Information about a logbook entry.
 */
public class LogbookRecord implements IsSerializable {
	
	private int id;
	private String name = "";
	private String type = "";
	private String owner = "";
	private String registerNumber = "";
	private String sailSign = "";
	private String homeport = "";
	private String yachtclub = "";
	private String insurance = "";
	private String callsign = "";
	private String constructer = "";
	private double length = 0;
	private double width = 0;
	private double gauge;
	private double mastheight;
	private double expulsion;
	private String rigtype;
	private int constructionyear;
	private String engine;
	private int sizeFueltank;
	private int sizeWatertank;
	private int sizeSewagetank;
	private int sizeMainsail;
	private int sizeGenua;
	private int sizeSpi;
	
	public LogbookRecord() {
	}
	
	public LogbookRecord(int id, String name, String type) {
		setId(id);
		setName(name);
		setType(type);
	}
	
	 /**
     * @return the unique ID of the contact
     */
    public int getId() {
    	return this.id;
    }
    
    public void setId(int id) {
    	this.id = id;
      }
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getRegisterNumber() {
		return registerNumber;
	}

	public void setRegisterNumber(String registerNumber) {
		this.registerNumber = registerNumber;
	}

	public String getSailSign() {
		return sailSign;
	}

	public void setSailSign(String sailSign) {
		this.sailSign = sailSign;
	}

	public String getHomeport() {
		return homeport;
	}

	public void setHomeport(String homeport) {
		this.homeport = homeport;
	}

	public String getYachtclub() {
		return yachtclub;
	}

	public void setYachtclub(String yachtclub) {
		this.yachtclub = yachtclub;
	}

	public String getInsurance() {
		return insurance;
	}

	public void setInsurance(String insurance) {
		this.insurance = insurance;
	}

	public String getCallsign() {
		return callsign;
	}

	public void setCallsign(String callsign) {
		this.callsign = callsign;
	}

	public String getConstructer() {
		return constructer;
	}

	public void setConstructer(String constructer) {
		this.constructer = constructer;
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public double getGauge() {
		return gauge;
	}

	public void setGauge(double gauge) {
		this.gauge = gauge;
	}

	public double getMastheight() {
		return mastheight;
	}

	public void setMastheight(double mastheight) {
		this.mastheight = mastheight;
	}

	public double getExpulsion() {
		return expulsion;
	}

	public void setExpulsion(double expulsion) {
		this.expulsion = expulsion;
	}

	public String getRigtype() {
		return rigtype;
	}

	public void setRigtype(String rigtype) {
		this.rigtype = rigtype;
	}

	public int getConstructionyear() {
		return constructionyear;
	}

	public void setConstructionyear(int constructionyear) {
		this.constructionyear = constructionyear;
	}

	public String getEngine() {
		return engine;
	}

	public void setEngine(String engine) {
		this.engine = engine;
	}

	public int getSizeFueltank() {
		return sizeFueltank;
	}

	public void setSizeFueltank(int sizeFueltank) {
		this.sizeFueltank = sizeFueltank;
	}

	public int getSizeWatertank() {
		return sizeWatertank;
	}

	public void setSizeWatertank(int sizeWatertank) {
		this.sizeWatertank = sizeWatertank;
	}

	public int getSizeSewagetank() {
		return sizeSewagetank;
	}

	public void setSizeSewagetank(int sizeSewagetank) {
		this.sizeSewagetank = sizeSewagetank;
	}

	public int getSizeMainsail() {
		return sizeMainsail;
	}

	public void setSizeMainsail(int sizeMainsail) {
		this.sizeMainsail = sizeMainsail;
	}

	public int getSizeGenua() {
		return sizeGenua;
	}

	public void setSizeGenua(int sizeGenua) {
		this.sizeGenua = sizeGenua;
	}

	public int getSizeSpi() {
		return sizeSpi;
	}

	public void setSizeSpi(int sizeSpi) {
		this.sizeSpi = sizeSpi;
	}
}