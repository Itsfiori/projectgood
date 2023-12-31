/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project/goods/model/models",
        "project/goods/model/DataRepository"

    ],
    function (UIComponent, Device, models,DataRepository) {
        "use strict";

        return UIComponent.extend("project.goods.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
this.DataRepository = new DataRepository(this);
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);