import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/20/solid";
import {
  Navbar,
  NavbarSpacer,
  NavbarSection,
  NavbarItem,
} from "../catalyst/navbar";

/**
 * The navigation is shown in small screen scenarios.
 * It's not the full navigation.
 * For the full navigation, see ./src/app/_components/layout/sidebar.tsx
 */
export default function NavbarContents(): React.ReactNode {
  return (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        <NavbarItem href="/search" aria-label="Search">
          <MagnifyingGlassIcon />
        </NavbarItem>
        <NavbarItem href="/" aria-label="Home">
          <HomeIcon />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
