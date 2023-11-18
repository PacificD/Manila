import { Moon, Sun, Home, Menu as MenuIcon, AirVent } from "lucide-react"
import { useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export default function Menu() {
  const { setTheme } = useTheme()
  const navigate = useNavigate()
  const gotoHomePage = () => {
    navigate('/home')
  }

  return (
    <div className="fixed top-4 right-4 z-10">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={gotoHomePage}>
            <Home className="h-[1.2rem] w-[1.2rem]" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setTheme("light")}>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setTheme("dark")}>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setTheme("system")}>
            <AirVent className="h-[1.2rem] w-[1.2rem]" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
