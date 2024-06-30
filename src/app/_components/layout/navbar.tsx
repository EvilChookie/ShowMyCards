import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/20/solid";
import { Navbar, NavbarSpacer, NavbarSection, NavbarItem } from "../catalyst/navbar";

export default function NavbarContents(): React.ReactNode {
    return (
        <Navbar>
            <NavbarSpacer />
            <NavbarSection>
                <NavbarItem href="/search" aria-label="Search">
                    <MagnifyingGlassIcon />
                </NavbarItem>
                <NavbarItem href="/" aria-label="Inbox">
                    <HomeIcon />
                </NavbarItem>
            </NavbarSection>
        </Navbar>
    );
}