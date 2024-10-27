import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PieComponent = class PieComponent {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ngOnInit() { }
    volver() {
        this.navCtrl.navigateForward(['/home']);
    }
};
PieComponent = __decorate([
    Component({
        selector: 'app-pie',
        templateUrl: './pie.component.html',
        styleUrls: ['./pie.component.scss'],
    })
], PieComponent);
export { PieComponent };
//# sourceMappingURL=pie.component.js.map