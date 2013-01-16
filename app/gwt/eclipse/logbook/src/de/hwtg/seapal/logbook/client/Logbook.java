package de.hwtg.seapal.logbook.client;

/*
 * Smart GWT (GWT for SmartClient)
 * Copyright 2008 and beyond, Isomorphic Software, Inc.
 *
 * Smart GWT is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.  Smart GWT is also
 * available under typical commercial license terms - see
 * http://smartclient.com/license
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 */

import com.smartgwt.client.data.DataSource;
import com.smartgwt.client.types.Autofit;
import com.smartgwt.client.widgets.IButton;
import com.smartgwt.client.widgets.events.ClickEvent;
import com.smartgwt.client.widgets.events.ClickHandler;
import com.smartgwt.client.widgets.form.DynamicForm;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.grid.ListGridRecord;
import com.smartgwt.client.widgets.grid.events.DataArrivedEvent;
import com.smartgwt.client.widgets.grid.events.DataArrivedHandler;
import com.smartgwt.client.widgets.grid.events.RecordClickEvent;
import com.smartgwt.client.widgets.grid.events.RecordClickHandler;
import com.smartgwt.client.widgets.layout.HLayout;
import com.smartgwt.client.widgets.layout.VLayout;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Style.Display;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.web.bindery.event.shared.HandlerRegistration;

public class Logbook implements EntryPoint {

	/**
	 * Create a remote service proxy to talk to the server-side Greeting
	 * service.
	 */
	private final RpcServiceAsync rpcService = GWT.create(RpcService.class);

	public void onModuleLoad() {
		// Call mysql database and update records
		rpcService.getLogbooks(new AsyncCallback<LogbookRecord[]>() {
			public void onFailure(Throwable caught) {
				// Show the RPC error message to the user

			}

			@Override
			public void onSuccess(LogbookRecord[] result) {
				LogbookData.setNewRecords(result);
				loadPage();
			}

			private void loadPage() {
				final DataSource dataSource = ItemSupplyLocalDS.getInstance();
				VLayout layout = new VLayout(15);
				layout.setWidth("940px");

				final DynamicForm form = new DynamicForm();
				form.setIsGroup(true);
				form.setGroupTitle("Edit Details or Create new Logbook");
				form.setNumCols(6);
				form.setDataSource(dataSource);

				final ListGrid listGrid = new ListGrid();
				listGrid.setWidth100();
				listGrid.setHeight(200);
				listGrid.setDataSource(dataSource);
				listGrid.setAutoFetchData(true);
				listGrid.setCanRemoveRecords(true);
				listGrid.addRecordClickHandler(new RecordClickHandler() {
					public void onRecordClick(RecordClickEvent event) {
						form.reset();
						form.editSelectedData(listGrid);
					}
				});
			
				listGrid.addDataArrivedHandler(new DataArrivedHandler() {
					@Override
					public void onDataArrived(DataArrivedEvent event) {
						listGrid.hideField("Sailsign");
						listGrid.hideField("Homeport");
						listGrid.hideField("Yachtclub");
						listGrid.hideField("Insurance");
						listGrid.hideField("Callsign");
						listGrid.hideField("Constructer");
						listGrid.hideField("Length");
						listGrid.hideField("Width");
						listGrid.hideField("Gauge");
						listGrid.hideField("Mastheight");
						listGrid.hideField("Expulsion");
						listGrid.hideField("Rigtype");
						listGrid.hideField("Constructionyear");
						listGrid.hideField("SizeSpi");
						listGrid.hideField("Engine");
						listGrid.hideField("SizeFueltank");
						listGrid.hideField("SizeWatertank");
						listGrid.hideField("SizeSewagetank");
						listGrid.hideField("SizeMainsail");
						listGrid.hideField("SizeGenua");
					}
				});

				layout.addMember(form);
				layout.addMember(listGrid);

				HLayout buttonLayout = new HLayout(15);
				buttonLayout.setWidth("940px");
				
				IButton saveButton = new IButton("Save Logbook");
				saveButton.addClickHandler(new ClickHandler() {
					public void onClick(ClickEvent event) {
						if(listGrid.getSelectedRecord() != null) {
							form.saveData();
						}
					}
				});
				buttonLayout.addMember(saveButton);

				IButton createButton = new IButton("Create Logbook");
				createButton.addClickHandler(new ClickHandler() {
					public void onClick(ClickEvent event) {
						listGrid.deselectAllRecords();
						ListGridRecord new_log = new LogbookListRecord();
						new_log.setAttribute("Id", listGrid.getRecords().length+1);
						new_log.setAttribute("Name", "Neues Logbuch");
						
						dataSource.addData(new_log);

//						listGrid.addData(new_log);
//						listGrid.selectRecord(new_log);
						listGrid.selectSingleRecord(new_log);
			            form.setValues(new_log.toMap());
			            
						form.selectRecord(new_log);
//						form.editSelectedData(listGrid);
						form.saveData();
					}
				});
				buttonLayout.addMember(createButton);
				layout.addMember(buttonLayout);
							
				RootPanel.get("seapal-content").add(layout);
				DOM.getElementById("loadingWrapper").getStyle()
						.setDisplay(Display.NONE);
			}
		});
	}
}