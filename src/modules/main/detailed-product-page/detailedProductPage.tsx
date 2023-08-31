import React, { useState } from 'react';
import { useParams } from 'react-router';

export function DetailedPage() {
  const { id } = useParams();
  return <div>{id}</div>;
}
