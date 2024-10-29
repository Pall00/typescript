
import React from 'react';
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled part type: ${JSON.stringify(value)}`);
  };

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>
            Submit to: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );
      case 'special':
        return (
          <div>
            <h3>
              {part.name} {part.exerciseCount}
            </h3>
            <p>{part.description}</p>
            <p>Requirements: {part.requirements.join(', ')}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
};

export default Part;
