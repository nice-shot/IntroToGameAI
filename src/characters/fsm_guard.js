import Phaser from 'phaser'
import StateMachine from 'javascript-state-machine'

import Character from '../character'

let patrolRoute, patrolTarget

class FSMGuard extends Character {
    constructor(name) {
        super(name)
        this.fsm = new StateMachine({
            init: 'patrol',
            transitions: [
                { name: 'notice', from: 'patrol', to: 'inspect' },
                { name: 'found', from: ['patrol', 'inspect'], to: 'alarm' },
                { name: 'notFound', from: 'inspect', to: 'patrol' },
            ],
            // TODO: Maybe add observer methods...
        })
    }

    createPatrolRoute(route) {
        patrolRoute = route
        patrolTarget = patrolRoute.shift()
    }

    update(scene, time, delta) {
        if (this.fsm.is('patrol')) {
            const speed = 50
            const Equal = Phaser.Math.Fuzzy.Equal

            if (Equal(this.sprite.x, patrolTarget.x, 1)
                && Equal(this.sprite.y, patrolTarget.y, 1)) {
                patrolRoute.push(patrolTarget)
                patrolTarget = patrolRoute.shift()
            }
            scene.physics.moveTo(
                this.sprite,
                patrolTarget.x,
                patrolTarget.y,
                speed
            )
        }
        super.update(scene, time, delta)
    }
}

export default FSMGuard