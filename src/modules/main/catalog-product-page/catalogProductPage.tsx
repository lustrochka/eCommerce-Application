import React from 'react';
import { showProd } from '../../../api/api-admin';

interface ProductData {
  name: string;
  description: string;
  image: string;
  price: string;
  discounted: boolean;
  discount: string;
}

export class CatalogPage extends React.Component<object, { products: ProductData[]; success: boolean }> {
  constructor(props: object) {
    super(props);

    this.state = {
      products: [],
      success: true,
    };
  }

  componentDidMount() {
    showProd()
      .then(({ body }) => {
        const productsArray = body.results;
        const elements = productsArray.map((product) => {
          const desc = product.masterData.current.description;
          const description = desc ? desc['en-US'] : '';
          const img = product.masterData.current.masterVariant.images;
          const url = img ? img[0].url : '';
          const prices = product.masterData.current.masterVariant.prices;
          const priceDollar = prices ? prices[0].value.centAmount / 100 : 0;
          const priceCent = prices ? prices[0].value.centAmount % 100 : 0;
          let discounted = false;
          let discount = '';
          if (prices) {
            if (prices[0].discounted) {
              discounted = true;
              discount = `$${Math.floor(prices[0].discounted.value.centAmount / 100)},${
                prices[0].discounted.value.centAmount % 100
              }`;
            }
          }
          return {
            name: product.masterData.current.name['en-US'],
            description: description,
            image: url,
            price: `$${priceDollar},${priceCent}`,
            discounted: discounted,
            discount: discount,
          };
        });
        this.setState({ products: elements });
        console.log('successs');
      })
      .catch(() => {
        this.setState({ success: false });
      });
  }

  render() {
    return (
      <div className="catalog-page">
        <h1 className={this.state.success ? 'error-message' : 'visible'}>Sorry, cannot get data now</h1>
        <div className="product-list">
          {this.state.products.map((product) => {
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
      </div>
    );
  }
}
