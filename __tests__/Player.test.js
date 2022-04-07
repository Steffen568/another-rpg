const Potion = require('../lib/Potion')
jest.mock('../lib/Potion')


const Player = require('../lib/Player')
const { test, expect } = require('@jest/globals')

test('creates a player object', ()=> {
    const player = new Player('stef')

    expect(player.name).toBe('stef')
    expect(player.health).toEqual(expect.any(Number))
    expect(player.strength).toEqual(expect.any(Number))
    expect(player.agility).toEqual(expect.any(Number))

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    )
})

test('gets players stats as an object', ()=> {
    const player = new Player('dave')

    expect(player.getStats()).toHaveProperty('potion')
    expect(player.getStats()).toHaveProperty('health')
    expect(player.getStats()).toHaveProperty('strength')
    expect(player.getStats()).toHaveProperty('agility')
})

test('gets inventory from player or returns false', ()=> {
    const player = new Player('dave')

    expect(player.getInventory()).toEqual(expect.any(Array))

    player.inventory = []

    expect(player.getInventory()).toEqual(false)
})

test('get players heath value', ()=> {
    const player = new Player('dave')

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()))
})

test('checks if player is alive or not', ()=> {
    const player = new Player('dave')

    expect(player.isAlive()).toBeTruthy()

    player.health = 0

    expect(player.isAlive()).toBeFalsy()
})

test('subtract from players health', ()=> {
    const player = new Player('dave')
    const oldHealth = player.health

    player.reduceHealth(5)

    expect(player.health).toBe(oldHealth - 5)

    player.reduceHealth(99999)

    expect(player.health).toBe(0)
})

test('get players attack value', ()=> {
    const player = new Player('dave')
    player.strength = 10

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5)
    expect(player.getAttackValue()).toBeLessThanOrEqual(15)
})

test('adds a potion to the inventory', ()=> {
    const player = new Player('dave')
    const oldCount = player.inventory.length

    player.addPotion(new Potion())

    expect(player.inventory.length).toBeGreaterThan(oldCount)
})

test('use a potion from inventory', ()=> {
    const player = new Player('dave')
    player.inventory = [new Potion(), new Potion(), new Potion()]
    const oldCount = player.inventory.length

    player.usePotion(1)

    expect(player.inventory.length).toBeLessThan(oldCount)
})