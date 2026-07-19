precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uProgress;

varying vec2 vUv;

/* -----------------------------
   Noise utilities
----------------------------- */

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
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
  float value     = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    value     += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

/* -----------------------------
   Domain-warped FBM for fluid
   ink-in-water distortion
----------------------------- */

float warpedFbm(vec2 st) {
  vec2 q = vec2(
    fbm(st + vec2(0.0, 0.0)),
    fbm(st + vec2(5.2, 1.3))
  );
  vec2 r = vec2(
    fbm(st + 4.0 * q + vec2(1.7, 9.2)),
    fbm(st + 4.0 * q + vec2(8.3, 2.8))
  );
  return fbm(st + 4.0 * r);
}

/* -----------------------------
   Main
----------------------------- */

void main() {
  vec4 tex1 = texture2D(uTexture,  vUv);
  vec4 tex2 = texture2D(uTexture2, vUv);

  /* --------------------------------------------------
     DIAGONAL LIQUID-CHROME WIPE
     
     Sweep front travels top-left → bottom-right.
     Domain-warped FBM creates a fluid ink-in-water
     look, replacing the centre-burn radial effect.
  -------------------------------------------------- */

  // Diagonal base: dot with normalised (1,1) → range [0, 1]
  float diagonal = dot(vUv, vec2(0.707, 0.707)) * 0.707;

  // Large-scale fluid warp
  float warp   = warpedFbm(vUv * 3.5);
  // Fine surface grain
  float detail = fbm(vUv * 12.0) * 0.5;

  // Combined wipe field
  float wipeField = diagonal
                  + (warp   - 0.5) * 0.22
                  + (detail - 0.5) * 0.06;

  /* --------------------------------------------------
     Soft transition mask
  -------------------------------------------------- */

  float softness       = 0.10;
  float transitionMask = smoothstep(
    uProgress - softness,
    uProgress + softness,
    wipeField
  );

  /* --------------------------------------------------
     Prismatic chromatic-aberration edge
     
     RGB channels are sampled with a slight offset
     along the sweep direction so the edge shimmers
     with split iridescent colour.
  -------------------------------------------------- */

  float edgeDist = abs(wipeField - uProgress);
  float edgeMask = 1.0 - smoothstep(0.0, softness * 1.4, edgeDist);

  // Max aberration offset at the edge (~0.012 UV units)
  float aberration = edgeMask * 0.012;
  vec2  shift      = vec2(0.707, 0.707) * aberration;

  // Split-sample both textures for a shimmer on both sides
  float r1 = texture2D(uTexture,  vUv + shift).r;
  float g1 = texture2D(uTexture,  vUv        ).g;
  float b1 = texture2D(uTexture,  vUv - shift).b;

  float r2 = texture2D(uTexture2, vUv + shift).r;
  float g2 = texture2D(uTexture2, vUv        ).g;
  float b2 = texture2D(uTexture2, vUv - shift).b;

  vec3 splitTex1 = vec3(r1, g1, b1);
  vec3 splitTex2 = vec3(r2, g2, b2);

  vec3 mixedVideo = mix(splitTex1, splitTex2, transitionMask);

  /* --------------------------------------------------
     Three-layer iridescent edge glow
  -------------------------------------------------- */

  float glowStrength =
    smoothstep(0.04, 0.18, uProgress) *
    (1.0 - smoothstep(0.82, 1.0, uProgress));

  float inner = pow(edgeMask, 1.2) * 2.4;
  float mid   = pow(edgeMask, 3.0) * 0.8;
  float outer = pow(edgeMask, 1.8) * 1.2;

  // Electric cyan → violet → hot rose
  vec3 glowColor =
      vec3(0.0,  0.85, 1.0 ) * inner   // cyan core
    + vec3(0.45, 0.0,  0.9 ) * mid     // violet mid
    + vec3(1.0,  0.25, 0.55) * outer;  // rose halo

  glowColor *= glowStrength;

  /* --------------------------------------------------
     Specular flash — sharp bright pulse at the
     leading edge of the sweep
  -------------------------------------------------- */

  float flash      = pow(max(0.0, 1.0 - edgeDist * 22.0), 4.0);
  float flashPulse = glowStrength * flash * 1.6;
  vec3  flashColor = vec3(1.0) * flashPulse;

  /* --------------------------------------------------
     Final composite
  -------------------------------------------------- */

  vec3 finalColor = mixedVideo + glowColor + flashColor;

  gl_FragColor = vec4(finalColor * 1.1, 1.0);
}

