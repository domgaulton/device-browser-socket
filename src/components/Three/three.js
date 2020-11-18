import React, { Component } from "react";
import * as THREE from "three";

class Three extends Component {
  componentDidMount() {    
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // for ( var i = 0; i < geometry.faces.length; i ++ ) {
    //     geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
    // }
    // var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    // var cube = new THREE.Mesh( geometry, material );
    var geometry = new THREE.CubeGeometry(2,2,2);
    var cubeMaterials = [ 
        new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
    ]; 
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials); 
    var cube = new THREE.Mesh(geometry, cubeMaterial);
    scene.add( cube );
    camera.position.z = 5;
    // camera.position.x = this.props.a;
    // camera.position.y = this.props.b;
    // camera.position.z = this.props.c;
    const animate = () => {
      requestAnimationFrame( animate );
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // cube.rotation.z += 0.01;

      cube.rotation.x = (this.props.x / 20);
      cube.rotation.y = (this.props.y / 20);
      cube.rotation.z = (this.props.z / 20);

    // camera.position.x = this.props.a;
    // camera.position.y = this.props.b;
    // camera.position.z = this.props.c;
      renderer.render( scene, camera );
    };
    animate(this.props);
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div />
    )
  }
}

export default Three;
