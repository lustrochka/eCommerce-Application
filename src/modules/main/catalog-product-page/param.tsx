import React from 'react';
import { useParams } from 'react-router-dom';
import { CatalogPage } from './catalogProductPage';

export function Param() {
  const { name } = useParams();
  const param = name ? name : '';
  return <CatalogPage type={param} />;
}
