import { MoveTransformComponent } from "./components/moveTransport"


const BirdData = MapType({
	waitingTime: Float32
})

export const isBird = engine.defineComponent(3333, BirdData )


export function createHummingBird(){


	const bird = engine.addEntity()
	engine.baseComponents.Transform.create(bird, {
		position: {x:13, y:3.5, z:5},
		rotation: {x:0, y:0, z:0, w: 1},
		scale:  {x:0.2, y:0.2, z:0.2}
	})
	engine.baseComponents.GLTFShape.create(bird, {
		src:'models/hummingbird.glb',
		isPointerBlocker: true,
		visible: true,
		withCollisions: true
	})
	engine.baseComponents.Animator.create(bird, {
		states:[
			{
				clip: "fly",
				loop: true,
				playing: true,
				shouldReset: false,
				speed: 2,
				weight: 1,
				name: "fly" 
			},
			{
				clip: "look",
				loop: false,
				playing: false,
				shouldReset: false,
				speed: 1,
				weight: 1,
				name: "look" 
			},
			{
				clip: "shake",
				loop: false,
				playing: false,
				shouldReset: false,
				speed: 1,
				weight: 1,
				name: "shake" 
			}
		]
	})

	isBird.create(bird, {
		waitingTime:0
	})
}

export function birdSystem(dt: number){


	for (const [bird, birdData] of engine.mutableGroupOf(isBird)) {
	
		if( MoveTransformComponent.has(bird)) return
		
			birdData.waitingTime -=dt
			if(birdData.waitingTime<= 0){

				let currentPos =  engine.baseComponents.Transform.getFrom(bird).position
			

				birdData.waitingTime = 2

				// next target
				const nextPos = {
					x:Math.random() * 12 + 2,
					y: Math.random() * 3 + 1,
					z: Math.random() * 12 + 2
				}

				dcl.log("New pos", nextPos)

				MoveTransformComponent.create(bird, {
					hasFinished: false,
					duration: 2,
					start:currentPos,
					end: nextPos,
					normalizedTime: 0,
					lerpTime: 0,
					speed: 1,
					interpolationType: 0
				
				})

				const mutableTransform = engine.baseComponents.Transform.mutable(bird)

				
				Vector3.Up()

		

				//mutableTransform.rotation = Quaternion.ro
				
				//Quaternion.lookRotation( mutableTransform.position, nextPos)
			}
	  }
}

engine.addSystem(birdSystem)