const Potion = require('../lib/Potion')

function Player(name = '') {
    this.name = name

    this.health = Math.floor(Math.random() * 10 + 95)
    this.strength = Math.floor(Math.random() * 5 + 7)
    this.agility = Math.floor(Math.random() * 5 + 7)

    this.inventory = [new Potion('health'), new Potion()]

    // returns object with various player properties
   Player.prototype.getStats = function() {
       return {
           potion: this.inventory.length,
           health: this.health,
           strength: this.strength,
           agility: this.agility
       }
   }

    // returns the inventory array or fasle if empthy
    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory
        }
        return false
    }

    // return player health 
    Player.prototype.getHealth = function() {
        return `${this.name}'s health is n  ow ${this.health}!`
    }

    // checks if player is alive
    Player.prototype.isAlive = function() {
        if (this.health === 0) {
            return false
        }
        return true
    }

    // reduces health
    Player.prototype.reduceHealth = function(health) {
        this.health -= health

        if (this.health < 0) {
            this.health = 0
        }
    }

    // checks player attack
    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5
        const max = this.strength + 5

        return Math.floor(Math.random() * (max - min) + min)
    }

    // adds potion to inventory
    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion)
    }

    // use and keep track of potions in inventory
    Player.prototype.usePotion = function(index) {
        const potion = this.getInventory().splice(index, 1)[0]

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value
                break
            case 'health':
                this.health += potion.value
                break
            case 'strenght':
                this.strength += potion.value
                break
        }
    }
}

module.exports = Player