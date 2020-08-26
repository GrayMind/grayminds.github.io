var TO_RADIANS = Math.PI / 180;

THREE.Vector3.prototype.rotateY = function (t) {
    var cosRY = Math.cos(t * TO_RADIANS);
    var sinRY = Math.sin(t * TO_RADIANS);
    var i = this.z,
        o = this.x;
    this.x = o * cosRY + i * sinRY;
    this.z = o * -sinRY + i * cosRY;
}

THREE.Vector3.prototype.rotateX = function (t) {
    var cosRY = Math.cos(t * TO_RADIANS);
    var sinRY = Math.sin(t * TO_RADIANS);
    var i = this.z,
        o = this.y;
    this.y = o * cosRY + i * sinRY;
    this.z = o * -sinRY + i * cosRY
}

THREE.Vector3.prototype.rotateZ = function (t) {
    var cosRY = Math.cos(t * TO_RADIANS);
    var sinRY = Math.sin(t * TO_RADIANS);
    var i = this.x,
        o = this.y;
    this.y = o * cosRY + i * sinRY;
    this.x = o * -sinRY + i * cosRY
};