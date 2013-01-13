package de.hwtg.seapal.logbook.client;

import com.smartgwt.client.data.DataSource;
import com.smartgwt.client.data.fields.*;

public class ItemSupplyLocalDS extends DataSource {

    private static ItemSupplyLocalDS instance = null;

    public static ItemSupplyLocalDS getInstance() {
        if (instance == null) {
            instance = new ItemSupplyLocalDS("supplyItemLocalDS");
        }
        return instance;
    }

    public ItemSupplyLocalDS(String id) {

        setID(id);
        DataSourceIntegerField idField = new DataSourceIntegerField("Id");
        idField.setHidden(true);
        idField.setPrimaryKey(true);

        // Fields shown in the grid
        DataSourceTextField nameField = new DataSourceTextField("Name", "Name", 25, true);
        DataSourceTextField typeField = new DataSourceTextField("Type", "Typ", 20, true);
        DataSourceTextField ownerField = new DataSourceTextField("Owner", "Eigent&uuml;mer", 20, true);
        DataSourceTextField regnumField = new DataSourceTextField("RegisterNumber", "Registernummer", 20, true);
        
        DataSourceTextField sailsignField = new DataSourceTextField("Sailsign", "Segelzeichen", 20, false);
        DataSourceTextField homeportField = new DataSourceTextField("Homeport", "Heimathafen", 20, false);
        DataSourceTextField yachtclubField = new DataSourceTextField("Yachtclub", "Yachtclub", 20, false);
        DataSourceTextField insuranceField = new DataSourceTextField("Insurance", "Versicherung", 20, false);
        DataSourceTextField callsignField = new DataSourceTextField("Callsign", "Rufzeichen", 20, false);
        DataSourceTextField constructerField = new DataSourceTextField("Constructer", "Kunstrukteur", 20, false);
        
        DataSourceFloatField lengthField = new DataSourceFloatField("Length", "L&auml;nge", 20, false);
        DataSourceFloatField widthField = new DataSourceFloatField("Width", "Breite", 20, false);
        DataSourceFloatField gaugeField = new DataSourceFloatField("Gauge", "Tiefgang", 20, false);
        DataSourceFloatField mastheightField = new DataSourceFloatField("Mastheight", "Masth&ouml;he", 20, false);
        DataSourceFloatField expulsionField = new DataSourceFloatField("Expulsion", "Verdr&auml;ngung", 20, false);
        
        DataSourceTextField rigtypeField = new DataSourceTextField("Rigtype", "Rigart", 20, false);
        DataSourceIntegerField constructionyear = new DataSourceIntegerField("Constructionyear", "Konstruktionsjahr", 20, false);
        DataSourceTextField engineField = new DataSourceTextField("Engine", "Motor", 20, false);
        
        DataSourceIntegerField sizeFueltankField = new DataSourceIntegerField("SizeFueltank", "Tankgr&ouml;&szlig;e", 20, false);
        DataSourceIntegerField sizeWatertankField = new DataSourceIntegerField("SizeWatertank", "Wassertankgr&ouml;&szlig;e", 20, false);
        DataSourceIntegerField sizeSewagetankField = new DataSourceIntegerField("SizeSewagetank", "Abwassertankgr&ouml;&szlig;e", 20, false);
        DataSourceIntegerField sizeMainsailField = new DataSourceIntegerField("SizeMainsail", "Gro&szlig;segelgr&ouml;&szlig;e", 20, false);
        DataSourceIntegerField sizeGenuaField = new DataSourceIntegerField("SizeGenua", "Genuagr&ouml;&szlig;e", 20, false);
        DataSourceIntegerField sizeSpiField = new DataSourceIntegerField("SizeSpi", "Spigr&ouml;&szlig;e", 20, false);
        

        setFields(idField, nameField, typeField, ownerField, regnumField, sailsignField, homeportField, yachtclubField,
        		insuranceField, callsignField, constructerField, lengthField, widthField, gaugeField, mastheightField,
        		expulsionField, rigtypeField, constructionyear, engineField, sizeFueltankField, sizeWatertankField,
        		sizeSewagetankField, sizeMainsailField, sizeGenuaField, sizeSpiField);
        setClientOnly(true);
        setTestData(LogbookData.getRecords());
    }
}
