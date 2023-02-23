import { css } from "@lion/core";

export const mapOverlayStyle = css
`.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.overlay-button {
  position: absolute;
  bottom: 25px;
  left: 20px;
  cursor: pointer;
}

.overlay-wrapper {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
}

.overlay-content {
  padding: 30px;
  padding-top: 0px;
}

.category-label {
  cursor: pointer;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.separator {
  margin-top: 15px;
  width: 100%;
  border-bottom: 1px solid var(--neutral-color-500);
}

.expand-icon {
  width: 12px;
  height: 12px;
}

.layer-option {
  margin-left: -4px;
  margin-bottom: 6px;
}

.layer-label {
  margin-left: 35px;
}

.layer-icon {
  position: absolute;
  left: 5px;
  top: 0;
  width: 23px;
  height: 100%;
}
`
