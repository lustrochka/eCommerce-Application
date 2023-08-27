import React from 'react';
import { sortingProducts } from '../../../api/api-admin';

interface ProductData {
  description: string;
  name: string;
  image: string;
  price: string;
  discounted: boolean;
  discount: string;
}

interface State {
  query: string;
  sortPrice: string;
  sortName: string;
  products: ProductData[];
  success: boolean;
}

export class CatalogPage extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      query: '',
      sortPrice: '',
      sortName: '',
      products: [],
      success: true,
    };
  }

  changeElements(query: string) {
    sortingProducts(query)
      .then(({ body }) => {
        const productsArray = body.results;
        const elements = productsArray.map((product) => {
          const desc = product.description;
          const description = desc ? desc['en-US'] : '';
          const img = product.masterVariant.images;
          const url = img ? img[0].url : '';
          const prices = product.masterVariant.prices;
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
            name: product.name['en-US'],
            description: description,
            image: url,
            price: `$${priceDollar},${priceCent}`,
            discounted: discounted,
            discount: discount,
          };
        });
        this.setState({ products: elements });
      })
      .catch(() => {
        this.setState({ success: false });
      });
  }

  componentDidMount() {
    this.changeElements('');
  }

  render() {
    return (
      <div className="catalog-page">
        <div className="sorting-block">
          <select
            className="sort-input"
            value={this.state.sortPrice}
            onChange={(e) => {
              this.setState({ query: e.target.value, sortPrice: e.target.value, sortName: '' });
              this.changeElements(e.target.value);
            }}
          >
            <option value="">Sort by price</option>
            <option value="price asc">From lowest price</option>
            <option value="price desc">From highest price</option>
          </select>
          <select
            className="sort-input"
            value={this.state.sortName}
            onChange={(e) => {
              this.setState({ query: e.target.value, sortName: e.target.value, sortPrice: '' });
              this.changeElements(e.target.value);
            }}
          >
            <option value="">Sort by name</option>
            <option value="name.en-US asc">A-Z</option>
            <option value="name.en-US desc">Z-A</option>
          </select>
        </div>
        <div className="product-list">
          <h1 className={this.state.success ? 'error-message' : 'visible'}>Sorry, cannot get data now</h1>
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
