import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';

const PageLink = ({ active, label, url }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-4 py-3',
      'border rounded',
      'text-sm',
      'hover:bg-white',
      'focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-white': active,
      'ml-auto': label === 'Next'
    }
  );
  return (
    <InertiaLink className={className} href={url}>
      {label}
    </InertiaLink>
  );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
  const className = classNames(
    'mr-1 mb-1 px-4 py-3 text-sm border rounded text-gray',
    {
      'ml-auto': label === 'Next'
    }
  );
  return <div className={className}>{label}</div>;
};

export default ({ links = [] }) => {
  // dont render, if there's only 1 page (previous, 1, next)
  if (links.length === 3) return null;
  return (
    <div className="mt-6 -mb-1 flex flex-wrap">
      {links.map(({ active, label, url }) => {
        return url === null ? (
          <PageInactive key={label} label={label} />
        ) : (
          <PageLink key={label} label={label} active={active} url={url} />
        );
      })}
    </div>
  );
};
