import { Link, useRouteMatch } from "react-router-dom";
interface Props {
  label:any,
  to:string,
  activeOnlyWhenExact:boolean
}

export function CustomLink({ label, to, activeOnlyWhenExact }:Props) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={match ? "activeLink" : "noActive"}>
     
      <Link to={to}>{label}</Link>
    </div>
  );
}