sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "project/goods/model/DataRepository",
    "sap/ui/core/Item",
    "sap/ui/dom/jquery/rectContains",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/core/util/MockServer",
  ],
  function (
    Controller,
    Export,
    ExportTypeCSV,
    library,
    Spreadsheet,
    MockServer,
    DataRepository,
    Item,
    exportLibrary,
    rectContains
  ) {
    "use strict";
    var EdmType = exportLibrary.EdmType;

    return Controller.extend("project.goods.controller.overview", {
      onInit: function () {
        // var EdmType = exportLibrary.EdmType;

        var DataRepository = this.getOwnerComponent().DataRepository;
        DataRepository.readUsernew();
      },
      navigateToDeatils: function (oEvt) {
        debugger;
        var osource = oEvt.getSource(),
          oRouter = this.getOwnerComponent().getRouter(),
          oContext = osource.getBindingContext(),
          sId = oContext.getProperty("Invoice_Number");
        oRouter.navTo("newInvoice", { user_id: sId });
      },
      onExportToExcel: function () {
        var oTable = this.byId("idUsersTable");
        var aCols = oTable.getColumns().map(function (oColumn) {
          return oColumn.getHeader().getText();
        });

        var aData = [];
        var aItems = oTable.getItems();

        aItems.forEach(function (oItem) {
          debugger;
          var oCells = oItem.getCells();
          var aRowData = aCols.map(function (sCol, index) {
            return oCells[index].getText();
          });
          aData.push(aRowData);
        });

        if (aData.length === 0) {
          sap.m.MessageToast.show("No data to export.");
          return;
        }

        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet("TableData");

        worksheet.addRow(aCols);
        aData.forEach(function (aRowData) {
          worksheet.addRow(aRowData);
        });

        workbook.xlsx.writeBuffer().then(function (data) {
          var blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          var url = window.URL.createObjectURL(blob);

          var a = document.createElement("a");
          a.href = url;
          a.download = "table_data.xlsx";
          var clickHandler = function () {
            setTimeout(function () {
              window.URL.revokeObjectURL(url);
              a.removeEventListener("click", clickHandler);
            }, 150);
          };
          a.addEventListener("click", clickHandler, false);
          a.click();
          sap.m.MessageToast.show("Data to export successfully.");
        });
      },

      onSearch: function (event) {
        debugger;
        // Get the search query entered by the user
        var sQuery = event.getParameter("query");

        var oBinding = this.getView().byId("idUsersTable").getBinding("items");

        var aFilters = [];
        if (sQuery && sQuery.length > 0) {
          var oFilter = new Filter(
            "Invoice_Number",
            FilterOperator.Contains,
            sQuery
          );

          aFilters.push(oFilter);
        }

        oBinding.filter(aFilters);
      },
      onSuggest: function (event) {
        debugger;
        var sValue = event.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("Status", function (sText) {
                  return (
                    (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
                new Filter("Name", function (sDes) {
                  return (
                    (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
              ],
              false
            ),
          ];
        }

        this.oSF.getBinding("suggestionItems").filter(aFilters);
        this.oSF.suggest();
      },
      onSortPress: function () {
        debugger;
        var oTable = this.getView().byId("idUsersTable");
        var oBinding = oTable.getBinding("items");

        // Determine the sort order based on the current sort state
        var bSortAscending =
          oBinding.aSorters.length === 0 || !oBinding.aSorters[0].bDescending;

        // Create a sorter for the "Status" column with the reverse sort order
        var oStatusSorter = new sap.ui.model.Sorter(
          "Invoice_Number",
          !bSortAscending
        );

        // Apply the sorter to the table binding
        oBinding.sort(oStatusSorter);
      },

      newInvoice: function (oEvent) {
        debugger;
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("newInvoice");
      },
      onDataExport: function () {
        debugger;

        var oExport = new Export({
          // Type that will be used to generate the content. Own ExportType's can be created to support other formats
          exportType: new ExportTypeCSV({
            separatorChar: ",",
            charset: "urf-8",
          }),

          // Pass in the model created above
          models: this.getView().getModel(),

          // binding information for the rows aggregation
          rows: {
            path: "/users",
          },

          // column definitions with column name and binding info for the content

          columns: [
            {
              name: "name",
              template: {
                content: "{Invoice Number}",
              },
            },
            {
              name: "Invoice created date",
              template: {
                content: "{Invoice created date}",
              },
            },
            {
              name: "Supplier",
              template: {
                content: "{SupplierName}",
              },
            },
            {
              name: "stats",
              template: {
                content: "{Status}",
              },
            },
            {
              name: "Dimensions",
              template: {
                content: {
                  parts: ["Width", "Depth", "Height", "DimUnit"],
                  formatter: function (width, depth, height, dimUnit) {
                    return (
                      width + " x " + depth + " x " + height + " " + dimUnit
                    );
                  },
                  state: "Warning",
                },
                // "{Width} x {Depth} x {Height} {DimUnit}"
              },
            },
            {
              name: "Weight",
              template: {
                content: "{WeightMeasure} {WeightUnit}",
              },
            },
            {
              name: "Price",
              template: {
                content: "{Price} {CurrencyCode}",
              },
            },
          ],
        });

        // download exported file
        oExport
          .saveFile()
          .catch(function (oError) {
            sap.m.MessageBox.error(
              "Error when downloading data. Browser might not be supported!\n\n" +
                oError
            );
          })
          .then(function () {
            oExport.destroy();
          });
      },
      createColumnConfig: function () {
        var aCols = [];

        aCols.push({
          label: "Invoice Number",
          type: EdmType.Number,
          property: "Invoice Number",
          scale: 0,
        });

        aCols.push({
          property: "Invoice created date",
          type: EdmType.String,
        });

        aCols.push({
          property: "Supplier",
          type: EdmType.String,
        });

        aCols.push({
          property: "Status",
          type: EdmType.String,
        });

        return aCols;
      },
      onExportToExcel1: function () {
        debugger;
        debugger;
        var oTable = this.getView().byId("idUsersTable");
        var oBinding = oTable.getBinding("items");

        var aTableData = [];
        oBinding.getContexts().forEach(function (oContext) {
          aTableData.push(oContext.getObject());
        });

        var aColumns = oTable.getColumns();
        var aColumnData = aColumns.map(function (oColumn) {
          var sLabel = oColumn.getHeader().getText();
          var sProperty = oColumn.getTemplate().getBindingInfo("text")
            .parts[0].path;
          return {
            label: sLabel,
            property: sProperty,
          };
        });

        var aHeader = aColumnData.map(function (column) {
          return column.label;
        });

        var aRows = aTableData.map(function (rowData) {
          return aColumnData.map(function (column) {
            var aPropertyParts = column.property.split("/");
            var value = rowData;
            for (var i = 0; i < aPropertyParts.length; i++) {
              value = value[aPropertyParts[i]];
            }
            return value || "";
          });
        });

        var aData = [aHeader].concat(aRows);

        var oSheet = XLSX.utils.aoa_to_sheet(aData);
        var oWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(oWorkbook, oSheet, "Sheet1");
        XLSX.writeFile(oWorkbook, "exported_data.xlsx");
      },
    });
  }
);
