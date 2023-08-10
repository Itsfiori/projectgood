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
      onInit() {
        var DataRepository = this.getOwnerComponent().DataRepository,
        oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("newInvoice").attachPatternMatched(this._showdetails.bind(this));


      
      this.DataRepository = DataRepository;        
    },
      _showdetails: function (oEvt) {debugger
        var params = oEvt.getParameter("arguments"),
          sid = params.user_id, 
          sPath = "invoiceDetails?invoicenumber=" + sid,
          oModel = this.getView().getModel(),
          oUser = oModel.getProperty(sPath);
        if (!oUser) {
            this.DataRepository.readsingleUser(sid);
        }
  
        this._bindView(sPath); 
      },
      _bindView: function(sPath){
        this.getView().bindElement(sPath)
  
      },
  });
}
);
