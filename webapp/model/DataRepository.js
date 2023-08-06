sap.ui.define(
    [
      "sap/ui/base/Object",
      "sap/ui/model/json/JSONModel",
      "./UserService",
      "project/goods/utils/config",
    ],
    function (baseObject, JSONModel, UserService, config) {
      "use strict";
      var commonAPIs = {
          baseData: {
            users: [],
          },
          constructor: function (oComp) {
            // var vReturn = baseObject.prototype.contructor.apply(oComp);
            this.oComp = oComp;
            var oModel = new JSONModel(jQuery.extend(true, {}, this.baseData));
            this.oComp.setModel(oModel);
          },
          getDataModel: function () {
            return this.oComp.getModel();
          },
        },
        oFinalService = jQuery.extend(true, commonAPIs, UserService, config),
        oService = baseObject.extend(
          "project.goods.model.DataRepository",
          oFinalService
        );
      return oService;
    }
  );
  