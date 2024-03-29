/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @see https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
 * @returns true if the rectangle and circle are colliding
 * @requires - circle and rectangle to have their pivot points from the centre!
 *
 * @param {object} circle - {x:100, y:290, r:10}
 * @param {object} rectangle - {x:100, y:100, w:40, h:100}
 */
function rectCircleColliding(circle, rectangle) {
  const distX = Math.abs(circle.x - rectangle.x)
  const distY = Math.abs(circle.y - rectangle.y)

  if (distX > rectangle.w / 2 + circle.r) {
    return false
  }
  if (distY > rectangle.h / 2 + circle.r) {
    return false
  }

  if (distX <= rectangle.w / 2) {
    return true
  }
  if (distY <= rectangle.h / 2) {
    return true
  }

  const dx = distX - rectangle.w / 2
  const dy = distY - rectangle.h / 2

  return dx * dx + dy * dy <= circle.r * circle.r
}

/**
 * @returns true if the two circles are colliding
 *
 * @param {object} circle1 - {x:100, y:290, r:10}
 * @param {object} circle2 - {x:100, y:290, r:10}
 */
function circleCircleColliding(circle1, circle2) {
  return (
    dist(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.r + circle2.r
  )
}

/**
 * @returns true if the two rectangles are colliding
 *
 * @param {object} rectangle1 - {x:100, y:290, w:10, h: 10}
 * @param {object} rectangle2 - {x:100, y:290, w:10, h: 10}
 */
function rectRectColliding(rectangle1, rectangle2) {
  const findCornerRadiusOfRectangle = (width, height) =>
    Math.sqrt((width / 2) ** 2 + (height / 2) ** 2) // to find length of diagonal/2 using pythagoras theorem

  return (
    rectangle1.x + rectangle1.w / 2 > rectangle2.x - rectangle2.w / 2 &&
    rectangle1.x - rectangle1.w / 2 < rectangle2.x + rectangle2.w / 2 &&
    rectangle1.y + rectangle1.h / 2 > rectangle2.y - rectangle2.h / 2 &&
    rectangle1.y - rectangle1.h / 2 < rectangle2.y + rectangle2.h / 2 &&
    dist(rectangle1.x, rectangle1.y, rectangle2.x, rectangle2.y) <=
      findCornerRadiusOfRectangle(rectangle1.w, rectangle1.h) +
        findCornerRadiusOfRectangle(rectangle2.w, rectangle2.h) // <- this does not work
  )
}

function collideCircleWithRotatedRectangle(circle, rect) {
  function getDistance(fromX, fromY, toX, toY) {
    const dX = Math.abs(fromX - toX)
    const dY = Math.abs(fromY - toY)

    return Math.sqrt(dX * dX + dY * dY)
  }

  const rectCenterX = rect.x
  const rectCenterY = rect.y

  const rectX = rectCenterX - rect.width / 2
  const rectY = rectCenterY - rect.height / 2

  const rectReferenceX = rectX
  const rectReferenceY = rectY

  // Rotate circle's center point back
  const unrotatedCircleX =
    Math.cos(rect.rotation) * (circle.x - rectCenterX) -
    Math.sin(rect.rotation) * (circle.y - rectCenterY) +
    rectCenterX
  const unrotatedCircleY =
    Math.sin(rect.rotation) * (circle.x - rectCenterX) +
    Math.cos(rect.rotation) * (circle.y - rectCenterY) +
    rectCenterY

  // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
  let closestX
  let closestY

  // Find the unrotated closest x point from center of unrotated circle
  if (unrotatedCircleX < rectReferenceX) {
    closestX = rectReferenceX
  } else if (unrotatedCircleX > rectReferenceX + rect.width) {
    closestX = rectReferenceX + rect.width
  } else {
    closestX = unrotatedCircleX
  }

  // Find the unrotated closest y point from center of unrotated circle
  if (unrotatedCircleY < rectReferenceY) {
    closestY = rectReferenceY
  } else if (unrotatedCircleY > rectReferenceY + rect.height) {
    closestY = rectReferenceY + rect.height
  } else {
    closestY = unrotatedCircleY
  }

  // Determine collision
  let collision = false
  const distance = getDistance(
    unrotatedCircleX,
    unrotatedCircleY,
    closestX,
    closestY
  )

  if (distance < circle.radius) {
    collision = true
  } else {
    collision = false
  }

  return collision
}

/* eslint-disable */
/*
Repo: https://github.com/bmoren/p5.collide2D/
Created by http://benmoren.com
Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
Version 0.6 | Nov 28th, 2018
CC BY-NC-SA 4.0
*/
p5.prototype._collideDebug=!1,p5.prototype.collideDebug=function(i){_collideDebug=i},p5.prototype.collideRectRect=function(i,t,e,o,r,l,n,c){return i+e>=r&&i<=r+n&&t+o>=l&&t<=l+c},p5.prototype.collideRectCircle=function(i,t,e,o,r,l,n){var c=r,p=l;return r<i?c=i:r>i+e&&(c=i+e),l<t?p=t:l>t+o&&(p=t+o),this.dist(r,l,c,p)<=n/2},p5.prototype.collideCircleCircle=function(i,t,e,o,r,l){return this.dist(i,t,o,r)<=e/2+l/2},p5.prototype.collidePointCircle=function(i,t,e,o,r){return this.dist(i,t,e,o)<=r/2},p5.prototype.collidePointEllipse=function(i,t,e,o,r,l){var n=r/2,c=l/2;if(i>e+n||i<e-n||t>o+c||t<o-c)return!1;var p=i-e,s=t-o,d=c*this.sqrt(this.abs(n*n-p*p))/n;return s<=d&&s>=-d},p5.prototype.collidePointRect=function(i,t,e,o,r,l){return i>=e&&i<=e+r&&t>=o&&t<=o+l},p5.prototype.collidePointLine=function(i,t,e,o,r,l,n){var c=this.dist(i,t,e,o),p=this.dist(i,t,r,l),s=this.dist(e,o,r,l);return void 0===n&&(n=.1),c+p>=s-n&&c+p<=s+n},p5.prototype.collideLineCircle=function(i,t,e,o,r,l,n){var c=this.collidePointCircle(i,t,r,l,n),p=this.collidePointCircle(e,o,r,l,n);if(c||p)return!0;var s=i-e,d=t-o,u=this.sqrt(s*s+d*d),h=((r-i)*(e-i)+(l-t)*(o-t))/this.pow(u,2),y=i+h*(e-i),f=t+h*(o-t);return!!this.collidePointLine(y,f,i,t,e,o)&&(this._collideDebug&&this.ellipse(y,f,10,10),s=y-r,d=f-l,this.sqrt(s*s+d*d)<=n/2)},p5.prototype.collideLineLine=function(i,t,e,o,r,l,n,c,p){var s=((n-r)*(t-l)-(c-l)*(i-r))/((c-l)*(e-i)-(n-r)*(o-t)),d=((e-i)*(t-l)-(o-t)*(i-r))/((c-l)*(e-i)-(n-r)*(o-t));if(s>=0&&s<=1&&d>=0&&d<=1){if(this._collideDebug||p)var u=i+s*(e-i),h=t+s*(o-t);return this._collideDebug&&this.ellipse(u,h,10,10),!p||{x:u,y:h}}return!!p&&{x:!1,y:!1}},p5.prototype.collideLineRect=function(i,t,e,o,r,l,n,c,p){var s,d,u,h,y;return p?(s=this.collideLineLine(i,t,e,o,r,l,r,l+c,!0),d=this.collideLineLine(i,t,e,o,r+n,l,r+n,l+c,!0),u=this.collideLineLine(i,t,e,o,r,l,r+n,l,!0),h=this.collideLineLine(i,t,e,o,r,l+c,r+n,l+c,!0),y={left:s,right:d,top:u,bottom:h}):(s=this.collideLineLine(i,t,e,o,r,l,r,l+c),d=this.collideLineLine(i,t,e,o,r+n,l,r+n,l+c),u=this.collideLineLine(i,t,e,o,r,l,r+n,l),h=this.collideLineLine(i,t,e,o,r,l+c,r+n,l+c)),!!(s||d||u||h)&&(!p||y)},p5.prototype.collidePointPoly=function(i,t,e){for(var o=!1,r=0,l=0;l<e.length;l++){r=l+1,r==e.length&&(r=0);var n=e[l],c=e[r];(n.y>t&&c.y<t||n.y<t&&c.y>t)&&i<(c.x-n.x)*(t-n.y)/(c.y-n.y)+n.x&&(o=!o)}return o},p5.prototype.collideCirclePoly=function(i,t,e,o,r){void 0==r&&(r=!1);for(var l=0,n=0;n<o.length;n++){l=n+1,l==o.length&&(l=0);var c=o[n],p=o[l];if(this.collideLineCircle(c.x,c.y,p.x,p.y,i,t,e))return!0}if(1==r){if(this.collidePointPoly(i,t,o))return!0}return!1},p5.prototype.collideRectPoly=function(i,t,e,o,r,l){void 0==l&&(l=!1);for(var n=0,c=0;c<r.length;c++){n=c+1,n==r.length&&(n=0);var p=r[c],s=r[n];if(this.collideLineRect(p.x,p.y,s.x,s.y,i,t,e,o))return!0;if(1==l){if(this.collidePointPoly(i,t,r))return!0}}return!1},p5.prototype.collideLinePoly=function(i,t,e,o,r){for(var l=0,n=0;n<r.length;n++){l=n+1,l==r.length&&(l=0);var c=r[n].x,p=r[n].y,s=r[l].x,d=r[l].y;if(this.collideLineLine(i,t,e,o,c,p,s,d))return!0}return!1},p5.prototype.collidePolyPoly=function(i,t,e){void 0==e&&(e=!1);for(var o=0,r=0;r<i.length;r++){o=r+1,o==i.length&&(o=0);var l=i[r],n=i[o],c=this.collideLinePoly(l.x,l.y,n.x,n.y,t);if(c)return!0;if(1==e&&(c=this.collidePointPoly(t[0].x,t[0].y,i)))return!0}return!1},p5.prototype.collidePointTriangle=function(i,t,e,o,r,l,n,c){var p=this.abs((r-e)*(c-o)-(n-e)*(l-o));return this.abs((e-i)*(l-t)-(r-i)*(o-t))+this.abs((r-i)*(c-t)-(n-i)*(l-t))+this.abs((n-i)*(o-t)-(e-i)*(c-t))==p},p5.prototype.collidePointPoint=function(i,t,e,o,r){return void 0==r&&(r=0),this.dist(i,t,e,o)<=r},p5.prototype.collidePointArc=function(i,t,e,o,r,l,n,c){void 0==c&&(c=0);var p=this.createVector(i,t),s=this.createVector(e,o),d=this.createVector(r,0).rotate(l),u=p.copy().sub(s);if(p.dist(s)<=r+c){var h=d.dot(u),y=d.angleBetween(u);if(h>0&&y<=n/2&&y>=-n/2)return!0}return!1};
