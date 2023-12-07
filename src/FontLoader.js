// FontLoader.js
import fontsData from './fonts.json'; 
export const loadFonts = (fontFamily) => {
  let count = 0;
  if(fontFamily){
    let url = Object.values((fontsData)[fontFamily])[0];

  // Get a reference to the current in-use stylesheet, if there is one.
  const styleTag = document.querySelector('style');
      var newStyle = document.createElement('style');
      console.log(styleTag);
      console.log(fontFamily);
      newStyle.appendChild(document.createTextNode("\
      @font-face {\
          font-family: " + fontFamily + ";\
          src: url('" + url + "') format('yourFontFormat');\
      }\
      "));
      

    console.log(newStyle)
    document.head.appendChild(newStyle);
    console.log(fontFamily);

  }
};