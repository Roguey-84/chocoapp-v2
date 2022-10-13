sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, UIComponent) {
        "use strict";

        return Controller.extend("chocoapp.controller.Overview", {
            onInit: function () {
                var oProductsModel = this.getOwnerComponent().getModel('product').getProperty('/продукция');
                var iCountAll = oProductsModel.length;
                var oPriceCalculations = this._getPriceCalculations(oProductsModel);

                var oViewModel = new JSONModel({
                    currency: 'RUB',
                    products: oProductsModel,
                    countAll: iCountAll,
                    priceSum: oPriceCalculations.iSum,
                    priceAverage: oPriceCalculations.iAverage
                });

                this.getView().setModel(oViewModel, 'view');
            },

            _getPriceCalculations: function (products) {
                var iCount= 0;
                var iSum = 0;
                var iAverage = 0;

                for(var i = 0; i < products.length; i++) {
                    if (products[i] !== NaN) {
                        iSum += products[i]['цена'];
                        iCount++;
                    }
                }
                iAverage = (iSum / iCount).toFixed(1);
                return {iSum, iAverage}
            },

            onPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var oRouter = UIComponent.getRouterFor(this);
                console.log(oItem.getBindingContext('view').getPath().slice(-1));
                oRouter.navTo(
                    'Detail',
                    {
                        productPath: oItem.getBindingContext('view').getPath().slice(-1)
                    }, false
                )
            }
        });
    });
