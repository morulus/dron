import getRandomInt from './getRandomInt';
import _ from 'underscore';

function cos(ra) {
	if ( (ra == 270) || (ra == 90) ) return 0;
	else return Math.cos(this.de_ra(ra));
}

function ra_de(radian) {
	var y = (radian * 180) / Math.PI;
	while (y>360) y=y-360;
	return y;
}

function de_ra(de) {
	var pi = Math.PI;
	var de_ra = (de*(pi/180));
	return de_ra;
}

function sin(ra) {
	if ( (ra == 0) || (ra == 180) || (ra == 360) ) return 0;
	else return Math.sin(de_ra(ra));
}

function delta2sc(a, b, $C) {
	var c = Math.sqrt(
		Math.pow(a,2) + Math.pow(b, 2) - (2 * a * b * cos($C))
	);

	var $A = ra_de(Math.acos((b*b + c*c - a*a)/(2*b*c)));

	var $B = 180-$A-$C;

	var result = {
		a: a,
		b: b,
		c: c,
		'$A': $A,
		'$B': $B,
		'$C': $C
	};

	return result;
}

function delta2c1s(a, $C, $A) {
	var $B = 180-($C+$A);
	var c = a * (sin($C) / sin($A));
	var b = a * (sin($B) / sin($A));
	return {
		a: a,
		b: b,
		c: c,
		'$A': $A,
		'$B': $B,
		'$C': $C
	};
}

function getDistance(x1,y1,x2,y2) {
  return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

function limitMax(n, max) {
  return Math.abs(n)>max ? max*(n/Math.abs(n)) : n;
}

export default function followUserMouse(element, pupilElement) {

  var transform = _.debounce((X, Y) => {
    element.style.transform = "perspective(750px) scale(1) rotateX("+X+"deg) rotateY("+Y+"deg) translateZ(130px)";
    // markElement.style.transform = "perspective(750px) scale(1) rotateX("+(X+50)+"deg) rotateY("+(Y)+"deg) translateZ(130px)";
  }, 300);

  var area = {
    width:document.body.clientWidth,
    height:document.body.clientHeight,
    X: 0,
    Y: 0,
    lastCoords: [0,0],
    lostMouse: false,
    followMouse: true
  };
  window.addEventListener('resize', function() {
    area.width=document.body.clientWidth;
    area.height=document.body.clientHeight;
  });

  document.body.addEventListener('mousemove', function(e) {
    if (!area.followMouse) return;
    let distance = getDistance(area.lastCoords[0], area.lastCoords[1], e.clientX, e.clientY),
    a = (area.width/2)-e.clientX,
    b1 = e.clientY-150,
    {$B} = delta2sc(a, b1, 90),
    pWidthShift = a/(area.width/2),
    pHeightShifta = Math.abs(b1/(area.height/2)),
    pWidthShifta = Math.abs(pWidthShift),
    {c, b} = delta2c1s(50, $B, 90);

    if (pWidthShifta<0.3&&pHeightShifta<0.4) {
      area.Y = 0;
      area.X = 0;
    } else {
      area.Y = (Math.round(b)*-1)*(pWidthShift/pWidthShifta);
      area.X = (Math.round(c)*-1);
    }
    area.lastCoords = [e.clientX, e.clientY];

    if (distance>300) {
      area.followMouse = false;
      area.lostMouse=setTimeout(function() {
        area.lostMouse=false;
      }, 1000);
    }

    if (!area.lostMouse) {
      area.lastX = area.X;
      area.lastY = area.Y;
      transform((area.X+(Math.random()*10)-5), (area.Y+(Math.random()*10)-5));
      pupilElement.style.transform = 'scale('+(1.5*(1-pWidthShifta))+')';
    } else {
      transform((area.lastX), (area.lastY));
      pupilElement.style.transform = 'scale(1)';
    }

  });

  /**
   * Randomize behavior
   */
  setInterval(function() {
    if (getRandomInt(0, 9)>3) {
      area.followMouse=true;
    } else {
      area.followMouse=false;
      let rX = limitMax(area.lastX+getRandomInt(-25, 25), 50);
      let rY = limitMax(area.lastY+getRandomInt(-25, 25), 50);
      transform(rX, rY);
      pupilElement.style.transform = 'scale('+getRandomInt(0.5, 1.5)+')';
    }
  }, 1000);

	function doRandomize() {

		var rc = colors[getRandomInt(0, colors.length-1)];
		console.log(rc);
		document.body.style.backgroundColor = rc;
		element.style.backgroundColor = rc;
		document.body.style.color = rc;
		document.body.style.fill = rc;
	}

  /**
   * Randomize colors
   */
   var colors = [
     "#1e0fff",
     "#ff0f0f",
     "#c40fff",
     "#ff0fc0",
     "#0f85ff"
   ];
   setInterval(doRandomize, 10000);
	 doRandomize();
}
