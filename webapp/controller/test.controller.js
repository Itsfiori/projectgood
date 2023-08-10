
      sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
      ], function(Controller, JSONModel) {
        "use strict";
      
        return Controller.extend("project.goods.controller.test", {
      
          onInit: function() { debugger
            var url = 'https://finished_goods-chatty-klipspringer-no.cfapps.us20.hana.ondemand.com/invoiceDetails?invoicenumber=5';
            fetch(url).then(res => res.json()).then(res => {
              var dataModel = new sap.ui.model.json.JSONModel();
              dataModel.setData(res);
              // this.getView().setModel(dataModel, "oJSONModel")
              this.getView().setModel(dataModel);


			this.getView().bindElement("/header");
    
             
            }
            );
          },
      
          handleEditPress : function () {
alert("K")
            //Clone the data
            this._oSupplier = jQuery.extend({},                           
               this.getView().getModel().getData().SupplierCollection[0]);
            this._toggleButtonsAndView(true);
 
           },
 
           handleCancelPress : function () {
 
            //Restore the data
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
 
            oData.SupplierCollection[0] = this._oSupplier;
 
            oModel.setData(oData);
            this._toggleButtonsAndView(false);
 
           },
 
           handleSavePress : function () {
 
            this._toggleButtonsAndView(false);
 
           },
 
           _toggleButtonsAndView : function (bEdit) {
            var oView = this.getView();
 
            // Show the appropriate action buttons
            oView.byId(edit).setVisible(!bEdit);
            oView.byId(save).setVisible(bEdit);
            oView.byId(cancel).setVisible(bEdit);
 
            // Set the right form type
            this._showFormFragment(bEdit ? "Change" : "Display");
 
           }
 
      
        });
      });
      