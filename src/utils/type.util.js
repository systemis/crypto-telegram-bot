"use strict";
exports.__esModule = true;
exports.autoImplement = void 0;
function autoImplement(defaults) {
    return /** @class */ (function () {
        function class_1() {
            Object.assign(this, defaults || {});
        }
        return class_1;
    }());
}
exports.autoImplement = autoImplement;
