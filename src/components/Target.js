/*
Summary

The Target class creates 3D target objects in the scene using Three.js, positions them randomly within a 
specified spawn range, moves them toward the player, applies rotation for visual effect, respawns them if 
they get too close or behind the player, and checks for collisions with the player.

Purpose
Its purpose is to represent and manage the behavior of each target in the shooting game, including spawning, 
movement, visual effects, and collision detection, allowing the game loop to interact with targets consistently 
based on the current difficulty level.
*/
import * as THREE from 'three';

export class Target {
    constructor(scene, levelConfig) {
        this.levelConfig = levelConfig;
        
        const geometry = new THREE.BoxGeometry(
            levelConfig.targetSize, 
            levelConfig.targetSize, 
            levelConfig.targetSize
        );
        
        const material = new THREE.MeshStandardMaterial({ 
            color: levelConfig.color 
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.respawn(levelConfig);
        scene.add(this.mesh);
    }

    respawn(levelConfig) {
        const range = levelConfig.spawnRange;
        this.mesh.position.set(
            (Math.random() - 0.5) * range.x * 2,
            Math.random() * range.y + 1,
            -Math.random() * range.z - 5
        );
        
        this.speed = levelConfig.targetSpeed;
    }

    update(cameraPosition, levelConfig) {
        // Move toward camera
        const direction = new THREE.Vector3();
        direction.subVectors(cameraPosition, this.mesh.position).normalize();
        this.mesh.position.add(direction.multiplyScalar(this.speed));

        // Rotate for visual effect
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;

        // Respawn if too close to camera or behind camera
        const distance = this.mesh.position.distanceTo(cameraPosition);
        if (distance < 1.0 || this.mesh.position.z > 0) {
            this.respawn(levelConfig);
        }
    }

   checkCollision(cameraPosition) {
    const threshold = this.levelConfig.collisionDistance;
    const distance = this.mesh.position.distanceTo(cameraPosition);
    
    // More detailed debugging
    if (distance < 10) { // Check from further away
        console.log('🚨 COLLISION CHECK:',
            'Distance:', distance.toFixed(2),
            'Threshold:', threshold,
            'Collision?', distance < threshold,
            'Position:', this.mesh.position.x.toFixed(2), this.mesh.position.y.toFixed(2), this.mesh.position.z.toFixed(2),
            'Camera:', cameraPosition.z.toFixed(2)
        );
    }
    
    return distance < threshold;
}
}