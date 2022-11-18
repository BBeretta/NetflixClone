import React, { useState} from "react";
import "./MovieRow.css";

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title, items }) => {

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2); //metade do tamanho da  tela do usuario
    if(x > 0) {
      x = 0;
    }
    setScrollX(x);
  }

  const handleRigthArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);

    //largura total da minha lista completa
    let listW = items.results.length * 150;
    if((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }

    setScrollX(x);
  }


  return (
    <div className="movieRow">
      <h2>{title}</h2>
      
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}}/>
      </div>
      <div className="movieRow--right" onClick={handleRigthArrow}>
        <NavigateNextIcon style={{fontSize: 50}}/>
      </div>

      <div className="movieRow--listarea">
        <div className="moviewRow--list" style={{
          marginLeft: scrollX, 
          width: items.results.length * 150}}>
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className="movieRow--item">
                <img
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                alt={item.original_title}
              />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
