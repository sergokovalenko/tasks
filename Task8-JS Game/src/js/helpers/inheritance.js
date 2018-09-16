export default function inherit(child, parent) {
  const F = function f() {};
  const Child = child;
  F.prototype = parent.prototype;
  Child.prototype = new F();
}
