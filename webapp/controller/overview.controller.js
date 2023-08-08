sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "project/goods/model/DataRepository",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Item",
    "sap/ui/dom/jquery/rectContains",
  ],
  function (
    Controller,
    DataRepository,
    Filter,
    FilterOperator,
    Item,
    rectContains
  ) {
    "use strict";

    return Controller.extend("project.goods.controller.overview", {
      onInit: function () {
        var DataRepository = this.getOwnerComponent().DataRepository;
        DataRepository.readUsernew();
      },
      navigateToDeatils: function (oEvt) {
        debugger;
        var osource = oEvt.getSource(),
          oRouter = this.getOwnerComponent().getRouter(),
          oContext = osource.getBindingContext(),
          sId = oContext.getProperty("Invoice Number");
        oRouter.navTo("newInvoice", { user_id: sId });
      },
      onExportToExcel: function () {
        debugger;
        var oTable = this.getView().byId("idUsersTable");
        var aColumns = oTable.getColumns();

        var aColumnData = [];
        aColumns.forEach(function (oColumn) {
          var oLabel = oColumn.getLabel();
          var oTemplate = oColumn.getTemplate();
          var sBindingPath = oTemplate.getBindingInfo("text").binding.getPath();
          aColumnData.push({
            name: oLabel.getText(),
            template: {
              content: {
                path: sBindingPath,
              },
            },
          });
        });

        var oExport = new Export({
          exportType: new ExportTypeCSV({
            separatorChar: ",",
          }),
          models: this.getView().getModel(),
          rows: {
            path: "/users",
          },
          columns: aColumnData,
        });

        oExport.saveFile("UsersData").catch(function (oError) {
          console.error("Error occurred while exporting: " + oError);
        });
      },

      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        var oTable = this.getView().byId("idUsersTable");
        var oBinding = oTable.getBinding("items");

        if (sQuery) {
          var oFilter = new Filter({
            filters: [
              new Filter("name", FilterOperator.Contains, sQuery),
              new Filter("email", FilterOperator.Contains, sQuery),
              new Filter("gender", FilterOperator.Contains, sQuery),
              new Filter("status", FilterOperator.Contains, sQuery),
            ],
            and: false,
          });

          oBinding.filter(oFilter);
        } else {
          oBinding.filter([]);
        }
      },

      onSearchLiveChange: function (oEvent) {
        var sValue = oEvent.getParameter("newValue");
        var oTable = this.getView().byId("idUsersTable");
        var oBinding = oTable.getBinding("items");

        if (sValue) {
          var oFilter = new Filter({
            filters: [
              new Filter("name", FilterOperator.Contains, sValue),
              new Filter("email", FilterOperator.Contains, sValue),
              new Filter("gender", FilterOperator.Contains, sValue),
              new Filter("status", FilterOperator.Contains, sValue),
            ],
            and: false,
          });

          oBinding.filter(oFilter);
        } else {
          oBinding.filter([]);
        }
      },
      onSuggest: function (event) {
        debugger;
        var sValue = event.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("ProductId", function (sText) {
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
        var oTable = this.getView().byId("idUsersTable");
        var oBinding = oTable.getBinding("items");

        // Determine the sort order based on the current sort state
        var bSortAscending =
          oBinding.aSorters.length === 0 || !oBinding.aSorters[0].bDescending;

        // Create a sorter for the "Status" column with the reverse sort order
        var oStatusSorter = new sap.ui.model.Sorter("name", !bSortAscending);

        // Apply the sorter to the table binding
        oBinding.sort(oStatusSorter);
      },

      newInvoice: function (oEvent) {
        debugger;
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("newInvoice");
        // oRouter.navTo("NewInvoice");
      },
    });
  }
);
