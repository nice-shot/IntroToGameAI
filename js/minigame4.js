!function(t){function e(e){for(var i,s,n=e[0],l=e[1],h=e[2],c=0,u=[];c<n.length;c++)s=n[c],r[s]&&u.push(r[s][0]),r[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);for(p&&p(e);u.length;)u.shift()();return o.push.apply(o,h||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],i=!0,n=1;n<a.length;n++){var l=a[n];0!==r[l]&&(i=!1)}i&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var i={},r={4:0},o=[];function s(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=i,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var n=window.webpackJsonp=window.webpackJsonp||[],l=n.push.bind(n);n.push=e,n=n.slice();for(var h=0;h<n.length;h++)e(n[h]);var p=l;o.push([1088,0]),a()}({1088:function(t,e,a){"use strict";a.r(e);var i=a(55),r=a(24),o=a.n(r),s=a(130),n=a.n(s),l=a(98),h=a(441),p=a.n(h),c=a(131),u=a.n(c),f=a(132);class d{static preload(t){t.load.atlas(d.name,u.a,f)}static createAnimations(t){const e=t.anims,a=d.name,i=["left","right","front","back"];for(let t of i){const i=`${a.toLowerCase()}_${t}_walk`;e.create({key:i,frames:e.generateFrameNames(a,{prefix:i+".",start:0,end:3,zeroPad:3}),frameRate:10,repeat:-1})}}constructor(t,e,a){const i=d.name;this.sprite=t.physics.add.sprite(e,a,i,i.toLowerCase()+"_front").setSize(16,16).setOffset(0,15).setCollideWorldBounds(!0),this.moveTo=new o.a.Math.Vector2(e,a),this.waitingForPath=!1,this.path=[]}setMoveTo(t){this.moveTo=t.clone()}setPath(t){this.waitingForPath=!1,this.path=t,this.path.reverse(),this.setMoveTo(this.path.pop())}checkPath(){const{x:t,y:e}=this.sprite,a=o.a.Math.Fuzzy.Equal;return!(!a(this.moveTo.x,t,1)||!a(this.moveTo.y,e,1))&&(this.path&&this.path.length>0?(this.setMoveTo(this.path.pop()),!1):(this.sprite.anims.stop(),!0))}update(t){if(this.sprite.setVelocity(0),this.checkPath())return;t.physics.moveTo(this.sprite,this.moveTo.x,this.moveTo.y,100);const e=d.name.toLowerCase(),a=this.sprite.body.angle*(180/Math.PI);a>=45&&a<=135?this.sprite.anims.play(e+"_front_walk",!0):a<=-45&&a>=-135?this.sprite.anims.play(e+"_back_walk",!0):a<45&&a>-45?this.sprite.anims.play(e+"_right_walk",!0):this.sprite.anims.play(e+"_left_walk",!0)}}var m=d;let y,v;var w=class extends o.a.Scene{constructor(){super("StupidNavigation")}preload(){this.load.image("tileset",n.a),this.load.tilemapTiledJSON("map",l),m.preload(this)}create(){const t=this.make.tilemap({key:"map"}),e=t.addTilesetImage("Castle","tileset"),a=(t.createStaticLayer("Floor",e,0,0),t.createStaticLayer("WallsWithAbove",e,0,0).setCollisionBetween(1,999)),i=(t.createStaticLayer("Above",e,0,0).setDepth(30),[]);for(let e=0;e<t.height;e++){i.push([]);for(let r=0;r<t.width;r++)i[e].push(a.hasTileAt(r,e))}(v=new p.a.js).setGrid(i),v.setAcceptableTiles([!1]),m.createAnimations(this),y=new m(this,24,178),this.input.on("pointerdown",t=>{const e=a.worldToTileXY(y.sprite.x,y.sprite.y),i=a.worldToTileXY(t.position.x,t.position.y);v.findPath(e.x,e.y,i.x,i.y,t=>{y.setPath(t.map(t=>{const e=a.tileToWorldXY(t.x,t.y);return e.x+=8,e.y+=8,e}))}),y.waitingForPath=!0})}update(t,e){y.waitingForPath&&v.calculate(),y.update(this)}};Object(i.a)({scene:[w],width:240,height:240,zoom:2})}});
//# sourceMappingURL=minigame4.js.map