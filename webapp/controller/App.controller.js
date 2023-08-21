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
        // var oRouter = this.getOwnerComponent().getRouter();
        // console.log("onOpen");
        // oRouter.navTo("overview");


        var oModel = this.getView().getModel();
        var username = oModel.getProperty("/username");
        var password = oModel.getProperty("/password");
  
        // Here you can implement your login logic
        if (username === "pankaj" && password === "pankaj") {
          sap.m.MessageToast.show("Login successful!");
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview");
  
        } else {
          sap.m.MessageToast.show("Login failed. Please check your credentials.");
        }


      }




      });
    }
  );
  