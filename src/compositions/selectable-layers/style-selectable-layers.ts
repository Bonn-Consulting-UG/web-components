import { css } from "@lion/core";

export const selectableLayersStyle = css
`
.category-label {
    cursor: pointer;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

.separator {
    margin-top: 15px;
    width: 100%;
    border-bottom: 1px solid var(--background-color-500);
}
`
