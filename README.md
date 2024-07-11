# Custom Modal Component: `modal-dialog`

`modal-dialog` is a customizable web component for creating modals in your web applications. It supports features like custom titles, content, close buttons, and a unique minimize feature. This README will guide you through setting up and using `modal-dialog`.

## Features

- **Customizable Modal**: Set custom titles, content, and close button text.
- **Minimize Functionality**: Minimize the modal to a small bar at the bottom.
- **Easy Integration**: Use it as a standalone component in any web project.

## Usage

### Installation

First, make sure you have `lit` installed, which is a peer dependency of `modal-dialog`.

```bash
npm install lit
```

## Usage

### Integration

1. **Importing `modal-dialog.js`**

   Import `modal-dialog.js` in your HTML file where you want to use the modal.

   ```html
   <script type="module" src="./modal-dialog.js"></script>
    ```
2. **Adding the Modal Component**

    Add the <modal-dialog> element to your HTML file.
    ```html
    <modal-dialog
        id="myModal"
        title="Example Modal"
        content="This is an example modal content."
        closeButtonText="×"
        bottomCloseButtonText="Close Modal">
    </modal-dialog>
    ```
3. **Opening the Modal**
    Use JavaScript to open the modal when an event occurs (e.g., button click).
    ```html
    <button id="openModal">Open Modal</button>
    <script type="module">
      const openModalButton = 
        document.getElementById('openModal');
      const modal = document.getElementById('myModal');
      openModalButton.addEventListener('click', () => {
        modal.open = true;
      });
    </script>
    ```

## Properties ##

* **title (String)**: Sets the title of the modal.
* **content (String)**: Sets the content of the modal.
* **closeButtonText (String)**: Sets the text for the close button ('X' by default).
* **bottomCloseButtonText (String)**: Sets the text for the bottom close button.

## Events

* **open**: Fired when the modal opens.
* **close**: Fired when the modal closes.

## Example Basic Usage

```html
<button id="openModal">Open Modal</button>

<modal-dialog
  id="myModal"
  title="Example Modal"
  content="This is an example modal content."
  closeButtonText="×"
  bottomCloseButtonText="Close Modal">
</modal-dialog>

<script type="module">
  const openModalButton = 
    document.getElementById('openModal');
  const modal = document.getElementById('myModal');

  openModalButton.addEventListener('click', () => {
    modal.open = true;
  });
</script>
```
  