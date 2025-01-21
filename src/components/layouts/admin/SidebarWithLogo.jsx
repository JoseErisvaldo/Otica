import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Alert,
  Avatar,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  HomeIcon,

} from "@heroicons/react/24/solid";
import {

  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navListItems = [
  { label: "Home", icon: HomeIcon, link: "/admin/home" },
  { label: "Clientes", icon: UserCircleIcon, link: "/admin/clientes" },
  { label: "Médico", icon: UserCircleIcon, link: "/admin/medico" },
  { label: "Fornecedores", icon: UserCircleIcon, link: "/admin/suppliers" },
  { label: "Produtos", icon: UserCircleIcon, link: "/admin/products" },
  { label: "Agendamentos", icon: UserCircleIcon, link: "/admin/appointmentsProducts" },
  { label: "Movimentos do estoque", icon: UserCircleIcon, link: "/admin/stockmovements" },
];

const profileMenuItems = [
  { label: "My Profile", icon: UserCircleIcon },
  { label: "Edit Profile", icon: Cog6ToothIcon },
  { label: "Inbox", icon: InboxArrowDownIcon },
  { label: "Help", icon: LifebuoyIcon },
  { label: "Sign Out", icon: PowerIcon },
];

export function SidebarWithLogo() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const isOpening = !prev;
      document.body.style.overflow = isOpening ? "hidden" : "auto";
      return isOpening;
    });
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={toggleDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer} className="w-64">
        <Card color="transparent" shadow={false} className="h-full p-4">
          <div className="flex items-center gap-4 p-4">
            <Avatar
              size="lg"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Profile"
            />
            <Typography variant="h5" color="blue-gray">
              User Name
            </Typography>
          </div>

          <List>
            {navListItems.map(({ label, icon, link }, index) => (
              <ListItem key={index} className="hover:bg-gray-100">
                <ListItemPrefix>
                  {React.createElement(icon, { className: "h-6 w-6" })}
                </ListItemPrefix>
                <a href={link} className="text-blue-gray-800">
                  {label}
                </a>
              </ListItem>
            ))}
          </List>

          <div className="mt-auto">
            <Typography variant="small" color="blue-gray" className="p-4">
              Profile Menu
            </Typography>
            <List>
              {profileMenuItems.map(({ label, icon }, index) => (
                <ListItem key={index} className="hover:bg-gray-100">
                  <ListItemPrefix>
                    {React.createElement(icon, { className: "h-5 w-5" })}
                  </ListItemPrefix>
                  {label}
                </ListItem>
              ))}
            </List>
          </div>
        </Card>
      </Drawer>

      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </>
  );
}
