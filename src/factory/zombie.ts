import { MoveTransformComponent } from '../components/moveTransport'
import { ZombieComponent } from '../components/zombie'
const { Transform, OnPointerDown, GLTFShape, BoxShape } = engine.baseComponents

export function createZombie(xPos: number): Entity {
  const zombie = engine.addEntity()

  ZombieComponent.create(zombie)

  Transform.create(zombie, {
    position: { x: xPos, y: 1, z: 3 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  const zombieGltf = true

  if (zombieGltf) {
    GLTFShape.create(zombie, {
      withCollisions: true,
      isPointerBlocker: true,
      visible: true,
      src: 'models/zombie.glb'
    })
  } else {
    BoxShape.create(zombie, {
      withCollisions: true,
      isPointerBlocker: true,
      visible: true,
      uvs: []
    })
  }

  MoveTransformComponent.create(zombie, {
    start: { x: xPos, y: 1, z: 3 },
    end: { x: xPos, y: 1, z: 12 },
    duration: 6,
    normalizedTime: 0,
    lerpTime: 0,
    speed: 0.04,
    interpolationType: 1
  })

  engine.baseComponents.Animator.create(zombie, {
    states: [
      {
        clip: 'Walking',
        loop: true,
        name: 'Walk',
        playing: true,
        shouldReset: false,
        speed: 1,
        weight: 1
      },
      {
        clip: 'Attacking',
        loop: true,
        name: 'Attack',
        playing: false,
        shouldReset: false,
        speed: 1,
        weight: 1
      }
    ]
  })

  OnPointerDown.create(zombie, {
    button: 0,
    distance: 100,
    hoverText: 'click',
    showFeedback: true
  })

  return zombie
}
