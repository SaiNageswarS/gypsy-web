import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';


function App() {
  return (
    <div className="App">
      <GypsyAppBar />
      <Intro />
    </div>
  );
}

function Intro() {
  return (
    <div className="Intro">
      <div className='IntroText'>
        <h1>Gypsy Nest - Backpackers Haven on a Budget.</h1>
      </div>
      <div className='IntroImage'>
        <HostelGallery />
      </div>
    </div>
  );
}

function HostelGallery() {
  return (
    <ImageList
      sx={{ width: 500, height: 500 }}
      variant="quilted"
      cols={4}
      rowHeight={121}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: 'img/1.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'img/2.jpg',
    title: 'Burger',
  },
  {
    img: 'img/3.jpg',
    title: 'Camera',
  },
  {
    img: 'img/4.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'img/5.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'img/6.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'img/7.jpg',
    title: 'Basketball',
  },
  {
    img: 'img/8.jpg',
    title: 'Fern',
  }
];

function GypsyAppBar() {
  return (
    <div className="Header">
      <div className='Brand'>
        <span className='BrandLogo'>
          <svg id="brandHeader" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.03198 3.80281V7.07652L3.86083 9.75137L0.689673 12.4263L0.667474 6.56503C0.655304 3.34138 0.663875 0.654206 0.686587 0.593579C0.71907 0.506918 1.4043 0.488223 3.87994 0.506219L7.03198 0.529106V3.80281ZM21.645 4.36419V5.88433L17.0383 9.76316C14.5046 11.8966 11.2263 14.6552 9.75318 15.8934L7.07484 18.145V20.3225V22.5H3.85988H0.64502L0.667303 18.768L0.689673 15.036L2.56785 13.4609C3.60088 12.5946 6.85989 9.85244 9.81009 7.36726L15.1741 2.84867L18.4096 2.8464L21.645 2.84413V4.36419ZM21.645 15.5549V22.5H18.431H15.217V18.2638V14.0274L15.4805 13.7882C15.8061 13.4924 21.5939 8.61606 21.6236 8.61248C21.6353 8.61099 21.645 11.7351 21.645 15.5549Z" fill="currentColor"></path>
          </svg>
        </span>
        <span className="BrandName"> Gypsy Nest </span>
      </div>
      <div className='HeaderActions'>
        <Button variant="contained">Login</Button>
      </div>
    </div>
  );
}

export default App;
