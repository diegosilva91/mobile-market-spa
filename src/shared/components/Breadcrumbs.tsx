import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  pathname: string;
};

export function Breadcrumbs({ pathname }: BreadcrumbsProps) {
  const isProductDetail = /^\/products\/[^/]+/.test(pathname);

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Listado</Link>
        </li>
        {isProductDetail ? (
          <>
            <li className="breadcrumbs__separator" aria-hidden="true">
              /
            </li>
            <li aria-current="page">Detalle</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
