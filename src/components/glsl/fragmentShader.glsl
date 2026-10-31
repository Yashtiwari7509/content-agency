precision highp float;

uniform sampler2D uTexture;   /* next video    – fully visible at uProgress = 1 */
uniform sampler2D uTexture2;  /* current video – fully visible at uProgress = 0 */
uniform float     uProgress;

varying vec2 vUv;

void main() {
  vec4 current = texture2D(uTexture2, vUv);
  vec4 next    = texture2D(uTexture,  vUv);
  gl_FragColor = mix(current, next, uProgress);
}
