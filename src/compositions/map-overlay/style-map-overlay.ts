import { css } from "@lion/core";

export const mapOverlayStyle = css
`.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.action-button {
  position: absolute;
  bottom: 25px;
  left: 20px;
  cursor: pointer;
  border-radius: var(--border-radius-s);
}

.overlay-wrapper {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
}

`
