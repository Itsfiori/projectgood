sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "project/goods/model/DataRepository",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	"sap/ui/core/Item
  ],
  function (Controller,Item, DataRepository, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project.goods.controller.overview", {
      onInit: function () {
        var DataRepository = this.getOwnerComponent().DataRepository;
        DataRepository.readUsernew();
        _sSearchTerm: "";
      },
      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        this._sSearchTerm = sQuery;

        this._applyTableSearch();
      },

      // LiveChange function triggered when the user enters text in the SearchField
      onSearchLiveChange: function (oEvent) {
        var sQuery = oEvent.getParameter("newValue");
        this._sSearchTerm = sQuery;

        this._applyTableSearch();
      },
	  onSearchSuggest: function(oEvent) {
		var sValue = oEvent.getParameter("suggestValue");
		var aSuggestions = [];
	  
		// Implement your logic to provide suggestions based on the entered text (sValue)
		// Example: Assuming you have a suggestionItems array with the suggested strings
		suggestionItems.forEach(function(itemText) {
		  var oItem = new Item({
			text: itemText
		  });
		  aSuggestions.push(oItem);
		});
	  
		var oSearchField = this.getView().byId("SearchField1");
		oSearchField.suggest(aSuggestions);
	  },
      _applyTableSearch: function () {
        var oTable = this.byId("yourTableId");
        var oBinding = oTable.getBinding("items");
        var aFilters = [];

        if (this._sSearchTerm) {
          aFilters.push(
            new Filter("name", FilterOperator.Contains, this._sSearchTerm)
          );
          aFilters.push(
            new Filter("email", FilterOperator.Contains, this._sSearchTerm)
          );
          aFilters.push(
            new Filter("gender", FilterOperator.Contains, this._sSearchTerm)
          );
          aFilters.push(
            new Filter("status", FilterOperator.Contains, this._sSearchTerm)
          );
        }

        oBinding.filter(aFilters);
      },
    });
  }
);
