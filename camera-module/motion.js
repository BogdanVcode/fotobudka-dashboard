(function(root){
class AxisDemo{
 constructor(){this.position=350;this.velocity=0;this.target=350;this.state='BOOT';this.homed=false;this.enabled=true;this.fault='';this.clock=0;this.phase='';this.maxV=80;this.accel=300;this.settle=0;this.photographs=0;}
 home(){if(this.fault)return false;this.state='HOMING';this.phase='seek';this.target=0;this.homed=false;this.homeTime=0;return true;}
 move(x){if(!this.homed||this.fault||!Number.isFinite(x))return false;this.target=Math.max(20,Math.min(680,x));this.state='MOVING';this.settle=0;return true;}
 stop(reason=''){if(this.state==='ESTOP')return;this.target=this.position+Math.sign(this.velocity)*this.velocity*this.velocity/(2*this.accel);this.target=Math.max(0,Math.min(700,this.target));this.fault=reason||this.fault;this.state=this.fault?'STOPPING':'HOLD';}
 estop(){this.velocity=0;this.target=this.position;this.fault='ESTOP';this.state='ESTOP';this.homed=false;/* Demo freezes: real hardware requires a mechanical catch. */}
 reset(){if(Math.abs(this.velocity)>.01)return false;this.fault='';this.state='BOOT';this.homed=false;return true;}
 photo(){if(this.homed&&!this.fault&&Math.abs(this.velocity)<.01&&this.settle>=.4){this.photographs++;this.state='HOLD_FOR_PHOTO';return true;}return false;}
 tick(dt){dt=Math.max(0,Math.min(dt,.05));this.clock+=dt;if(['BOOT','ESTOP'].includes(this.state))return;
 const delta=this.target-this.position,limit=this.state==='HOMING'?(this.phase==='park'?this.maxV:this.phase==='slow'?3:10):this.maxV;
 const desired=Math.sign(delta)*Math.min(limit,Math.sqrt(2*this.accel*Math.abs(delta)));
 let next=this.velocity+Math.max(-this.accel*dt,Math.min(this.accel*dt,desired-this.velocity));
 let dx=(this.velocity+next)*.5*dt;
 if(Math.abs(delta)<.05&&Math.abs(next)<this.accel*dt+1||Math.abs(dx)>=Math.abs(delta)&&dx*delta>=0){this.position=this.target;next=0;}else this.position+=dx;
 this.velocity=next;this.position=Math.max(0,Math.min(700,this.position));
 if(Math.abs(next)<.01){this.settle+=dt;if(this.state==='HOMING'){if(this.phase==='seek'){this.phase='backoff';this.target=15;}else if(this.phase==='backoff'){this.phase='slow';this.target=0;}else if(this.phase==='slow'){this.homed=true;this.phase='park';this.target=350;}else{this.state='READY';}}else if(this.state==='MOVING')this.state='HOLD';else if(this.state==='STOPPING')this.state='ERROR';}else this.settle=0;
 if(this.state==='HOMING'&&(this.homeTime=(this.homeTime||0)+dt)>90){this.stop('HOME_TIMEOUT');this.homed=false;}
 }
}
root.AxisDemo=AxisDemo;
})(typeof window==='undefined'?globalThis:window);
