
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/ColumnListItem",
  "sap/m/Label",
], function (Controller, JSONModel, Column, Text, ColumnListItem, Label) {
  "use strict";

  return Controller.extend("sap.fiori.project1.controller.Vendorprice", {
    onInit: function () {
      sap.ui.core.BusyIndicator.show(0);
      var url =
        "https://ariba-empathic-reedbuck-up.cfapps.us20.hana.ondemand.com/dev/getVersionsV1?event_id=Doc33123002&ver=v1";
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          var oData = res.data;
          var oModel = new JSONModel();
          oModel.setData(oData);
          this.getView().setModel(oModel);

          var oTable = this.getView().byId("dynamicTable");
          var aItems = oTable.getItems();
          if (aItems.length > 0) {
            var oFirstRow = aItems[0];
            oFirstRow.addStyleClass("highlightRow");
          }
          var aColumns = Object.keys(oData[0]);
          var data = oData.length;
          var lowcol = oData[data - 1].low_flag;

          // Move the last header to the first header
          aColumns.unshift(aColumns.pop());

          // Move the last column data to the first column
          for (var j = 0; j < oData.length; j++) {
            var lastColumnValue = oData[j][aColumns[aColumns.length - 1]];
            for (var i = aColumns.length - 1; i > 0; i--) {
              oData[j][aColumns[i]] = oData[j][aColumns[i - 1]];
            }
            oData[j][aColumns[0]] = lastColumnValue;
          }

          // Columns
          for (var i = 0; i < aColumns.length; i++) {
            var sColumnName = aColumns[i];
            var oHeaderLabel = new Label({ text: sColumnName });
            oHeaderLabel.addStyleClass("headerPadding");

            var oColumn = new Column({
              header: oHeaderLabel,
              demandPopin: true,
              styleClass: sColumnName === lowcol ? "highlightColumn" : "",
              hAlign: "Center",
              Afontweight: "bold",
            });
            oTable.addColumn(oColumn);
          }

          // Add inline style to the cells of the first column
          var aItems = oTable.getItems();
          for (var i = 0; i < aItems.length; i++) {
            var oCells = aItems[i].getCells();
            if (oCells.length > 0) {
              if (i === aItems.length - 1) {
                // Check if it's the last row
                oCells[0].addStyleClass("backgroundFirstColumn"); // Apply background color to the last data cell
              }
            }
          }

          sap.ui.core.BusyIndicator.hide();



          // Rows
          for (var j = 0; j < oData.length; j++) {
            var oRowData = oData[j];
            var oCells = [];
            for (var key in oRowData) {
              if (key !== "Total") {
                var cellValue = oRowData[key];
                var oCell = new Text({
                  text: cellValue,
                  wrapping: true,
                  textAlign: "Center", // Center align the cell contents
                });
                // Highlight the cell containing "Total" in the "itemname" column


                oCells.push(oCell);
              }
            }

            // Highlight the entire row if the "itemname" is "Total"
            if (oRowData["itemName"] === "Total") {
              var oRow = new ColumnListItem({
                cells: oCells,
                type: "Active", // Add type "Active" for highlighting rows on press
                customData: new sap.ui.core.CustomData({
                  key: "highlight",
                  value: "true",
                }),
              });
              oRow.addStyleClass("highlightTotalRow");
              oTable.addItem(oRow);
            } else {
              var oRow = new ColumnListItem({
                cells: oCells,
                type: "Active", // Add type "Active" for highlighting rows on press
              });
              oTable.addItem(oRow);
            }
          }
          sap.ui.core.BusyIndicator.hide();

          // ... (existing code)

        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          sap.ui.core.BusyIndicator.hide();
        });
    },

    onGeneratePDF: function () {
      sap.ui.core.BusyIndicator.show(0);
      var oVBox = this.getView().byId("_IDGenVBox1");
      var oPrintButton = this.getView().byId("printButton");
      var oSubmitButton = this.getView().byId("_IDGenButton1");

      // Hide the buttons temporarily
      oPrintButton.setVisible(false);
      oSubmitButton.setVisible(false);

      var url = "https://ariba-empathic-reedbuck-up.cfapps.us20.hana.ondemand.com/dev/getVersionsV1?event_id=Doc33123002&ver=v1";

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          // PDF generation code here

          // After PDF generation is complete, show the buttons again
          oPrintButton.setVisible(true);
          oSubmitButton.setVisible(true);
          // sap.ui.core.BusyIndicator.hide();
          // sap.ui.core.BusyIndicator.show(0);
          sap.ui.core.BusyIndicator.hide();
          // Print the current page using window.print()
          window.print();
          // sap.ui.core.BusyIndicator.hide();
        });
    },








  });
});



