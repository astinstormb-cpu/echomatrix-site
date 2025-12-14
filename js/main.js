* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  overflow: hidden;
  background: radial-gradient(circle at center, #3b1b5a 0%, #0a1022 60%, #020412 100%);
  color: white;
}

.header {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  width: 56px;
  height: 56px;
}

.logo-text h1 {
  font-size: 22px;
}

.logo-text p {
  font-size: 12px;
  opacity: 0.85;
}

#space {
  position: relative;
  width: 100vw;
  height: 100vh;
}

#stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0.6;
}

#core {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-48%, -50%); /* nudge right slightly */
  z-index: 5;
}

#xlviii {
  font-size: 48px;
  letter-spacing: 6px;
  opacity: 0.9;
}

#glyph-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glyph {
  position: absolute;
  width: 64px;
  height: 64px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(120, 180, 255, 0.6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
}

.glyph img {
  width: 36px;
  height: 36px;
}

#modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

#modal.hidden {
  display: none;
}

.modal-content {
  width: 520px;
  max-width: 90%;
  background: #0b1228;
  border: 1px solid #4aa3ff;
  border-radius: 10px;
  padding: 24px;
  position: relative;
}

#modal-close {
  position: absolute;
  top: 10px;
  right: 14px;
  cursor: pointer;
  opacity: 0.7;
}
