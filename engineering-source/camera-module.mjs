import assert from 'node:assert/strict';
import '../dashboard/camera-module/motion.js';
const a=new globalThis.AxisDemo();
const advance=(seconds)=>{for(let t=0;t<seconds;t+=.01){a.tick(.01);assert.ok(a.position>=0&&a.position<=700,'travel boundary');}};
assert.equal(a.move(500),false);assert.equal(a.photo(),false);
a.position=680;a.home();advance(85);assert.equal(a.state,'READY');assert.equal(a.homed,true);assert.equal(a.position,350);
for(const target of [100,500,200,650,100]){assert.equal(a.move(target),true);assert.equal(a.photo(),false);advance(10);assert.equal(a.position,target);assert.equal(a.photo(),true);}
a.move(1000);advance(10);assert.equal(a.position,680);
a.move(-10);advance(10);assert.equal(a.position,20);
a.move(650);advance(1);a.stop('COMM_TIMEOUT');advance(2);assert.equal(a.state,'ERROR');assert.equal(a.velocity,0);assert.equal(a.move(300),false);assert.equal(a.photo(),false);
a.stop();advance(1);assert.equal(a.move(300),false,'Stop must not clear a fault');
assert.equal(a.reset(),true);assert.equal(a.move(300),false);a.home();advance(85);a.move(650);advance(1);a.estop();const p=a.position;advance(10);assert.equal(a.position,p);assert.equal(a.homed,false);assert.equal(a.photo(),false);
console.log('PASS: HOME, cycle, limits, photo interlock, communication loss, E-STOP, mandatory re-home. Simulation only.');
