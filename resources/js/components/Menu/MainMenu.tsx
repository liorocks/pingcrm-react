import MainMenuItem from '@/components/Menu/MainMenuItem';

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Organizations" link="organizations" icon="office" />
      <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
    </div>
  );
}
