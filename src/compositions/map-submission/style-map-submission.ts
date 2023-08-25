import { css } from '@lion/core';

export const mapSubmissionStyle = css`
.wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.map-wrapper {
    width: 100%;
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

.submission-step {
    height: 100%;
}

.input-area textarea {
    max-height: 120px;
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

.sort-button {
    float: right;
    margin-top: -70px;
    margin-right: 220px;
    border: none;
    box-shadow: none;
    cursor: pointer
}

.list-grid {
    display: grid;
    gap: 10px;
    grid-template-columns: calc(50% - 5px) calc(50% - 5px);
    height: 100%";
}

.submission-permission-hint {
    padding:20px;
    max-width: 210px;
    position: absolute;
    right: 0;
    top: 0;
}

@media screen and (max-width:1010px) {
    .list-grid {
        grid-template-columns: 100%;
    }
}

@media screen and (max-width:500px) {
    .submission-button {
        float: unset;
        width: 100%;
        margin-bottom: 10px;
    }


    .option-1-label, .place-marker-section {
        display: none;
    }

    .sort-button {
        float: unset;
        width: 100%;
        margin-right: 0;
        margin-top: 0;
    }

    .tab-button {
        width: 50%;
    }
}
`;
