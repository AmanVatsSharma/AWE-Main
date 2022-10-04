import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ModeToggle } from "../ui/modeToggler";
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from "@/components/ui/button"

type Props = {};

export const Drawer = (props: Props) => {
  return (
    <div className="Drawer absolute left-0">
      <Sheet>
        <SheetTrigger>
          <MenuIcon color="primary" fontSize="large" />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="w-full h-full ">
            <div className="topIconBar flex justify-between">

              <ModeToggle />

              <Button variant="outline" size="icon">
                <CallIcon />
              </Button>

              <Button variant="outline" size="icon">
                <WhatsAppIcon />
              </Button>
            </div>

          </div>
        </SheetContent>
      </Sheet>
    </div >
  );
};

export const AccountsDrawer = (props: Props) => {
  return (
    <div className="Drawer flex items-center justify-center absolute right-0 gap-2">
      <div className="cart">
        <Sheet>
          <SheetTrigger>
            <LocalMallOutlinedIcon color="primary" fontSize="large" />
          </SheetTrigger>
          <SheetContent side="right">Hello, this is your cart</SheetContent>
        </Sheet>
      </div>
      <div className="accounts">
        <Sheet>
          <SheetTrigger>
            <PersonOutlinedIcon color="primary" fontSize="large" />
          </SheetTrigger>
          <SheetContent side="right">Hello, this is your accounts</SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
