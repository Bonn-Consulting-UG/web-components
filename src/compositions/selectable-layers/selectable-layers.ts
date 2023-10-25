import { html, property, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { LayerData } from '../../model/LayerData';
import { selectableLayersStyle } from './style-selectable-layers';
import { LionIcon } from '@lion/icon';

export class BcgSelectableLayers extends ScopedElementsMixin(BcgModule) {
  @property({ type: Array }) layers: LayerData[] = [];
  @property({ type: Array }) activeLayers: LayerData[] = [];
  @property({ type: Function }) activeLayersChanged = (
    activeLayers: LayerData[]
  ) => {};
  @property({ type: Array }) expandedCategories: string[] = [];

  static get styles() {
    return [selectableLayersStyle];
  }

  static get scopedElements() {
    return {
      'lion-icon': LionIcon,
    };
  }

  switchCategoryExpandedState = (category: string) => {
    if (this.expandedCategories.includes(category)) {
      this.expandedCategories.splice(
        this.expandedCategories.indexOf(category),
        1
      );
    } else {
      this.expandedCategories?.push(category);
    }
    this.expandedCategories = [...this.expandedCategories];
  };

  get categories() {
    return [...new Set(this.layers.map(layer => layer.category))];
  }

  render() {
    return html` <bcg-checkbox-group
      name="layers"
      .modelValue=${this.activeLayers}
      @model-value-changed=${(ev: any) => {
        this.activeLayers = ev.target.modelValue;
        this.activeLayersChanged(this.activeLayers);
        this.requestUpdate();
      }}
    >
      ${this.categories.map(category => {
        return html`
          <h4
            class="category-label"
            @click=${() => this.switchCategoryExpandedState(category)}
          >
            ${category}
            <lion-icon
              class="expand-icon"
              icon-id=${this.expandedCategories.includes(category)
                ? 'bcg:general:collapse'
                : 'bcg:general:expand'}
            ></lion-icon>
          </h4>
          ${this.layers
            .filter(
              layer =>
                layer.category === category &&
                this.expandedCategories.includes(category)
            )
            .map(
              layer => html`
                <bcg-checkbox class="layer-option" .choiceValue=${layer}>
                  <span slot="label" style="position: relative">
                    <lion-icon
                      class="layer-icon"
                      icon-id="bcg:general:layer"
                      style="fill: ${layer.color ? layer.color : '#0080ff'}"
                    ></lion-icon>
                    <span class="layer-label">${layer.label}</span>
                  </span>
                </bcg-checkbox>
              `
            )}
          <div class="separator"></div>
        `;
      })}
    </bcg-checkbox-group>`;
  }
}
