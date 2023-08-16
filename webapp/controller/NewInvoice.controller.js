sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog", // Import Dialog control
    "sap/m/Button", // Import Button control
    "sap/ui/unified/FileUploader", // Import FileUploader control
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, Dialog, Filter, Button, JSONModel, FileUploader) {
    "use strict";

    return BaseController.extend("project.goods.controller.NewInvoice", {
      onInit() {
        var DataRepository = this.getOwnerComponent().DataRepository,
          oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("newInvoice")
          .attachPatternMatched(this._showdetails.bind(this));

        this.DataRepository = DataRepository;
      },
      _showdetails: function (oEvt) {
        debugger;
        var params = oEvt.getParameter("arguments"),
          sid = params.user_id;
        var url =
          "https://finished_goods-chatty-klipspringer-no.cfapps.us20.hana.ondemand.com/invoiceDetails?invoicenumber=" +
          sid;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
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
          });
      },

      onUploadTemplatePress: function () {
        debugger;
        var oFileUploader = new sap.ui.unified.FileUploader({
          name: "fileUploader",
          uploadUrl: "https://httpbin.org/post", // Replace with your actual upload URL
          uploadComplete: function (oEvent) {
            var sResponse = oEvent.getParameter("response");
          },
        });

        var oDialog = new sap.m.Dialog({
          title: "Upload Template",
          content: oFileUploader,
          beginButton: new sap.m.Button({
            text: "Upload",
            press: function () {
              oFileUploader.upload();
              oDialog.close();
            },
          }),
          endButton: new sap.m.Button({
            text: "Cancel",
            press: function () {
              oDialog.close();
            },
          }),
          afterClose: function () {
            oDialog.destroy();
          },
        });

        oDialog.open();
      },

      onsubmit: function () {
        debugger;
        var randomNumber = Math.floor(Math.random() * 100000);
        var invoiceNumbernew = { invoiceNum: randomNumber };

        var oModel = this.getView().getModel();
        var oProperty = oModel.getProperty("/");
        oModel.getProperty("/header/REF_Invoice_Number"),
          oModel.getProperty("/header/Supplier_Name"),
          oModel.getProperty("/header/Supplier_Address"),
          oModel.getProperty("/header/Supplier_City"),
          oModel.getProperty("/header/Supplier_Country"),
          oModel.getProperty("/item/0/Comodity_Code"),
          oModel.getProperty("/item/0/Currency"),
          oModel.getProperty("/item/0/Invoice_Value"),
          oModel.getProperty("/item/0/Material_Description");

        var dataObject = {
          SupplierName: oModel.getProperty("/header/Supplier_Name"),
          REF_Invoice_Number: oModel.getProperty("/header/REF_Invoice_Number"),
          Supplier_Address: oModel.getProperty("/header/Supplier_Address"),
          Supplier_City: oModel.getProperty("/header/Supplier_City"),
          Status: "pending",
          invoiceNumbernew,
        };

        alert(JSON.stringify(oProperty));
      },

      onGenerateExcelPress: function () {
        debugger;
        var oModel = this.getView().getModel(); // Get your model

        var data = [
          [
            "REF_Invoice_Number",
            "Supplier Name",
            "Supplier Address",
            "Supplier City",
            "Supplier Country",
            "Comodity_Code",
            "Currency",
            "Invoice_Value",
            "Material_Description",
          ],
          [
            oModel.getProperty("/header/REF_Invoice_Number"),
            oModel.getProperty("/header/Supplier_Name"),
            oModel.getProperty("/header/Supplier_Address"),
            oModel.getProperty("/header/Supplier_City"),
            oModel.getProperty("/header/Supplier_Country"),
            oModel.getProperty("/item/0/Comodity_Code"),
            oModel.getProperty("/item/0/Currency"),
            oModel.getProperty("/item/0/Invoice_Value"),
            oModel.getProperty("/item/0/Material_Description"),
          ],
        ];

        var ws = XLSX.utils.aoa_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Invoice Data");

        // Generate the XLSX file and trigger download
        XLSX.writeFile(wb, "invoice_data.xlsx");
      },
    });
  }
);
