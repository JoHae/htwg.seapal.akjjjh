package de.hwtg.seapal.logbook.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Style.Display;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.smartgwt.client.types.Alignment;
import com.smartgwt.client.types.AnimationAcceleration;
import com.smartgwt.client.util.SC;
import com.smartgwt.client.widgets.Button;
import com.smartgwt.client.widgets.Canvas;
import com.smartgwt.client.widgets.Dialog;
import com.smartgwt.client.widgets.ImgButton;
import com.smartgwt.client.widgets.Label;
import com.smartgwt.client.widgets.events.ClickEvent;
import com.smartgwt.client.widgets.events.ClickHandler;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.grid.ListGridField;
import com.smartgwt.client.widgets.grid.ListGridRecord;
import com.smartgwt.client.widgets.layout.HLayout;
import com.smartgwt.client.widgets.layout.LayoutSpacer;
import com.smartgwt.client.widgets.layout.VLayout;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class Logbook implements EntryPoint {
	/**
	 * The message displayed to the user when the server cannot be reached or
	 * returns an error.
	 */
	private static final String SERVER_ERROR = "An error occurred while "
			+ "attempting to contact the server. Please check your network "
			+ "connection and try again.";

	/**
	 * Create a remote service proxy to talk to the server-side Greeting
	 * service.
	 */
	private final RpcServiceAsync rpcService = GWT.create(RpcService.class);

	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		LogbookEntry entry1 = new LogbookEntry();
		entry1.setName("Test1");
		entry1.setOwner("Ich");
		entry1.setRegisterNumber("123456");
		entry1.setType("Segelboot");
		LogbookEntry entry2 = new LogbookEntry();
		entry2.setName("Test2");
		entry2.setOwner("Ich2");
		entry2.setRegisterNumber("36");
		entry2.setType("Segelboot2");

		LogbookEntry[] data = new LogbookEntry[2];
		data[0] = entry1;
		data[1] = entry2;
		
		rpcService.insertLogbook(entry1, new AsyncCallback<Boolean>() {
			public void onFailure(Throwable caught) {
				// Show the RPC error message to the user
				
			}

			public void onSuccess(Boolean result) {
//				dialogBoxRPC.getItem().setContents("Remote Procedure Call");
				
			}
		});
		
		rpcService.insertLogbook(entry2, new AsyncCallback<Boolean>() {
			public void onFailure(Throwable caught) {
				// Show the RPC error message to the user
				
			}

			public void onSuccess(Boolean result) {
//				dialogBoxRPC.getItem().setContents("Remote Procedure Call");
				
			}
		});
		
		final LogbookEntry[] dbData = new LogbookEntry[100];
		rpcService.getLogbooks(new AsyncCallback<LogbookEntry[]>() {
			public void onFailure(Throwable caught) {
				// Show the RPC error message to the user
				
			}

			@Override
			public void onSuccess(LogbookEntry[] result) {
				// TODO Auto-generated method stub
				for (int i = 0; i < result.length; i++) {
					dbData[i] = new LogbookEntry();
					dbData[i].setId(result[i].getId());
					dbData[i].setName(result[i].getName());
					dbData[i].setType(result[i].getType());
					dbData[i].setOwner(result[i].getOwner());
					dbData[i].setRegisterNumber(result[i].getRegisterNumber());
				}
				loadPage(dbData);
			}
		});
	
	}
	
	public void loadPage(LogbookEntry[] dbData) {
		VLayout vLayout = new VLayout();
		vLayout.setID("verticalLayout");
		vLayout.setHeight100();
		vLayout.setWidth100();
		vLayout.setLayoutMargin(10);
		
		/*
		 * HEADER
		 */
		HLayout hLayout = new HLayout(10);
		hLayout.setID("pageHeader");
		hLayout.setHeight(50);
		hLayout.setLayoutMargin(10);
		//hLayout.addMember(new Img("myLogo.png"));
		Label title = new Label("Logb&uuml;cher");
		title.setStyleName("title");
		hLayout.addMember(title);

		final ListGrid logbookGrid = new ListGrid() {
			@Override
			protected Canvas createRecordComponent(final ListGridRecord record,
					Integer colNum) {

				String fieldName = this.getFieldName(colNum);

				if (fieldName.equals("iconField")) {
					HLayout recordCanvas = new HLayout(3);
					recordCanvas.setHeight(22);
					recordCanvas.setAlign(Alignment.CENTER);
					ImgButton editImg = new ImgButton();
					editImg.setShowDown(false);
					editImg.setShowRollOver(false);
					editImg.setLayoutAlign(Alignment.CENTER);
					editImg.setSrc("comment_edit.png");
					editImg.setPrompt("Edit Comments");
					editImg.setHeight(16);
					editImg.setWidth(16);
					editImg.addClickHandler(new ClickHandler() {
						public void onClick(ClickEvent event) {
							SC.say("Edit Comment Icon Clicked for country : "
									+ record.getAttribute("countryName"));
						}
					});

					recordCanvas.addMember(editImg);
					return recordCanvas;
				} else {
					return null;
				}

			}
		};
		logbookGrid.setShowRecordComponents(true);
		logbookGrid.setShowRecordComponentsByCell(true);
		logbookGrid.setCanRemoveRecords(true);

		logbookGrid.setWidth("50%");
		logbookGrid.setHeight("75%");
		logbookGrid.setShowAllRecords(true);

		ListGridField nameField = new ListGridField("name", "Name");
		ListGridField typeField = new ListGridField("type", "Typ");
		ListGridField ownerField = new ListGridField("owner", "Eigentuemer");
		ListGridField registerNumberField = new ListGridField("registerNumber",
				"Registernr.");

		ListGridField iconField = new ListGridField("iconField",
				"Comments/Stats");
		iconField.setWidth(100);

		logbookGrid.setFields(nameField, typeField, ownerField,
				registerNumberField, iconField);
		logbookGrid.setCanResizeFields(true);

		ListGridRecord[] records = new ListGridRecord[dbData.length];
		for (int i = 0; i < dbData.length; i++) {
			if(dbData[i] == null) {
				break;
			}
			records[i] = new ListGridRecord();
			records[i].setAttribute("name", dbData[i].getName());
			records[i].setAttribute("type", dbData[i].getType());
			records[i].setAttribute("owner", dbData[i].getOwner());
			records[i].setAttribute("registerNumber",
					dbData[i].getRegisterNumber());
		}

		logbookGrid.setData(records);
		
		
		
//		logbookGrid.draw();
//		RootPanel.get("tableContainer").add(logbookGrid);
		
		/*
		 * FOR RPC TEST
		 */
		final Button sendButton = new Button("Test RPC");

		// Create the popup dialog box
		final Dialog dialogBoxRPC = new Dialog();
		final Label serverResponseLabel = new Label();
		
		dialogBoxRPC.setAnimateAcceleration(AnimationAcceleration.SMOOTH_START_END);
		dialogBoxRPC.setShowTitle(true);
		dialogBoxRPC.setShowCloseButton(true);
		dialogBoxRPC.setShowStatusBar(false);           
		dialogBoxRPC.setShowShadow(true);
		dialogBoxRPC.setTitle("Remote Procedure Call");
		dialogBoxRPC.setAutoSize(true);
		dialogBoxRPC.setCanDrag(true);
		
		dialogBoxRPC.addItem(new Label("Remote Procedure Call\nSending TestString to the server:\"Test String to server.\"\nServer replies:"));
		dialogBoxRPC.addItem(serverResponseLabel);

		// Create a handler for the sendButton and nameField
		class MyHandler implements ClickHandler {
			/**
			 * Fired when the user clicks on the sendButton.
			 */
			public void onClick(ClickEvent event) {
				sendTestServer();
			}

			/**
			 * Send the name from the nameField to the server and wait for a
			 * response.
			 */
			private void sendTestServer() {
				rpcService.rpcTest("Test String to server.", new AsyncCallback<String>() {
					public void onFailure(Throwable caught) {
						// Show the RPC error message to the user
						serverResponseLabel
								.setStyleName("serverResponseLabelError");
						serverResponseLabel.setContents(SERVER_ERROR);
						dialogBoxRPC.show();
					}

					public void onSuccess(String result) {
//						dialogBoxRPC.getItem().setContents("Remote Procedure Call");
						serverResponseLabel
								.removeStyleName("serverResponseLabelError");
						serverResponseLabel.setContents(result);
						dialogBoxRPC.show();
					}
				});
			}
		}
		
		hLayout.addMember(sendButton);
		vLayout.addMember(hLayout);
		vLayout.addMember(logbookGrid);
		vLayout.draw();
		
		// Add a handler to send the name to the server
		MyHandler handler = new MyHandler();
		sendButton.addClickHandler(handler);
		
		DOM.getElementById("loadingWrapper").getStyle().setDisplay(Display.NONE);
	}
}
