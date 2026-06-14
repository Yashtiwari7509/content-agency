precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uProgress;

varying vec2 vUv;

/* -----------------------------
   Noise utilities
----------------------------- */

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  float value = 0.;
  float amplitude = .5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

/* -----------------------------
   Main
----------------------------- */

void main() {
  vec4 tex1 = texture2D(uTexture, vUv);
  vec4 tex2 = texture2D(uTexture2, vUv);

  /* -----------------------------
     Vertical paper burn mask
  ----------------------------- */

  // Top → bottom wipe
  float verticalMask = length(vUv - 0.5);
  // float verticalMask = 1. - vUv.x;
  // float verticalMask = vUv.x ;

  // Static organic burn noise (no flicker)
  float burnNoise = fbm(vUv * 250.0);
  // float burnNoise = noise(vUv * 1.0);

  // Distorted burn edge
  float burnEdge = verticalMask + (burnNoise - .5);

  

  // Final transition
  float transitionMask = smoothstep(
    uProgress - 0.08,
    uProgress + 0.08,
    burnEdge
  );

  /* -----------------------------
     Edge detection for glow
  ----------------------------- */

//   float edge = smoothstep(0.48, 0.52, transitionMask);
//   float edgeMask = edge * (1.0 - edge);

    // Distance from burn front
    float edgeDist = abs(burnEdge - uProgress);

    // Pixel-aware edge width
    float edgeWidth = fwidth(burnEdge) ;

    // Proper edge mask
    float edgeMask = 1.0 - smoothstep(0.0, 1.-edgeWidth, edgeDist * 8.);


  /* -----------------------------
     Glow (only mid transition)
  ----------------------------- */

    float glowStrength =
    smoothstep(0.05, 0.2, uProgress) *
    (1.0 - smoothstep(0.8, 1.0, uProgress));

    float innerGlow = pow(edgeMask, 1.) * 2.0;
    float midGlow   = pow(edgeMask, 3.0) * .5;
    float outerGlow = pow(edgeMask, 2.0) * 1.0;

    vec3 glowColor =
        vec3(0.0, 0.48, 1.0) * innerGlow +
        vec3(.0, 0.0, 0.08) * midGlow +
        vec3(1., 0.5, .8) * outerGlow;

    glowColor *= glowStrength;


  /* -----------------------------
     Final color
  ----------------------------- */

  // vec3 mixedVideo = mix(vec3(.0),vec3(0.), transitionMask);
  vec3 mixedVideo = mix(tex1.rgb, tex2.rgb, transitionMask);

  vec3 finalColor = mixedVideo + glowColor ;

  float band =
    smoothstep(uProgress - 0.05, uProgress, burnEdge) -
    smoothstep(uProgress, uProgress + 0.05, burnEdge);

    // float cloud = burnEdge;


  gl_FragColor = vec4(finalColor * 1.2, 1.0);
  // gl_FragColor = vec4(vec3(burnEdge), 1.0);
  // gl_FragColor = vec4(vec3(verticalMask + burnNoise - .9), 1.0);

// float cloud = fbm(vUv * 50.0);

// cloud = smoothstep(0.3, 0.7, cloud);

// gl_FragColor = vec4(vec3(1.0), cloud);



}
