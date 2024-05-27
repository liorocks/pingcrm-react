import { Link } from '@inertiajs/react';
import classNames from 'classnames';

interface PaginationProps {
  links: PaginationItem[];
}

export default function Pagination({ links = [] }: PaginationProps) {
  /**
   * If there are only 3 links, it means there are no previous or next pages.
   * So, we don't need to render the pagination.
   */
  if (links.length === 3) return null;

  return (
    <div className="flex flex-wrap mt-6 -mb-1">
      {links?.map(link => {
        return link?.url === null ? (
          <PageInactive key={link.label} label={link.label} />
        ) : (
          <PaginationItem key={link.label} {...link} />
        );
      })}
    </div>
  );
}

interface PaginationItem {
  url: null | string;
  label: string;
  active: boolean;
}

function PaginationItem({ active, label, url }: PaginationItem) {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-4 py-3',
      'border border-solid border-gray-300 rounded',
      'text-sm',
      'hover:bg-white',
      'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-white': active
    }
  );

  /**
   * Note: In general you should be aware when using `dangerouslySetInnerHTML`.
   *
   * In this case, `label` from the API is a string, so it's safe to use it.
   * It will be either `&laquo; Previous` or `Next &raquo;`
   */
  return (
    <Link className={className} href={url as string}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </Link>
  );
}

function PageInactive({ label }: Pick<PaginationItem, 'label'>) {
  const className = classNames(
    'mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray'
  );

  /**
   * Note: In general you should be aware when using `dangerouslySetInnerHTML`.
   *
   * In this case, `label` from the API is a string, so it's safe to use it.
   * It will be either `&laquo; Previous` or `Next &raquo;`
   */
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: label }} />
  );
}
