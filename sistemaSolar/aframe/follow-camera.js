AFRAME.registerComponent('follow-camera', {
    tick: function () {
      const camera = document.querySelector('#camera');
      const cube = this.el;
  
      // Obter a posição da câmera
      const cameraPosition = camera.object3D.position.clone();
      const cameraDirection = new THREE.Vector3();
      camera.object3D.getWorldDirection(cameraDirection);
  
      // Calcular uma posição à direita da câmera
      const offsetRight = new THREE.Vector3().crossVectors(cameraDirection, camera.object3D.up).normalize();
      offsetRight.multiplyScalar(0); // Ajuste o valor () para o quanto deseja mover o cubo para a direita
  
      // Aplicar o deslocamento à direita e para trás
      cameraPosition.add(cameraDirection.multiplyScalar(-0.25)).add(offsetRight); // Ajuste a distância com ()
  
      // Definir a posição do cubo
      cube.object3D.position.copy(cameraPosition);
    }
  });