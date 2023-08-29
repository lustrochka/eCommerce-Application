import React from 'react';
import { ProductData } from '../../../types';

export class ProductList extends React.Component<{ products: ProductData[] }> {
  constructor(props: { products: ProductData[] }) {
    super(props);
  }

  render() {
    return (
      <div className="product-list">
        {this.props.products.map((product) => {
          return (
            <div className="catalog-item">
              <div className="product-title">{product.name}</div>
              <div>{product.description}</div>
              <img src={product.image} alt="" className="catalog-img" />
              <div className={product.discounted ? 'crossed' : ''}>{product.price}</div>
              <div>{product.discount}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
