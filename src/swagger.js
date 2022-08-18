// Callback for the observer
const callback = (mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      fillOutForm();
    }
  }
};

// Create observer and Events
const observer = new MutationObserver(callback);
const changeEvent = new CustomEvent('change', { bubbles: true });
const clickEvent = new MouseEvent('click', { bubbles: true });

let authWrapper;
// Wait for the window being loaded to access the DOM
window.addEventListener('load', () => {
  authWrapper = document.getElementsByClassName('auth-wrapper')[0];
  observer.observe(authWrapper, { childList: true });
});

// This is a little hacky example since the fields mostly have no id's to go by, but it works well enough to serve as an example.
const fillOutForm = () => {
  const client_id =
    authWrapper.getElementsByClassName('wrapper')[0]?.childNodes[1].firstChild;

  // Since fillOutForm is also called on closing the popup, we need to check if the form is open.
  if (!client_id) return;

  const scopes =
    authWrapper.getElementsByClassName('scopes')[0].firstChild.childNodes[1];
  client_id.setAttribute('value', 'From customJs!');
  client_id.dispatchEvent(changeEvent);
  scopes.dispatchEvent(clickEvent);

  // Optionally you can even invoke the auth button immediately if you want to

  // const authButton =
  //   authWrapper.getElementsByClassName('auth-btn-wrapper')[0].firstChild;
  // authButton.dispatchEvent(clickEvent);
};
