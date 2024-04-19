import { json, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

export const loader = async () => {
  return json({
    budgets: await db.budget.findMany(),
  })
}
export default function TodosRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <ul>
        {data.budgets.map((budget) => (
          <li key={budget.id}>
            {budget.name} amount: {budget.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  )
}
