"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mx-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save Now
        </Button>
      )}
    </>
  );
};

export const StripeSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mx-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Buy Now
        </Button>
      )}
    </>
  );
};

export const SubscriptionButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mx-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          View Details
        </Button>
      )}
    </>
  );
};

export const NoteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mx-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save Now
        </Button>
      )}
    </>
  );
};

export const TrashButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit" variant="destructive">
          <Loader2 className="mx-2 size-4 animate-spin" />
        </Button>
      ) : (
        <Button className="w-fit" type="submit" variant="destructive">
          <Trash className="size-5" />
        </Button>
      )}
    </>
  );
};
