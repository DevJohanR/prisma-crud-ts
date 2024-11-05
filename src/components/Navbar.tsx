import Link from "next/link"

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">

<h3 className="text-2xl font-bold">
    NextCRUD
</h3>
<ul>
    <li>
        <Link href="/new" className="text-slate-200 hover:bg-slate-100">
        New
        </Link>
    </li>
</ul>

    </nav>
  )
}

export default Navbar