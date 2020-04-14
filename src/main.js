import axios from 'axios';
const init = async () => {

  console.log('initializing');

  
  const {data: fontDeclarations} = await axios.get("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Open+Sans&display=swap");
  document.querySelector("#fonts").innerHTML = fontDeclarations

  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "/css/styles.css"
  document.head.appendChild(link);
}


init();



