import React from 'react';
import { showProd } from '../../../api/api-admin';

interface ProductData {
  name: string;
  description: string;
  image: string;
}

export class CatalogPage extends React.Component<object, { products: ProductData[] }> {
  constructor(props: object) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    showProd().then(({ body }) => {
      const productsArray = body.results;
      console.log(productsArray);
      const elements = productsArray.map((product) => {
        const desc = product.masterData.current.description;
        const description = desc ? desc['en-US'] : '';
        const img = product.masterData.current.masterVariant.images;
        const url = img ? img[0].url : '';
        return {
          name: product.masterData.current.name['en-US'],
          description: description,
          image: url,
        };
      });
      this.setState({ products: elements });
    });
  }

  render() {
    return (
      <div className="catalog-page">
        {this.state.products.map((product) => {
          return (
            <div className="catalog-item">
              <div className="product-title">{product.name}</div>
              <div>{product.description}</div>
              <img src={product.image} alt="" className="catalog-img" />
            </div>
          );
        })}
      </div>
    );
  }
}
