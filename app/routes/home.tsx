import { Link, Outlet, json, useLoaderData } from '@remix-run/react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { db } from '~/utils/db.server'
import { formatToIDR } from '~/utils/format'

export const loader = async () => {
  return json({
    budgets: await db.budget.findMany(),
  })
}
export default function TodosRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <div className='max-w-3xl mx-auto px-5 pt-10'>
        <div className='flex justify-between items-center mb-2'>
          <h1 className='text-xl'>Budget App</h1>
          <Link
            to='/home/add'
            className='px-5 py-2.5 rounded-lg bg-teal-800 text-sm text-white'
          >
            Add
          </Link>
        </div>
        <ul className='space-y-4 p-2 border border-gray-100 bg-gray-50 rounded-xl'>
          {data.budgets.map((budget) => (
            <li
              key={budget.id}
              className='flex justify-between px-4 py-1.5 rounded-lg hover:bg-gray-100/90 items-center'
            >
              <Link to={'edit/' + budget.id} className='w-full cursor-pointer'>
                <div>
                  <p className='text-lg font-medium'>{budget.name}</p>
                  <p>{formatToIDR(budget.totalAmount).slice(0, -3)}</p>
                </div>
              </Link>
              <Link
                to={'/home/delete/' + budget.id}
                className='text-red-600 text-2xl p-2 rounded hover:bg-white'
              >
                <MdOutlineDeleteOutline />
              </Link>
            </li>
          ))}
          {data.budgets.length == 0 && (
            <p className='text-gray-600 text-sm py-5 text-center'>
              Data is Empty
            </p>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  )
}
