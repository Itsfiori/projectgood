sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"project/goods/model/DataRepository"
], function(
	Controller,
	DataRepository
) {
	"use strict";

	return Controller.extend("project.goods.controller.overview", {
        onInit: function () {

			var DataRepository= this.getOwnerComponent().DataRepository;
			DataRepository.readUsernew();

        }
	});
});