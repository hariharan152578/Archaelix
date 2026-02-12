import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;

#define PI 3.1415926538
const int u_line_count = 48;   // Reduced from 40
const float u_line_width = 10.0;
const float u_line_blur = 9.0;

float pixel(float count, vec2 resolution) {
  return (1.0 / max(resolution.x, resolution.y)) * count;
}

float noise(vec2 p){
  return sin(p.x)*sin(p.y);
}

float lineFn(vec2 st, float width, float perc, float time) {
  float y = 0.5 + (perc - 0.5) * uDistance +
            noise(vec2(time + perc, st.x * 3.0)) * 0.15 * uAmplitude;

  float line_start = smoothstep(y + (width/2.0), y, st.y);
  float line_end = smoothstep(y, y - (width/2.0), st.y);

  return clamp(line_start - line_end, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  float line_strength = 1.0;

  for (int i = 0; i < u_line_count; i++) {
    float p = float(i) / float(u_line_count);
    line_strength *= (1.0 - lineFn(
      uv,
      u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
      p,
      iTime * 0.2
    ));
  }

  float colorVal = 1.0 - line_strength;
  gl_FragColor = vec4(uColor * colorVal, colorVal);
}
`;

const Threads = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0.5,
  ...rest
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 🔥 Reduced DPR for performance
    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5)
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, 1)
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    let frameId;

    const update = (t) => {
      frameId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      {...rest}
    />
  );
};

export default Threads;
