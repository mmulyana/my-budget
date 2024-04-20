import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import useOutsideClick from '~/hook/use-outside-click'
import { db } from '~/utils/db.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const totalAmount = formData.get('totalAmount') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string

  await db.budget.create({
    data: {
      name,
      totalAmount: parseInt(totalAmount),
      description,
      startDate,
      endDate,
    },
  })

  return redirect('/home')
}

export default function AddFormRoute() {
  const navigate = useNavigate()

  const modalRef = useOutsideClick({
    callback: () => navigate('/home'),
  })
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/10'>
      <div ref={modalRef} className='modal'>
        <div className='w-[500px] h-[calc(100vh-20px)] bg-white rounded-lg'>
          <form method='post'>
            <div className='flex flex-col gap-8 p-8'>
              <div>
                <label className='block mb-0.5' htmlFor='name'>
                  Name
                </label>
                <input
                  name='name'
                  id='name'
                  className='bg-gray-100 px-1.5 py-1.5 text-sm w-full rounded'
                />
              </div>
              <div>
                <label className='block mb-0.5' htmlFor='description'>
                  Description
                </label>
                <textarea
                  name='description'
                  className='bg-gray-100 px-1.5 py-1.5 text-sm w-full rounded'
                />
              </div>
              <div>
                <label className='block mb-0.5' htmlFor='totalAmount'>
                  Total Amount
                </label>
                <input
                  name='totalAmount'
                  type='number'
                  className='bg-gray-100 px-1.5 py-1.5 text-sm w-full rounded'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-0.5' htmlFor='startDate'>
                    Start Date
                  </label>
                  <input
                    name='startDate'
                    id='startDate'
                    type='date'
                    className='bg-gray-100 px-1.5 py-1.5 text-sm w-full rounded'
                  />
                </div>
                <div>
                  <label className='block mb-0.5' htmlFor='endDate'>
                    End Date
                  </label>
                  <input
                    id='endDate'
                    name='endDate'
                    type='date'
                    className='bg-gray-100 px-1.5 py-1.5 text-sm w-full rounded'
                  />
                </div>
              </div>
              <button className='bg-emerald-500 text-gray-900 py-2 rounded'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
