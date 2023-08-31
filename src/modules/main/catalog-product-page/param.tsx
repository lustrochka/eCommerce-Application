import React from 'react';
import { useParams } from 'react-router-dom';
import { CatalogPage } from './catalogProductPage';

export function Param() {
  const { category } = useParams();
  const param = category ? category : '';
  return <CatalogPage type={param} />;
}
