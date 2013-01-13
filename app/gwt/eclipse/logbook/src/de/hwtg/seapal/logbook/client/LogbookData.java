package de.hwtg.seapal.logbook.client;

public class LogbookData {
    private static LogbookListRecord[] records;

    public static LogbookListRecord[] getRecords() {
        if (records == null) {
            records = getTestRecords();
        }
        return records;
    }

    public static LogbookListRecord[] getTestRecords() {

    	LogbookListRecord entry1 = new LogbookListRecord();
    	entry1.setId(0);
		entry1.setName("Test1");
		entry1.setType("Segelboot");
		entry1.setRegisterNumber("");
		entry1.setOwner("");
		entry1.setSailSign("");
		entry1.setHomeport("");
		
		LogbookListRecord entry2 = new LogbookListRecord();
		entry2.setId(1);
		entry2.setName("Test2");
		entry2.setType("Segelboot2");

		LogbookListRecord[] dataArr = new LogbookListRecord[2];
		dataArr[0] = entry1;
		dataArr[1] = entry2;
        return dataArr;
    }
    
    public static void setNewRecords(LogbookRecord[] modelRecords) {
    	LogbookListRecord[] data = new LogbookListRecord[modelRecords.length];
    	for (int i = 0; i < modelRecords.length; i++) {
    		data[i] = new LogbookListRecord();
    		data[i].setId(modelRecords[i].getId());
    		data[i].setName(modelRecords[i].getName());
    		data[i].setType(modelRecords[i].getType());
    		data[i].setRegisterNumber(modelRecords[i].getRegisterNumber());
    		data[i].setOwner(modelRecords[i].getOwner());
    		data[i].setSailSign(modelRecords[i].getSailSign());
    		data[i].setHomeport(modelRecords[i].getHomeport());
    		data[i].setYachtclub(modelRecords[i].getYachtclub());
    		data[i].setInsurance(modelRecords[i].getInsurance());
    		data[i].setCallsign(modelRecords[i].getCallsign());
    		data[i].setConstructer(modelRecords[i].getConstructer());
    		data[i].setLength(modelRecords[i].getLength());
    		data[i].setWidth(modelRecords[i].getWidth());
    		data[i].setGauge(modelRecords[i].getGauge());
    		data[i].setMastheight(modelRecords[i].getMastheight());
    		data[i].setExpulsion(modelRecords[i].getExpulsion());
    		data[i].setRigtype(modelRecords[i].getRigtype());
    		data[i].setConstructionyear(modelRecords[i].getConstructionyear());
    		data[i].setEngine(modelRecords[i].getEngine());
    		data[i].setSizeFueltank(modelRecords[i].getSizeFueltank());
    		data[i].setSizeWatertank(modelRecords[i].getSizeWatertank());
    		data[i].setSizeSewagetank(modelRecords[i].getSizeSewagetank());
    		data[i].setSizeMainsail(modelRecords[i].getSizeMainsail());
    		data[i].setSizeGenua(modelRecords[i].getSizeGenua());
    		data[i].setSizeSpi(modelRecords[i].getSizeSpi());
		}
    	records = data;
    }
}
