import { css } from "@lion/core";

export const mapSubmissionStyle = css
`
.wrapper {
}

.submission-button {
    float: right;
    cursor: pointer;
    border: var(--border-xs) solid var(--primary-color);
    border-radius: var(--border-radius-xs);
}

.overlay-content {
    height: calc(100% - 50px);
    padding-left: 20px;
    padding-right: 20px;
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
    border-bottom: 1px solid var(--background-color-500);
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

.submission-step {
    height: 100%;
}

.step-content {
    height: 90%;
}

.step-navigation {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.pin-container {
    display: flex;
    flex-direction: row;
    padding: 1em;
    border: 1px solid var(--neutral-color-500);
    border-radius: 5px;
}

.pin-text {
    width: 80%;
    font-size: 0.8em;
    line-height: 1.6em;
    padding-left: 1em;
}

.pin-info-text {
    color: var(--neutral-color-600);
    font-size: 0.8em;
    line-height: 1.6em;
    margin-bottom: 0.2em;
}

.marker-icon {
    width: 27px;
    height: 41px;
    cursor: move;
}

.submission-form {
    height: 100%;
}

.tab-button {
    font-weight: normal;
    padding-left: 0.5em;
    padding-right: 0.5em;
    position: relative;
    background: var(--background-color-500);
}

.tab-button:first-of-type {
    border-radius: var(--border-radius-s) 0 0 var(--border-radius-s);
}

.tab-button:last-of-type {
    border-radius: 0 var(--border-radius-s) var(--border-radius-s) 0;
}

.tab-button[selected]:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: var(--border-radius-s);
    background: #fff;
}

.button-icon {
    height: 20px;
    width: 20px;
    margin-right: 0.3em;
    margin-bottom: -4px;
}

`
