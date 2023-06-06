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
  z-index: 1;
}

.overlay-wrapper {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
}

@media screen and (max-width:500px) {
  .action-button {
    width: 100%;
    position: static;
    display: flex;
    justify-content: center;
  }

  .overlay-wrapper {
    position: static;
    width: 100%;
  }
}

`
