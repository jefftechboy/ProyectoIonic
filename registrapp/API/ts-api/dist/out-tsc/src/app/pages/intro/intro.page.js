import { __decorate } from "tslib";
import { Component } from '@angular/core';
let IntroPage = class IntroPage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ngOnInit() {
        setTimeout(() => {
            this.navCtrl.navigateForward(['/login']);
        }, 10000);
    }
};
IntroPage = __decorate([
    Component({
        selector: 'app-intro',
        templateUrl: './intro.page.html',
        styleUrls: ['./intro.page.scss'],
    })
], IntroPage);
export { IntroPage };
//# sourceMappingURL=intro.page.js.map