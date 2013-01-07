package de.hwtg.seapal.logbook.client;

/*
 * SmartGWT (GWT for SmartClient)
 * Copyright 2008 and beyond, Isomorphic Software, Inc.
 *
 * SmartGWT is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.  SmartGWT is also
 * available under typical commercial license terms - see
 * http://smartclient.com/license
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 */

import com.smartgwt.client.types.VerticalAlignment;
import com.smartgwt.client.widgets.Window;
import com.smartgwt.client.widgets.events.CloseClickHandler;
import com.smartgwt.client.widgets.events.CloseClientEvent;
import com.smartgwt.client.widgets.form.DynamicForm;
import com.smartgwt.client.widgets.form.fields.DateItem;
import com.smartgwt.client.widgets.form.fields.TextItem;

public class EditWindow {

   public void showWindow() {
            final Window winModal = new Window();
            winModal.setWidth(360);
            winModal.setHeight(115);
            winModal.setTitle("Details Editieren");
            winModal.setShowMinimizeButton(false);
            winModal.setIsModal(true);
            winModal.setShowModalMask(true);
            winModal.centerInPage();
            winModal.addCloseClickHandler(new CloseClickHandler() {
                public void onCloseClick(CloseClientEvent event) {
                    winModal.destroy();
                }
            });
            DynamicForm form = new DynamicForm();
            form.setHeight100();
            form.setWidth100();
            form.setPadding(5);
            form.setLayoutAlign(VerticalAlignment.BOTTOM);
            TextItem textItem = new TextItem();
            textItem.setTitle("Text");
            DateItem dateItem = new DateItem();
            dateItem.setTitle("Date");
            DateItem dateItem2 = new DateItem();
            dateItem2.setTitle("Date");
            dateItem2.setUseTextField(true);
            form.setFields(textItem, dateItem, dateItem2);
            winModal.addItem(form);
            winModal.show();
        }
}