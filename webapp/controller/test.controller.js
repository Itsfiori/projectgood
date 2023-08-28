
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("project.goods.controller.test", {
    onInit: function () {
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");




      var jQueryScript = document.createElement('script');
			jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
			document.head.appendChild(jQueryScript);
		
		
			var jQueryScript = document.createElement('script');
			jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
			document.head.appendChild(jQueryScript);

		},
	
		onUpload: function (e) { debugger
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},

		_import: function (file) {debugger
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
					that.localModel.setData({
						items: excelData
					});
					that.localModel.refresh(true);
				};
				reader.onerror = function (ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},

    onFileUpload: function (oEvent) { debugger
      alert("J")
      var oUploadCollection = oEvent.getSource();
      var aFiles = oEvent.getParameters().files;
      var oFile = aFiles[0];

      if (oFile && oFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        // Read the Excel file content and parse it
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          // Parse the Excel data here (e.g., using a library like SheetJS)
          // Once parsed, update the JSON model with the data
   // Inside your controller's onFileUpload method
// Parse the Excel data here (e.g., using SheetJS)
var oExcelData = reader;
this.oModel.setProperty("/ExcelData", oExcelData);

          this.oModel.setData({ ExcelData: oExcelData });
        }.bind(this);
        reader.readAsBinaryString(oFile);
      } else {
        sap.m.MessageToast.show("Invalid file format. Please upload an Excel file.");
        oUploadCollection.clear();
      }
    }
  });
});
