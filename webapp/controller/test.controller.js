

    sap.ui.define([
      "sap/ui/core/mvc/Controller",
      "sap/m/MessageBox"
    ], function (Controller, MessageBox) {
      "use strict";
    
      return Controller.extend("project.goods.controller.test", {
        onInit: function () {
          // Initialize your controller here
        },
    
        onUploadPress: function () {
          var that = this;
          var fileUploader = new sap.ui.unified.FileUploader({
            uploadUrl: "https://cgi-lib.berkeley.edu/ex/fup.cgi",
            uploadComplete: function (oEvent) {
              if (oEvent.getParameter("status") === 200) {
                MessageBox.success("File uploaded successfully.");
              } else {
                MessageBox.error("File upload failed.");
              }
            }
          });
    
          var dialog = new sap.m.Dialog({
            title: "Upload XML File",
            content: [fileUploader],
            beginButton: new sap.m.Button({
              text: "Upload",
              press: function () {
                var file = fileUploader.oFileUpload.files[0];
                
                if (file) {
                  var formData = new FormData();
                  formData.append("upfile", file);
    
                  jQuery.ajax({
                    url: "https://cgi-lib.berkeley.edu/ex/fup.cgi",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                      MessageBox.success("File uploaded successfully.");
                      dialog.close();
                    },
                    error: function (xhr, status, error) {
                      MessageBox.error("File upload failed: " + error);
                    }
                  });
                } else {
                  MessageBox.error("Please select a file to upload.");
                }
              }
            }),
            endButton: new sap.m.Button({
              text: "Cancel",
              press: function () {
                dialog.close();
              }
            }),
            afterClose: function () {
              dialog.destroy();
            }
          });
    
          dialog.open();
        }
      });
    });
  