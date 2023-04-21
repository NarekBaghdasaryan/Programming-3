let LivingCreature = require("./LivingCreature")

module.exports  =  class Doctor extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 16
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
 

}

