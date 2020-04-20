export const init = async () => {

  if(process.env.NODE_ENV === 'development') {
    document.head.querySelector("#essential").innerHTML = "@import '/css/essential.css';"
  }

  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  const adaptedLinkSignature = isFirefox ? `rel="stylesheet"` : `rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"`;
  document.head.innerHTML += `
    <link ${adaptedLinkSignature} href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;900&family=Open+Sans:wght@300;600&display=swap" />
    <link ${adaptedLinkSignature} href="/css/style.css" />
  `
}
