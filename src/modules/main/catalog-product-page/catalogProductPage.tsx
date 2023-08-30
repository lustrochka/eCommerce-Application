import React from 'react';
import { showCategory, sortingProducts } from '../../../api/api-admin';
import { ProductList } from './ProductList';
import { ProductData, QueryType } from '../../../types';
import { NavLink } from 'react-router-dom';

interface State {
  sortPrice: string;
  sortName: string;
  products: ProductData[];
  success: boolean;
  minPrice: string;
  maxPrice: string;
  brand: string[];
  colors: string[];
  storage: string[];
  ram: string[];
  categories: string[];
  catId: string;
}

export class CatalogPage extends React.Component<{ type: string }, State> {
  constructor(props: { type: string }) {
    super(props);

    this.state = {
      sortPrice: '',
      sortName: '',
      products: [],
      success: true,
      minPrice: '',
      maxPrice: '',
      brand: [],
      colors: [],
      storage: [],
      ram: [],
      categories: [],
      catId: '',
    };
  }

  changeElements(query: QueryType) {
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

  renderCategory() {
    showCategory()
      .then(({ body }) => {
        const categoryArray = body.results.map((item) => {
          if (item.name['en-US'].toLowerCase() === this.props.type) {
            this.setState({ catId: item.id });
          }
          return item.name['en-US'];
        });
        this.setState({ categories: categoryArray });
        this.changeElements(this.createQuery());
      })
      .catch(() => {
        this.setState({ categories: ['Cannot load data'] });
      });
  }

  createQuery() {
    const query: QueryType = {};
    const filter = [];
    if (this.state.sortName) query.sort = this.state.sortName;
    if (this.state.sortPrice) query.sort = this.state.sortPrice;
    if (this.state.minPrice || this.state.maxPrice) {
      const min = this.state.minPrice || '*';
      const max = this.state.maxPrice || '*';
      filter.push(`variants.price.centAmount:range (${min} to ${max})`);
    }
    if (this.state.brand.length > 0) filter.push(`variants.attributes.Brand: ${this.state.brand.join(',')}`);
    if (this.state.colors.length > 0) filter.push(`variants.attributes.color: ${this.state.colors.join(',')}`);
    if (this.state.storage.length > 0)
      filter.push(`variants.attributes.internal-storage: ${this.state.storage.join(',')}`);
    if (this.state.ram.length > 0) filter.push(`variants.attributes.RAM: ${this.state.ram.join(',')}`);
    if (this.state.catId) filter.push(`categories.id: "${this.state.catId}"`);
    if (filter.length > 0) query.filter = filter;
    return query;
  }

  componentDidMount() {
    this.renderCategory();
  }

  render() {
    const brands = ['Samsung', 'MacBook'].map((item) => {
      return (
        <>
          <label htmlFor={item}>{item}</label>
          <input
            type="checkbox"
            id={item}
            value={`${item}`}
            onChange={(e) => {
              const value = `"${e.target.value}"`;
              const index = this.state.brand.indexOf(value);

              if (e.target.checked) {
                this.setState({ brand: [...this.state.brand, value] }, () => this.changeElements(this.createQuery()));
              } else {
                this.setState(
                  { brand: [...this.state.brand.slice(0, index), ...this.state.brand.slice(index + 1)] },
                  () => this.changeElements(this.createQuery())
                );
              }
            }}
          />
        </>
      );
    });
    const colors = ['black', 'silver', 'lavender'].map((item) => {
      return (
        <div>
          <label htmlFor={item}>{item}</label>
          <input
            type="checkbox"
            id={item}
            value={`${item}`}
            onChange={(e) => {
              const value = `"${e.target.value}"`;
              const index = this.state.colors.indexOf(value);
              if (e.target.checked) {
                this.setState({ colors: [...this.state.colors, value] }, () => this.changeElements(this.createQuery()));
              } else {
                this.setState(
                  { colors: [...this.state.colors.slice(0, index), ...this.state.colors.slice(index + 1)] },
                  () => this.changeElements(this.createQuery())
                );
              }
            }}
          />
        </div>
      );
    });
    const storage = [64, 256, 512].map((item) => {
      return (
        <div>
          <label htmlFor={item.toString()}>{item}GB</label>
          <input
            type="checkbox"
            id={item.toString()}
            value={`${item}`}
            onChange={(e) => {
              const index = this.state.storage.indexOf(e.target.value);
              if (e.target.checked) {
                this.setState({ storage: [...this.state.storage, e.target.value] }, () =>
                  this.changeElements(this.createQuery())
                );
              } else {
                this.setState(
                  { storage: [...this.state.storage.slice(0, index), ...this.state.storage.slice(index + 1)] },
                  () => this.changeElements(this.createQuery())
                );
              }
            }}
          />
        </div>
      );
    });
    const ram = [4, 8, 16].map((item) => {
      return (
        <div>
          <label htmlFor={item.toString()}>{item}GB</label>
          <input
            type="checkbox"
            id={item.toString()}
            value={`${item}`}
            onChange={(e) => {
              const index = this.state.ram.indexOf(e.target.value);
              if (e.target.checked) {
                this.setState({ ram: [...this.state.brand, e.target.value] }, () =>
                  this.changeElements(this.createQuery())
                );
              } else {
                this.setState({ ram: [...this.state.brand.slice(0, index), ...this.state.ram.slice(index + 1)] }, () =>
                  this.changeElements(this.createQuery())
                );
              }
            }}
          />
        </div>
      );
    });
    const categories = this.state.categories.map((item) => {
      return (
        <NavLink className="category" to={`/catalog/${item.toLowerCase()}`} reloadDocument>
          <div>{item}</div>
        </NavLink>
      );
    });
    return (
      <div className="catalog-page">
        <div className="sorting-block">
          <select
            className="sort-input"
            value={this.state.sortPrice}
            onChange={(e) => {
              this.setState({ sortPrice: e.target.value, sortName: '' }, () => this.changeElements(this.createQuery()));
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
              this.setState({ sortName: e.target.value, sortPrice: '' }, () => this.changeElements(this.createQuery()));
            }}
          >
            <option value="">Sort by name</option>
            <option value="name.en-US asc">A-Z</option>
            <option value="name.en-US desc">Z-A</option>
          </select>
        </div>
        <h1 className={this.state.success ? 'error-message' : 'visible'}>Sorry, cannot get data now</h1>
        <div className="catalog-main-block">
          <div className="filters">
            <div className="filter-item">
              <div>Price</div>
              <div>
                <input
                  type="number"
                  placeholder="from"
                  onInput={(e) => {
                    this.setState({ minPrice: e.currentTarget.value ? `${e.currentTarget.value}00` : '' }, () =>
                      this.changeElements(this.createQuery())
                    );
                  }}
                />
                <input
                  type="number"
                  placeholder="to"
                  onInput={(e) => {
                    this.setState({ maxPrice: e.currentTarget.value ? `${e.currentTarget.value}00` : '' }, () =>
                      this.changeElements(this.createQuery())
                    );
                  }}
                />
              </div>
            </div>
            <div className="filter-item">
              <div>Brand</div>
              {brands}
            </div>
            <div className="filter-item">
              <div>Color</div>
              {colors}
            </div>
            <div className="filter-item">
              <div>storage</div>
              {storage}
            </div>
            <div className="filter-item">
              <div>ram</div>
              {ram}
            </div>
          </div>
          <ProductList products={this.state.products} />
          <div className="filter-item">{categories}</div>
        </div>
      </div>
    );
  }
}
