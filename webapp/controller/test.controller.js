sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project.goods.controller.test", {
      onInit: function () {
        this._fetchData();
      },

      _fetchData: function () {
        var sApiUrl = "https://gorest.co.in/public/v2/users";

        fetch(sApiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok.");
            }
            return response.json();
          })
          .then((data) => {
            var oModel = new JSONModel({
              data: data,
            });
            

            // Set the model to the view
            this.getView().setModel(oModel);
          })
          .catch((error) => {
            // Handle error
            console.error("Error fetching data:", error);
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

      onSearchSuggest: function (oEvent) {
        var sValue = oEvent.getParameter("suggestValue");
        var aFilters = [];

        if (sValue) {
          aFilters = [
            new Filter("name", FilterOperator.Contains, sValue),
            new Filter("email", FilterOperator.Contains, sValue),
            new Filter("gender", FilterOperator.Contains, sValue),
            new Filter("status", FilterOperator.Contains, sValue),
          ];
        }

        this.getView()
          .byId("SearchField1")
          .getBinding("suggestionItems")
          .filter(aFilters);
      },
    });
  }
);
