sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Dialog", // Import Dialog control
  "sap/m/Button", // Import Button control
  "sap/ui/unified/FileUploader", // Import FileUploader control
  "sap/ui/model/Filter",
  "sap/ui/model/json/JSONModel",
 
  "sap/m/MessageBox",
], function (Controller, Dialog, Filter, Button,MessageBox, JSONModel, FileUploader) {
  "use strict";

  return Controller.extend("project.goods.controller.CreateInvoice", {
      onInit: function () {
          debugger
          var oData = {
              name : "World"


          };
          var oModel2 = new sap.ui.model.json.JSONModel();

          oModel2.setData(oData);
          this.getView().setModel(oModel2);





          var jQueryScript = document.createElement('script');
          jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
          document.head.appendChild(jQueryScript);


          var jQueryScript = document.createElement('script');
          jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
          document.head.appendChild(jQueryScript);


      },
      // ,,,,,,,,,,,,,,,,,,,,,upload start,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,


      onUpload: function (e) {
          debugger


          this._import(e.getParameter("files") && e.getParameter("files")[0]);


      },

      _import: function (file) {
          debugger
          var that = this;
          var excelData = {};
          if (file && window.FileReader) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  var data = e.target.result;
                  var workbook = XLSX.read(data, {
                      type: 'binary'
                  });
                  workbook.SheetNames.forEach(function (sheetName) {
                      // Here is your object for every sheet in workbook
                      excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                  });
                  // Setting the data to the local model 
                  // Create a JSON model and set the object as its data
                  // var oModel = new sap.ui.model.json.JSONModel();
                  // oModel.setData(excelData[0]);

                  // that.getView().setModel(oModel, "myModel");



                  var oModel3 = new sap.ui.model.json.JSONModel();

                  oModel3.setData(excelData[0]);
                  that.getView().setModel(oModel3);




              };
              reader.onerror = function (ex) {debugger
                  console.log(ex);
              };
              reader.readAsBinaryString(file);
              var oModel3 = new sap.ui.model.json.JSONModel();

              oModel3.setData(excelData[0]);
              that.getView().setModel(oModel3);
              
          }
      },





      // ,,,,,,,,,,,,,,,,,,,,,upload end,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,


      onsubmit: function () {
          debugger

          var oModel = new sap.ui.model.json.JSONModel();
          var name = this.getOwnerComponent().getModel("emp").getProperty("/name");
          var age = this.getOwnerComponent().getModel("emp").getProperty("/age");
          var dob = this.getOwnerComponent().getModel("emp").getProperty("/dob");


          var dataObject = {
              SupplierName: "",
              REF_Invoice_Number: "",
              Supplier_Address: "",
              Supplier_City: "",
              Status: "pending"
          };
          this.getView().byId("SimpleFormChange354").getValue();

          var oModel = this.getView().getModel();
          var oProperty = oModel.getProperty("/");
          alert(JSON.stringify(oProperty));

      },

  });
});