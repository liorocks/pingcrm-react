import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import Icon from '@/Shared/Icon';

interface MainMenuItemProps {
  icon: string;
  link: string;
  text: string;
}

export default function MainMenuItem({ icon, link, text }: MainMenuItemProps) {
  const isActive = route().current(link + '*');

  const iconClasses = classNames('w-4 h-4 mr-2', {
    'text-white fill-current': isActive,
    'text-indigo-400 group-hover:text-white fill-current': !isActive
  });

  const textClasses = classNames({
    'text-white': isActive,
    'text-indigo-200 group-hover:text-white': !isActive
  });

  return (
    <div className="mb-4">
      <Link href={route(link)} className="flex items-center group py-3">
        <Icon name={icon} className={iconClasses} />
        <div className={textClasses}>{text}</div>
      </Link>
    </div>
  );
}
