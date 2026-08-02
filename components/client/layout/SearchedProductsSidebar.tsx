import SearchbarConfig from "./SearchbarConfig";

export default function SearchedProductsSidebar()
{
  return(
    <>
      <section>
        <section className="drawer drawer-open">
          <section className="drawer-toggle"/>
            <section className="drawer-side">
              <section className="block w-[20rem] h-screen bg-gray-200">
                <ul className="menu p-4">
                  <SearchbarConfig/>
                </ul>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}