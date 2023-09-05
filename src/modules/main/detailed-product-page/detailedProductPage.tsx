import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProduct } from '../../../api/api-admin';
import { NavLink } from 'react-router-dom';

export function DetailedPage() {
  const { category, id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [storage, setStorage] = useState('');
  const [ram, setRam] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [images, setImages] = useState(['']);
  const [classlist, setClasslist] = useState('modal-window');
  const [value, setValue] = useState('0');
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (id)
      getProduct(id).then(({ body }) => {
        const data = body.masterData.current;
        let discount = '';
        setName(data.name['en-US']);
        if (data.description) setDescription(data.description['en-US']);
        if (data.masterVariant.attributes) {
          setStorage(data.masterVariant.attributes[2].value);
          setRam(data.masterVariant.attributes[3].value);
        }
        const prices = data.masterVariant.prices;
        if (prices) {
          setPrice(prices[0].value.centAmount / 100);
          if (prices[0].discounted) {
            setDiscounted(true);
            discount = `Price: $${Math.floor(prices[0].discounted.value.centAmount / 100)},${
              prices[0].discounted.value.centAmount % 100
            }`;
          }
        }
        setDiscount(discount);
        const img = data.masterVariant.images;
        if (img) setImages(img.map((item) => item.url));
      });
  }, []);

  const urls = images.map((url, index) => (
    <img
      src={url}
      className="product-img"
      onClick={() => {
        setValue(`${index}`);
        setStyle({ transform: 'translateX(' + `-${430 * index}px` + ')' });
        setClasslist('modal-window display');
      }}
    ></img>
  ));

  return (
    <>
      <div className={classlist} onClick={() => setClasslist('modal-window')}>
        <div
          className="modal"
          style={{ margin: `${document.documentElement.clientHeight / 2 - 270}px auto` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="close-button" onClick={() => setClasslist('modal-window')}></div>
          <div className="modal-wrapper">
            <div className="modal-imgs" style={style}>
              {urls}
            </div>
          </div>
          <input
            className="slider"
            type="range"
            value={value}
            max={images.length - 1}
            step="1"
            onChange={(e) => {
              setValue(e.target.value);
              setStyle({ transform: 'translateX(' + `-${430 * Number(e.target.value)}px` + ')' });
            }}
          />
        </div>
      </div>
      <div className="detailed-page">
        <div className="route">
          <NavLink className="product-link" to={'/catalog'}>
            catalog/
          </NavLink>
          <NavLink className="product-link" to={`/catalog/${category}`}>
            {category}/
          </NavLink>
          <span>{name}</span>
        </div>
        <h1>{name}</h1>
        <div>{description}</div>
        <div>Internal storage: {storage}GB</div>
        <div>RAM: {ram}GB</div>
        <div className={discounted ? 'crossed' : ''}>Price: ${price}</div>
        <div>{discount}</div>
        <div className="images-block">{urls}</div>
      </div>
    </>
  );
}
