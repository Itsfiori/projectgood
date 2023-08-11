sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/Dialog", // Import Dialog control
        "sap/m/Button", // Import Button control
        "sap/ui/unified/FileUploader" // Import FileUploader control
    ],
    function(BaseController,Dialog,Button,FileUploader) {
      "use strict";
  
      return BaseController.extend("project.goods.controller.NewInvoice", {
        onInit() {
            var DataRepository = this.getOwnerComponent().DataRepository,
            oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("newInvoice").attachPatternMatched(this._showdetails.bind(this));
    

          
          this.DataRepository = DataRepository;        
        },
          _showdetails: function (oEvt) { debugger
            var params = oEvt.getParameter("arguments"),
              sid = params.user_id;
              var url = 'https://finished_goods-chatty-klipspringer-no.cfapps.us20.hana.ondemand.com/invoiceDetails?invoicenumber='+sid;
              fetch(url).then(res => res.json()).then(res => {
                var dataModel = new sap.ui.model.json.JSONModel();
                dataModel.setData(res);
                // this.getView().setModel(dataModel, "oJSONModel")
                this.getView().setModel(dataModel);
  
  
        this.getView().bindElement("/header");




        var oModel = this.getView().getModel(); // Get your model

// Ensure the binding path is correct
var supplierName = oModel.getProperty("/Supplier_Name");

if (supplierName !== null) {
    // Use the value
    console.log("Supplier Name:", supplierName);
} else {
    console.log("Supplier Name is null or not found in the model.");
}


// for item

// var dataModel_items = new sap.ui.model.json.JSONModel();
// dataModel_items.setData(res);
// this.getView().setModel(dataModel_items);
// this.getView().bindElement("/item");





      
               
              });
          
      
          },

          onUploadTemplatePress: function() { debugger
            var oFileUploader = new sap.ui.unified.FileUploader({
                name: "fileUploader",
                uploadUrl: "https://httpbin.org/post", // Replace with your actual upload URL
                uploadComplete: function(oEvent) {
                    var sResponse = oEvent.getParameter("response");
                }
            });
        
            var oDialog = new sap.m.Dialog({
                title: "Upload Template",
                content: oFileUploader,
                beginButton: new sap.m.Button({
                    text: "Upload",
                    press: function() {
                        oFileUploader.upload();
                        oDialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function() {
                        oDialog.close();
                    }
                }),
                afterClose: function() {
                    oDialog.destroy();
                }
            });
        
            oDialog.open();
        },
        onGenerateExcelPress: function() { debugger
          var oModel = this.getView().getModel(); // Get your model
      
          var data = [
              ["Supplier Name", "Supplier Address", "Supplier City", "Supplier Country", "Ref Invoice Number"],
              [
                  oModel.getProperty("/Supplier_Name"),
                  oModel.getProperty("/Supplier_Address"),
                  oModel.getProperty("/Supplier_City"),
                  oModel.getProperty("/Supplier_Country"),
                  oModel.getProperty("/REF_Invoice_Number")
              ]
          ];
      
          var ws = XLSX.utils.aoa_to_sheet(data);
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Invoice Data");
      
          // Generate the XLSX file and trigger download
          XLSX.writeFile(wb, "invoice_data.xlsx");
      }
      
        

        
      });
    }
  );
  