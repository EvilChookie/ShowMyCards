import {
  MagnifyingGlassIcon,
  HomeIcon,
  BookOpenIcon,
  TableCellsIcon,
  CogIcon,
  InboxStackIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  SidebarBody,
  SidebarSpacer,
  SidebarFooter,
} from "../catalyst/sidebar";
import GithubIcon from "../icons/github";

export default function SidebarContents(): React.ReactNode {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSection className="max-lg:hidden">
          <SidebarItem href="/search">
            <MagnifyingGlassIcon />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href="/">
            <HomeIcon />
            <SidebarLabel>Dashboard</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/collection/">
            <BookOpenIcon />
            <SidebarLabel>Your Collection</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/decks/">
            <TableCellsIcon />
            <SidebarLabel>Your Decks</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/storage/">
            <InboxStackIcon />
            <SidebarLabel>Storage Locations</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/rules/">
            <ArrowsRightLeftIcon />
            <SidebarLabel>Storage Rules</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/settings/">
            <CogIcon />
            <SidebarLabel>Settings</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter>
        <SidebarSection>
          <SidebarItem href="https://github.com/EvilChookie/ShowMyCards">
            <GithubIcon />
            <SidebarLabel>GitHub</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarFooter>
    </Sidebar>
  );
}
