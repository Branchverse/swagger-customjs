const callback = (mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      fillOutForm();
    }
  }
};

const observer = new MutationObserver(callback);
const changeEvent = new CustomEvent('change', { bubbles: true });
const clickEvent = new MouseEvent('click', { bubbles: true });
let authWrapper;
window.addEventListener('load', () => {
  authWrapper = document.getElementsByClassName('auth-wrapper')[0];
  observer.observe(authWrapper, { childList: true });
});

const fillOutForm = () => {
  const client_id =
    authWrapper.getElementsByClassName('wrapper')[0].childNodes[1].firstChild;
  if (client_id) {
    const scopes =
      authWrapper.getElementsByClassName('scopes')[0].firstChild.childNodes[1];

    client_id.setAttribute('value', 'From customJs!');
    client_id.dispatchEvent(changeEvent);
    scopes.dispatchEvent(clickEvent);
    // Optionally you can even invoke the auth button immediately if you want to
    // const authButton =
    //   authWrapper.getElementsByClassName('auth-btn-wrapper')[0].firstChild;
    // authButton.dispatchEvent(clickEvent);
  }
};
