// components/Total.tsx

import React from 'react';
import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Total number of exercises {totalExercises}</p>;
};

export default Total;
