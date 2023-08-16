sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog", // Import Dialog control
    "sap/m/Button", // Import Button control
    "sap/ui/unified/FileUploader", // Import FileUploader control
    'sap/ui/model/Filter',
    'sap/ui/model/json/JSONModel'], function(
	Controller
) {
	"use strict";

	return Controller.extend("project.goods.controller.CreateInvoice", {
        onInit: function () {

            this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(),"employees");

        }
    ,
    onsubmit:function(){
        debugger

        var oModel = new sap.ui.model.json.JSONModel();
        var name= this.getOwnerComponent().getModel("emp").getProperty("/name");
        var age= this.getOwnerComponent().getModel("emp").getProperty("/age");
        var dob= this.getOwnerComponent().getModel("emp").getProperty("/dob");

        
        var dataObject = { 
            SupplierName: "",
            REF_Invoice_Number: "",
			Supplier_Address: "",
			Supplier_City: "",
            Status:"pending"
          };
          this.getView().byId("SimpleFormChange354").getValue();

          var oModel = this.getView().getModel(); 
          var oProperty = oModel.getProperty("/");
          alert(JSON.stringify(oProperty));

      },

	});
});