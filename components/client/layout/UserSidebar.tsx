import SidebarConfig from "./SidebarConfig";

export default async function UserSidebar(
  { children }: { children: React.ReactNode })
{
  return(
    <>
      <section>
        <section className="drawer drawer-open">
          <section className="drawer-toggle"/>
          <section className="drawer-content mt-[1.5rem] py-[1rem]">
            <section>{children}</section>
          </section>

          <section className="drawer-side">
            <section className="block h-screen bg-gray-200">
              <ul className="menu p-4">
                <SidebarConfig/>
              </ul>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}