import React, { useState, useEffect, useRef } from 'react';
import fontsData from './fonts.json'; // Assuming you have a file with Google Fonts data
import './App.css'
import { loadFonts } from './FontLoader';
import { Helmet } from 'react-helmet';
interface FontData {
  [family: string]: {
    [weight: string]: string;
  };
}

const TextEditor: React.FC = () => {


  
  const [content, setContent] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('');
  const [fontWeight, setFontWeight] = useState<string>('');
  const [isItalicdisable, setisItalicdisable] = useState<boolean>(false);
  const [fontWeightArray, setFontWeightArray] = useState<string[]>([]);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [googleFonts, setGoogleFonts] = useState<string[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const loadFonts = (flag:boolean) => {
    let count = 0;
    if(fontFamily){
      let url = Object.values((fontsData as any)[fontFamily])[0];
  
    // Get a reference to the current in-use stylesheet, if there is one.
    const styleTag = document.querySelector('style');
      console.log(styleTag)
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
      
      window.location.reload();
    }
  };
  // Fetch Google Fonts data from the JSON file
  
  // Object.keys((fontsData as any)[fontFamily])?.forEach((key)=> {
  
    useEffect(() => {
      
      if (fontFamily !== '') {
        let flag = false;
        const weights: string[] =  [];
        Object.keys((fontsData as any)[fontFamily])?.map((key) => key.length <= 3 ? weights.push(key) : flag = true);
        setFontWeightArray(weights);
        
        // Set the font weight to the first available weight
        if (weights.length > 0) {
          setFontWeight(weights[0]);
        } else {
          setFontWeightArray([]);
          setFontWeight('');
        }
      if(flag)
        setisItalicdisable(true); // Reset italic when font family changes
      }else{
        setisItalicdisable(false);
      }
      if(reload)
      loadFonts(true);
      setReload(true);
    }, [fontFamily,googleFonts]);  
  // Load saved data on component mount
  useEffect(() => {
    
    setFontWeightArray(['100','200']);
    setGoogleFonts(Object.keys(fontsData));
    // console.log(Object.keys(Object.keys((fontsData as any)[fontFamily])))
    const savedContent = localStorage.getItem('savedContent');
    const savedFontFamily = localStorage.getItem('savedFontFamily');
    const savedFontWeight = localStorage.getItem('savedFontWeight');
    const savedIsItalic = localStorage.getItem('savedIsItalic');
    
    if (savedContent) setContent(savedContent);
    if (savedFontFamily) setFontFamily(savedFontFamily);
    if (savedFontWeight) setFontWeight(savedFontWeight);
    if (savedIsItalic) setIsItalic(savedIsItalic === 'true');
      setReload(false);
    if(savedFontFamily){
        let url = Object.values((fontsData as any)[savedFontFamily])[0];
        const styleId = 'font-style-sheet';

      // Get a reference to the current in-use stylesheet, if there is one.
          var newStyle = document.createElement('style');
          newStyle.appendChild(document.createTextNode("\
          @font-face {\
              font-family: " + savedFontFamily + ";\
              src: url('" + url + "') format('woff');\
          }\
          "));
        console.log(newStyle)
        document.head.appendChild(newStyle);
    }
  }, []);

  // Save data whenever content, font family, font weight, or italic status changes
  useEffect(() => {
    localStorage.setItem('savedContent', content);
    localStorage.setItem('savedFontFamily', fontFamily);
     localStorage.setItem('savedFontWeight', fontWeight);
    localStorage.setItem('savedIsItalic', String(isItalic));
  }, [content, fontFamily, fontWeight, isItalic,reload]);

  // Handler for changing text content
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // Handler for changing font family
  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(event.target.value);
  };

  // Handler for changing font weight
  const handleFontWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontWeight(event.target.value);
  };

  // Handler for toggling italic
  const handleItalicToggle = () => {
    
    console.log('hii')
    setIsItalic(!isItalic);

  };
  const resetText = () => {
    console.log('sdfsdf');
    setContent('');
  }
  return (
    
    <div className='App'>
      <div className="panel">
        <div className="fontFamily">
          <label htmlFor="font-family">Font Family:</label>
          <select id="font-family" value={fontFamily} onChange={handleFontFamilyChange}>
            {googleFonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="fontWeight">
          <label htmlFor="font-weight">Font Weight:</label>
          <select id="font-weight" value={fontWeight} onChange={handleFontWeightChange}>
            {fontWeightArray.map((variant : string) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>       
        </div>
        <div className="italic">
          <label>
            Italic:
            <input type="checkbox"  checked={isItalic} onClick={handleItalicToggle} disabled={!isItalicdisable} />
          </label>
        </div>

      </div>
      <br/><br/><br/>
        <textarea value={content} onChange={handleContentChange} id="textAreaId" className="textArea" style={{ fontFamily, fontWeight  , fontStyle: isItalic ? 'italic' : 'normal', width: '80%', height: '200px', marginLeft: '1%', fontSize:'20px'}} >
              
        </textarea>
      <div className="buttonSection">
        <button type='submit' value="Submit" className='but' onClick={resetText}>Submit</button>
        <button type='reset' value="Reset" className='but'  onClick={resetText} > Reset </button>
      </div>
    </div>
  );
};

export default TextEditor;