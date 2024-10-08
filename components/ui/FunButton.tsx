import Link from "next/link"
import { Button } from "./button"

export const FunButton = ({ icon }: { icon?: string }) => {
  return (
    <div className="my-4">
      <Button type="button" asChild className="fun-btn" size='lg'>
        <Link href="https://www.menti.com/blocegxmvv1v" target="_blank">
          Let's partyyy! {icon}
        </Link>
      </Button>
    </div>
  )
}