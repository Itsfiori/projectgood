sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project.goods.controller.NewInvoice", {
        onInit() {
            var DataRepository = this.getOwnerComponent().DataRepository,
            oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("newInvoice").attachPatternMatched(this._showdetails.bind(this));
    

          
          this.DataRepository = DataRepository;        
        },
          _showdetails: function (oEvt) {debugger
            var params = oEvt.getParameter("arguments"),
              sid = params.user_id;
              var url = 'https://finished_goods-chatty-klipspringer-no.cfapps.us20.hana.ondemand.com/invoiceDetails?invoicenumber='+sid;
              fetch(url).then(res => res.json()).then(res => {
                var dataModel = new sap.ui.model.json.JSONModel();
                dataModel.setData(res);
                // this.getView().setModel(dataModel, "oJSONModel")
                this.getView().setModel(dataModel);
  
  
        this.getView().bindElement("/header");

// for item

// var dataModel_items = new sap.ui.model.json.JSONModel();
// dataModel_items.setData(res);
// this.getView().setModel(dataModel_items);
// this.getView().bindElement("/item");





      
               
              });
          
      
          },
        
      });
    }
  );
  