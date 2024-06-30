import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/20/solid";
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarLabel, SidebarBody, SidebarSpacer } from "../catalyst/sidebar";
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
                        <SidebarLabel>Home</SidebarLabel>
                    </SidebarItem>
                </SidebarSection>
                {/* <SidebarSpacer />
                <SidebarSection>
                    <SidebarItem href="https://github.com/EvilChookie/ShowMyCards">
                        <GithubIcon />
                        <SidebarLabel>GitHub</SidebarLabel>
                    </SidebarItem>
                </SidebarSection> */}
            </SidebarBody>
        </Sidebar>
    );
}