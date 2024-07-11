import { LitElement, html, css } from 'lit';

class ModalDialog extends LitElement {
  static styles = css`
    :host {
      --background-color: white;
      --border-radius: 5px;
      --close-button-color: black;
      --transition-duration: 0.3s;
      --minimized-height: 40px;
    }
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      transition: opacity var(--transition-duration) ease;
      opacity: 0;
    }
    .modal.open {
      display: flex;
      opacity: 1;
    }
    .modal-content {
      background: var(--background-color);
      padding: 20px;
      border-radius: var(--border-radius);
      position: relative;
      max-width: 80%;
      max-height: 80%;
      overflow: auto;
    }
    .close, .minimize {
      cursor: pointer;
      position: absolute;
      top: 10px;
      font-size: 20px;
      color: var(--close-button-color);
    }
    .close {
      right: 10px;
    }
    .minimize {
      right: 40px;
    }
    .modal.minimized {
      align-items: flex-end;
      justify-content: center;
    }
    .modal.minimized .modal-content {
      width: 100%;
      height: var(--minimized-height);
      border-radius: 0;
      overflow: hidden;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .bottom-close-button {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    invisible {
        display: none;
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    content: { type: String },
    closeButtonText: { type: String },
    minimized: { type: Boolean, reflect: true },
    bottomCloseButtonText: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.title = 'Modal Title';
    this.content = 'This is the modal content';
    this.closeButtonText = '×';
    this.minimized = false;
    this.bottomCloseButtonText = 'Close';
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      this._toggleModal();
    }
    if (changedProperties.has('minimized')) {
      this._toggleMinimize();
    }
  }

  _toggleModal() {
    const modal = this.shadowRoot.querySelector('.modal');
    if (this.open) {
      modal.classList.add('open');
      modal.style.display = 'flex';
      this.dispatchEvent(new Event('open'));
    } else {
      modal.classList.remove('open');
      setTimeout(() => {
        if (!this.open) {
          modal.style.display = 'none';
        }
      }, parseFloat(getComputedStyle(this).getPropertyValue('--transition-duration')) * 1000);
      this.dispatchEvent(new Event('close'));
    }
  }

  _toggleMinimize() {
    const modal = this.shadowRoot.querySelector('.modal');
    const element = document.querySelector('.your-element-selector');
    if (this.minimized) {
        modal.classList.add('minimized');
        this.shadowRoot.querySelectorAll('.hidden').forEach(function(element) {
            element.style.display = 'none';
        });
    } else {
        modal.classList.remove('minimized');
        this.shadowRoot.querySelectorAll('.hidden').forEach(function(element) {
            element.style.display = '';
        });
    }
  }

  render() {
    return html`
      <div class="modal" @click="${this._handleBackdropClick}">
        <div class="modal-content" @click="${this._restoreModal}">
          <span class="close" @click="${this._closeModal}">${this.closeButtonText}</span>
          <span class="minimize hidden" @click="${this._minimizeModal}">_</span>
          <h2>${this.title}</h2>
          <p class="hidden">${this.content}</p>
          <slot class="hidden"></slot>
          <div class="bottom-close-button hidden">
            <button @click="${this._closeModal}">${this.bottomCloseButtonText}</button>
          </div>
        </div>
      </div>
    `;
  }

  _handleBackdropClick(e) {
    if (e.target.classList.contains('modal')) {
      this.open = false;
    }
  }

  _closeModal() {
    this.open = false;
  }

  _minimizeModal(e) {
    e.stopPropagation();
    this.minimized = true;
  }

  _restoreModal() {
    if (this.minimized) {
      this.minimized = false;
    }
  }
}

customElements.define('modal-dialog', ModalDialog);

