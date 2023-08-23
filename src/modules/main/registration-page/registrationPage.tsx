import {
  BaseAddress,
  CustomerDraft,
  CustomerSetDefaultShippingAddressAction,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { createCustomer, getCustomer, setDefaultAdress } from '../../../api/api-admin';
import React, { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function RegistrationPage() {
  const INPUTS = [
    {
      name: 'Email',
      pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
      msg: 'A email address should be properly formatted (e.g., example@email.com)',
      placeholder: 'example@email.com',
    },
    {
      name: 'Password',
      pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{8,}',
      msg: 'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      placeholder: '1aZ*2bA+',
    },
    {
      name: 'First-Name',
      pattern: '[A-Za-z]+',
      msg: 'First name must contain at least one character and no special characters or numbers',
      placeholder: 'Alex',
    },
    {
      name: 'Last-Name',
      pattern: '[A-Za-z]+',
      msg: 'Last name must contain at least one character and no special characters or numbers',
      placeholder: 'Adamovich',
    },
    { name: 'Date-of-birth', pattern: '', msg: 'You should have at least 13 years' },
  ];

  const COUNTRIES = [
    { name: 'Belarus', pattern: '2[1-4][0-7]\\d{3}', placeholder: '220000', reg: /^2[1-4][0-7]\d{3}$/ },
    { name: 'Poland', pattern: '\\d{2}-\\d{3}', placeholder: '00-000', reg: /^\d{2}-\d{3}$/ },
    { name: 'Russia', pattern: '[1-9]\\d{5}', placeholder: '101000', reg: /^[1-9]\d{5}$/ },
  ];

  const ADRESS_ITEMS = [
    { name: 'Street', pattern: '\\S+', msg: 'Street must contain at least one character', placeholder: 'Skaryny' },
    {
      name: 'City',
      pattern: '[A-Za-z]+',
      msg: 'City must contain at least one character and no special characters or numbers',
      placeholder: 'Minsk',
    },
  ];

  const codeInfo = { name: 'Postal-Code', msg: 'Postal code must follow the format for the country' };

  const indexes: { [key: string]: number } = { Belarus: 0, Poland: 1, Russia: 2 };

  const [values, setValues] = useState(['', '', '', '', '']);
  const [classlist, setClasslist] = useState('error-message');
  const [pattern, setPattern] = useState(COUNTRIES[0].pattern);
  const [pattern2, setPattern2] = useState(COUNTRIES[0].pattern);
  const [placeholder, setPlaceholder] = useState(COUNTRIES[0].placeholder);
  const [placeholder2, setPlaceholder2] = useState(COUNTRIES[0].placeholder);
  const [adresses, setAdresses] = useState(['', '', '']);
  const [adresses2, setAdresses2] = useState(['', '', '']);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checkedBoth, setCheckedBoth] = useState(false);
  const [value, setValue] = useState('Belarus');
  const [value2, setValue2] = useState('Belarus');
  const codeInput = useRef<HTMLInputElement>(null);
  const codeInput2 = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  let id: string;

  function changeHandler(index: number, event: ChangeEvent<HTMLInputElement>) {
    setValues([...values.slice(0, index), event.target.value, ...values.slice(index + 1)]);
  }

  function changeShippingAdress(index: number, event: ChangeEvent<HTMLInputElement>) {
    setAdresses([...adresses.slice(0, index), event.target.value, ...adresses.slice(index + 1)]);
  }

  function changeBillingAdress(index: number, event: ChangeEvent<HTMLInputElement>) {
    setAdresses2([...adresses2.slice(0, index), event.target.value, ...adresses2.slice(index + 1)]);
  }

  const result = INPUTS.map((item, index) => {
    return (
      <>
        <label htmlFor={item.name}>{item.name.split('-').join(' ')}</label>
        <input
          className="registration-input"
          id={item.name}
          name={item.name.split('-').join(' ')}
          required
          value={values[index]}
          type={item.name === 'Date-of-birth' ? 'date' : 'text'}
          pattern={item.pattern}
          placeholder={item.placeholder}
          onChange={(e) => {
            changeHandler(index, e);
            let message;
            if (item.name === 'Date-of-birth') {
              message = checkAge(e.target.value) ? '' : `${item.msg}`;
            } else {
              message = e.target.validity.patternMismatch ? `${item.msg}` : '';
            }
            e.target.setCustomValidity(message);
          }}
        />
      </>
    );
  });

  const adressArr = ADRESS_ITEMS.map((item, index) => {
    return (
      <>
        <label htmlFor={item.name}>{item.name.split('-').join(' ')}</label>
        <input
          className="registration-input"
          id={item.name}
          name={item.name.split('-').join(' ')}
          required
          value={adresses[index]}
          type="text"
          pattern={item.pattern}
          placeholder={item.placeholder}
          onChange={(e) => {
            changeShippingAdress(index, e);
            const message = e.target.validity.patternMismatch ? `${item.msg}` : '';
            e.target.setCustomValidity(message);
          }}
        />
      </>
    );
  });

  const adressArrBilling = ADRESS_ITEMS.map((item, index) => {
    return (
      <>
        <label htmlFor={item.name}>{item.name.split('-').join(' ')}</label>
        <input
          className="registration-input"
          id={item.name}
          name={item.name.split('-').join(' ')}
          required
          value={adresses2[index]}
          type="text"
          pattern={item.pattern}
          placeholder={item.placeholder}
          onChange={(e) => {
            changeBillingAdress(index, e);
            const message = e.target.validity.patternMismatch ? `${item.msg}` : '';
            e.target.setCustomValidity(message);
          }}
        />
      </>
    );
  });

  const options = COUNTRIES.map((country) => {
    return (
      <>
        <option value={country.name}>{country.name}</option>
      </>
    );
  });

  const PostalCode = (type: string) => {
    return (
      <input
        className="registration-input"
        id="Postal-Code"
        name="Postal Code"
        required
        value={type === 'shipping' ? adresses[2] : adresses2[2]}
        type="text"
        ref={type === 'shipping' ? codeInput : codeInput2}
        pattern={type === 'shipping' ? pattern : pattern2}
        placeholder={type === 'shipping' ? placeholder : placeholder2}
        onChange={(e) => {
          type === 'shipping' ? changeShippingAdress(2, e) : changeBillingAdress(2, e);
          const message = e.target.validity.patternMismatch ? `${codeInfo.msg}` : '';
          e.target.setCustomValidity(message);
        }}
      />
    );
  };

  function checkAge(value: string) {
    const now = new Date();
    const birthDate = new Date(value);
    if (now.getFullYear() - birthDate.getFullYear() === 13) {
      if (now.getMonth() > birthDate.getMonth()) {
        return true;
      } else if (now.getMonth() === birthDate.getMonth()) {
        if (now.getDate() >= birthDate.getDate()) {
          return true;
        }
      }
    }
    return now.getFullYear() - birthDate.getFullYear() > 13;
  }

  function registerCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = createCustomer(createBody());
    response
      .then(({ body }) => {
        setClasslist('error-message');
        id = body.customer.id.toString();
        if (checked || checked2) {
          const customer = getCustomer(id);
          customer.then((result) => {
            const billingArr = result.body.billingAddressIds;
            const shippingArr = result.body.shippingAddressIds;
            const actions = [];
            if (shippingArr && billingArr) {
              if (checked) actions.push({ action: `setDefaultShippingAddress`, addressId: `${billingArr[0]}` });
              if (checked2) actions.push({ action: `setDefaultBillingAddress`, addressId: `${shippingArr[0]}` });
              setDefaultAdress(id, actions as CustomerUpdateAction[]);
            }
          });
        }
        navigate('/');
      })
      .catch(() => {
        setClasslist('error-message visible');
      });
  }

  function createAdress([street, city, code]: string[], country: string) {
    const COUNTRY_CODES: { [key: string]: string } = { Belarus: 'BY', Poland: 'PL', Russia: 'RU' };
    return {
      streetName: street,
      city: city,
      postalCode: code,
      country: COUNTRY_CODES[country],
    };
  }

  function createBody() {
    const adressArray: BaseAddress[] = [];
    const shippingAdress = createAdress(adresses, value);
    adressArray.push(shippingAdress);
    let billingAdress;
    let billingIndexes;

    if (JSON.stringify(adresses) !== JSON.stringify(adresses2)) {
      billingAdress = createAdress(adresses2, value2);
      adressArray.push(billingAdress);
      billingIndexes = 1;
    } else {
      billingAdress = shippingAdress;
      billingIndexes = 0;
    }

    const result: CustomerDraft = {
      email: values[0],
      password: values[1],
      firstName: values[2],
      lastName: values[3],
      dateOfBirth: values[4],
      addresses: adressArray,
      shippingAddresses: [0],
      billingAddresses: [billingIndexes],
    };

    return result;
  }

  return (
    <div className="registration-page">
      <h1 className="registration-title">Register</h1>
      <form
        className="registration-form"
        onSubmit={(e) => {
          registerCustomer(e);
        }}
      >
        {result}
        <div className="adresses-block">
          <div className="adress-block" id="shipping-adress">
            <div className="adress-title">Shipping-adress</div>
            {adressArr}
            <label htmlFor="Postal-Code">Postal Code</label>
            {PostalCode('shipping')}
            <label htmlFor="shipping-country">Country</label>
            <select
              className="registration-input"
              id="shipping-country"
              name="Country"
              value={value}
              required
              onChange={(e) => {
                setValue(e.target.value);
                setPattern(COUNTRIES[indexes[e.target.value]].pattern);
                setPlaceholder(COUNTRIES[indexes[e.target.value]].placeholder);
                if (COUNTRIES[indexes[e.target.value]].reg.test(adresses2[2])) {
                  if (codeInput.current) codeInput.current.setCustomValidity('');
                } else {
                  if (codeInput.current) codeInput.current.setCustomValidity(codeInfo.msg);
                }
              }}
            >
              {options}
            </select>
            <div>
              <label htmlFor="shipping-checkbox">Set as default adress</label>
              <input
                type="checkbox"
                id="shipping-checkbox"
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
              />
              <div>
                <label htmlFor="both">Set as billing adress</label>
                <input
                  type="checkbox"
                  id="both"
                  checked={checkedBoth}
                  onChange={() => {
                    if (checkedBoth) {
                      setValue2('Belarus');
                      setAdresses2(['', '', '']);
                    } else {
                      setValue2(value);
                      setAdresses2([...adresses]);
                    }
                    setCheckedBoth(!checkedBoth);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="adress-block" id="billing-adress">
            <div className="adress-title">Billing-adress</div>
            {adressArrBilling}
            <label htmlFor="Postal-Code">Postal Code</label>
            {PostalCode('billing')}
            <label htmlFor="billing-country">Country</label>
            <select
              className="registration-input"
              id="billing-country"
              value={value2}
              name="Country"
              onChange={(e) => {
                setValue2(e.target.value);
                setPattern2(COUNTRIES[indexes[e.target.value]].pattern);
                setPlaceholder2(COUNTRIES[indexes[e.target.value]].placeholder);
                if (COUNTRIES[indexes[e.target.value]].reg.test(adresses2[2])) {
                  if (codeInput2.current) codeInput2.current.setCustomValidity('');
                } else {
                  if (codeInput2.current) codeInput2.current.setCustomValidity(codeInfo.msg);
                }
              }}
            >
              {options}
            </select>
            <div>
              <label htmlFor="billing-checkbox">Set as default adress</label>
              <input
                type="checkbox"
                id="billing-checkbox"
                checked={checked2}
                onChange={() => {
                  setChecked2(!checked2);
                }}
              />
            </div>
          </div>
        </div>
        <button className="registration-button" type="submit">
          Register
        </button>
        <div className={classlist}>There is already an existing customer with the provided email.</div>
        <NavLink to="/login">
          <button className="nav-button">Login</button>
        </NavLink>
      </form>
    </div>
  );
}
