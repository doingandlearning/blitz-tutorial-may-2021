import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateChoice = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateChoice),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const choice = await db.choice.update({
      where: { id },
      data: { votes: { increment: 1 } },
    })

    return choice
  }
)
