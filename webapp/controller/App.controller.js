sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project.goods.controller.App", {
        onInit() {
        },
      onLoginPress :function(){
        var oRouter = this.getOwnerComponent().getRouter();
        console.log("onOpen");
        oRouter.navTo("overview");


      }




      });
    }
  );
  