import { getSettings } from "./storage";

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, duration: number, type: OscillatorType = "sine", gain = 0.15) {
  if (getSettings().sfxMuted) return;
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  o.start(now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  o.stop(now + duration);
}

export function playSuccess() {
  tone(660, 0.12, "triangle", 0.18);
  setTimeout(() => tone(880, 0.18, "triangle", 0.18), 90);
  setTimeout(() => tone(1320, 0.22, "triangle", 0.18), 200);
}

export function playError() {
  // soft horn
  tone(180, 0.35, "sawtooth", 0.12);
}

export function playClick() {
  tone(540, 0.05, "square", 0.06);
}