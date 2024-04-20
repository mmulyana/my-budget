import { ActionFunction, redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import useOutsideClick from '~/hook/use-outside-click'
import { db } from '~/utils/db.server'

export const action: ActionFunction = async ({ params }) => {
  console.log(params)
  await db.budget.delete({
    where: {
      id: parseInt(params.id as string),
    },
  })

  return redirect('/home')
}

export default function EditRoute() {
  const navigate = useNavigate()

  const modalRef = useOutsideClick({
    callback: () => navigate('/home'),
  })
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/10'>
      <div
        ref={modalRef}
        className='absolute top-1/2 left-1/2 max-w-full w-[420px] bg-white -translate-x-1/2 -translate-y-1/2 px-5 py-6 rounded-xl'
      >
        <p className='text-center text-lg mb-4'>Are you sure delete this?</p>
        <form method='post' className='w-full grid grid-cols-2 gap-4 rounded'>
          <button
            type='button'
            onClick={() => navigate('/home')}
            className='px-4 py-2.5 w-full bg-gray-100'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2.5 w-full bg-red-600 rounded text-white'
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}
