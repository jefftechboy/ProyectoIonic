import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { IonCard } from '@ionic/angular';
let NotfoundPage = class NotfoundPage {
    constructor(animationCtrl, navCtrl) {
        this.animationCtrl = animationCtrl;
        this.navCtrl = navCtrl;
    }
    ngOnInit() {
        setTimeout(() => {
            this.navCtrl.navigateForward(['/home']);
        }, 3000);
    }
};
__decorate([
    ViewChild(IonCard, { read: ElementRef })
], NotfoundPage.prototype, "card", void 0);
NotfoundPage = __decorate([
    Component({
        selector: 'app-notfound',
        templateUrl: './notfound.page.html',
        styleUrls: ['./notfound.page.scss'],
    })
], NotfoundPage);
export { NotfoundPage };
//# sourceMappingURL=notfound.page.js.map