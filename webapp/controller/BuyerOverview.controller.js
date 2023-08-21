sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project.goods.controller.BuyerOverview", {


			onInit() {
				var oModel = new sap.ui.model.json.JSONModel({
					name: "pankaj"
				 });
		
				 this.getView().setModel(oModel, "osmodel");
			  
			
		}

	});
});