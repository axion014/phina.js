th.describe("display.Shape", function() {

  th.it('Shape', function() {
    var shape = phina.display.Shape().addChildTo(this);
    shape.position.set(100, 100);
  });

  th.it('CircleShape', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.position.set(this.gridX.center(), this.gridY.center());

    setTimeout(function() {
      shape.radius = 200;
      shape.stroke = false;
    }, 2000);
  });

  th.it('RectangleShape', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    shape.position.set(this.gridX.center(), this.gridY.span(4));

    var shape = phina.display.RectangleShape({
      width: 128,
      height: 32,
      fill: 'green',
      stroke: false,
      cornerRadius: 8,
    }).addChildTo(this);
    shape.position.set(this.gridX.center(), this.gridY.span(6));
  });

  th.it('TriangleShape', function() {
    var shape = phina.display.TriangleShape().addChildTo(this);
    shape.position.set(this.gridX.center(), this.gridY.span(4));
  });
});




th.describe("display.Sprite", function() {

  th.it('Sample', function() {
    var path = '../../assets/images/hiyocos.png';
    phina.asset.Texture().load(path).then(function(tex) {
      var that = this;

      var addHiyoko = function(x, y) {
        var sprite = phina.display.Sprite(tex, 32, 32).addChildTo(that);
        sprite.setFrameIndex(0);
        sprite.position.set(x, y);
        sprite.setScale(2);
        sprite.vx = 5;
        sprite.vy = 5;
        sprite.vr = ~~(Math.random()*10)-5;
        sprite.on('enterframe', function(e) {
            if (e.app.ticker.frame % 3 == 0) this.frameIndex = (this.frameIndex+1)%4;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > 640) this.vx *= -1;
            if (this.y < 0 || this.y > 960) this.vy *= -1;
            this.rotation += this.vr;
        });
      }

      for (var i = 0; i < 20; i++) {
        var x = ~~(Math.random()*600)+20;
        var y = ~~(Math.random()*900)+30;
        addHiyoko(x, y);
      }
    }.bind(this));
  });

});




th.describe("display.Label", function() {

  th.it('init', function() {
    var label = phina.display.Label('text only').addChildTo(this);
    label.position.set(this.gridX.center(), this.gridY.span(6));
    var label = phina.display.Label({
      text: 'object only',
      fill: 'blue',
      shadow: 'red',
      shadowBlur: 4,
    }).addChildTo(this);
    label.position.set(this.gridX.center(), this.gridY.span(10));
  });

  th.it('style', function() {
    var center = 640/2;
    var gridY = phina.util.Grid(960, 14);
    // 
    var label = phina.display.Label('fill="red"').addChildTo(this);
    label.fill = 'red';
    label.position.set(center, gridY.span(1));
    // 
    var label = phina.display.Label('stroke="blue"').addChildTo(this);
    label.stroke = 'blue';
    label.position.set(center, gridY.span(2));
    // 
    var label = phina.display.Label('strokeWidth=8').addChildTo(this);
    label.fill = 'white';
    label.strokeWidth = 8;
    label.position.set(center, gridY.span(3));
    // 
    var label = phina.display.Label('fontSize(16)').addChildTo(this);
    label.fontSize = 16;
    label.position.set(center, gridY.span(4));
    // 
    var label = phina.display.Label('fontWeight="bold"').addChildTo(this);
    label.fontWeight = 'bold';
    label.position.set(center, gridY.span(5));
    // 
    var label = phina.display.Label('fontFamily="ゴシック"').addChildTo(this);
    label.fontFamily = 'ゴシック';
    label.position.set(center, gridY.span(6));
    // 
    var label = phina.display.Label('shadow="gold"').addChildTo(this);
    label.fill = 'white';
    label.shadow = 'gold';
    label.position.set(center, gridY.span(7));
    // 
    var label = phina.display.Label('shadowBlur=16').addChildTo(this);
    label.shadow = 'pink';
    label.shadowBlur = 16;
    label.position.set(center, gridY.span(8));
  });

  th.it('align', function() {
    // 
    var label = phina.display.Label('left').addChildTo(this);
    label.align = 'left';
    label.backgroundColor = '#aaa';
    label.position.set(640/2, 150);
    // 
    var label = phina.display.Label('center').addChildTo(this);
    label.align = 'center';
    label.backgroundColor = '#aaa';
    label.position.set(640/2, 250);
    // 
    var label = phina.display.Label('right').addChildTo(this);
    label.align = 'right';
    label.backgroundColor = '#aaa';
    label.position.set(640/2, 350);
  });

  th.it('baseline', function() {
    // 
    var label = phina.display.Label('top').addChildTo(this);
    label.baseline = 'top';
    label.backgroundColor = '#aaa';
    label.position.set(160, 960/2);
    // 
    var label = phina.display.Label('middle').addChildTo(this);
    label.baseline = 'middle';
    label.backgroundColor = '#aaa';
    label.position.set(320, 960/2);
    // 
    var label = phina.display.Label('bottom').addChildTo(this);
    label.baseline = 'bottom';
    label.backgroundColor = '#aaa';
    label.position.set(480, 960/2);
  });

  th.it('lineHeight', function() {
    var text = 'hoge\nfoo\nbar';
    var label = phina.display.Label(text).addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridX.span(8));
    // 
    var label = phina.display.Label(text).addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridX.span(8));

    var text = 'hoge\nfoo\nbar\nbaz';
    var label = phina.display.Label(text).addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridX.span(12));
    // 
    var label = phina.display.Label(text).addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridX.span(12));
  });

});




th.describe("display.Layer", function() {
  th.it('sample', function() {
    var SCREEN_WIDTH = 640;
    var SCREEN_HEIGHT = 960;
    var layer = phina.display.Layer({
      width: 400,
      height: 400,
    }).addChildTo(this);

    layer.x = 320;
    layer.y = 480;
    layer.backgroundColor = 'blue';

    var circle = phina.display.CircleShape({
      radius: 150,
    }).addChildTo(layer);
  });
});




th.describe("display.ThreeLayer", function() {
  th.it('sample', function() {
    var SCREEN_WIDTH = 640;
    var SCREEN_HEIGHT = 960;
    var layer = phina.display.ThreeLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);

    var geometry = new THREE.BoxGeometry( 20, 20, 20 );

    for ( var i = 0; i < 2000; i ++ ) {
      var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;

      layer.scene.add( object );
    }

    var theta = 0;
    var radius = 100;
    layer.update = function() {
      theta += 0.5;

      this.camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
      this.camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
      this.camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
      this.camera.lookAt( this.scene.position );

      this.camera.updateMatrixWorld();
    }
  });

});


