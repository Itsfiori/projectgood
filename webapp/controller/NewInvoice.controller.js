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
              sid = params.user_id, 
              // https://finished_goods-chatty-klipspringer-no.cfapps.us20.hana.ondemand.com/invoiceDetails?invoicenumber=5
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
  