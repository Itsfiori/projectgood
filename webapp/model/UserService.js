sap.ui.define([], function () {
  "use strict";
  return {
    //     readUser1: function () {
    //       console.log("readuser")
    //       jQuery.get({
    // // /dev/user?userid=einvoiceportal@gmail.com
    //           // url: this._baseUrl + '/dev/user?userid=einvoiceportal@gmail.com',
    //           url: this._baseUrltest + '/users',

    //           header: {
    //               Authorization: 'Bearer' + this._accessToken

    //           },
    //           success: function (aUsers) {
    //               debugger
    //               var oModel = this.getDataModel(),
    //               // oModel.setProperty("/navdata",aUser.body.tab_access);
    //               oData = {};
    //               aUsers.map(function(oUser){
    //                 oData[oUser.id] = oUser;
    //               })

    //               oModel.setProperty("/users",oData);

    //           }.bind(this)
    //       })

    //     },

    // readUser: function () {
    //   jQuery.get({
    //     url: this._baseUrl + "/dev/dropdown?drop_key=master",
    //     header: {
    //       Authorization: "Bearer" + this._accessToken,
    //     },
    //     success: function (aUser) {
    //       debugger;
    //       var oModel = this.getDataModel();
    //       oModel.setProperty("/users", aUser.body);
    //     }.bind(this),
    //   });
    // },
    // countryName: function () {
    //   jQuery.get({
    //     url: "https://elipo_backend-agile-crane-rg.cfapps.us10-001.hana.ondemand.com/dev/dropdown?drop_key=country",
    //     header: {
    //       Authorization: "Bearer" + this._accessToken,
    //     },
    //     success: function (country) {
    //       debugger;
    //       var oModel = this.getDataModel();
    //       oModel.setProperty("/country", country.body);
    //     }.bind(this),
    //   });
    // },

    // deleteUser: function (sUserId) {},

    // master_table: function () {
    //   var masterapi = "/dev/master?master_id=1";
    //   alert("uiij");
    //   fetch(masterapi)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       debugger;
    //       var dataModel = new sap.ui.model.json.JSONModel();
    //       var alldata = res.body;
    //       dataModel.setData(res.body);
    //       this.getView().setModel(dataModel, "oJSONModel");
    //       this.osf = this.getView().byId("searchfield");
    //     });
    //     jQuery.get({
    //         url: this._baseUrl + "/dev/master?master_id=1",
    //         header: {
    //           Authorization: "Bearer" + this._accessToken,
    //         },
    //         success: function (aUser) {
    //           debugger;
    //           var oModel = this.getDataModel();
    //           oModel.setProperty("/oJSONModel", aUser.body);
    //         }.bind(this),
    //       });

    // },

  readUsernew: function () { debugger
    
      jQuery.get({
        // url: _baseUrl +"/invoiceHeaderDetails?createdby=SLPAPPROVER",
        url: this._baseUrl + "/invoiceHeaderDetails?createdby=SLPAPPROVER",
        header: {
          Authorization: "Bearer" + this._accessToken,
        },
        success: function (aUser) {
          var oModel = this.getDataModel();
          oModel.setProperty("/users", aUser.data);
        }.bind(this),
      });
    },
    readsingleUser: function (sUserId) {
      debugger

      jQuery.get({
        url: this._baseUrl + "/invoiceDetails?invoicenumber=" + sUserId,
        header: {
          Authorization: "Bearer" + this._accessToken,
        },
        success: function (aUser) {
          var oModel = this.getDataModel();
          oModel.setProperty("/newinvoice", aUser);
        }.bind(this),
      });



    },
    updateUser: function (sUserId) {},
    createUser: function (oData) {},
  };
});
