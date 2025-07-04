import Button from "@/components/button";
import { InvitationResponse } from "@/types/types";
import { cn } from "@/utils/cn";
import { Trash } from "lucide-react";

export default function InviteStatusCard({
  invite,
  updateInvitationStatus,
}: {
  invite: InvitationResponse;
  updateInvitationStatus: (id: number, status: string) => void;
}) {
  return (
    <div className="border border-gray-600 rounded-md px-4 py-2 w-fit">
      <p className="py-2">
        Invited {invite.email} to join your group {invite.groupName}
      </p>
      <span
        className={cn(
          "mt-2 px-2 py-1 border rounded-2xl",
          { "text-gray-300  border-gray-300": invite.status === "PENDING" },
          { "text-green-500  border-green-500": invite.status === "ACCEPTED" },
          { "text-red-500  border-red-500 ": invite.status === "DECLINED" },
          { "text-red-800  border-red-800": invite.status === "CANCELLED" }
        )}
      >
        {invite.status}
      </span>
      {invite.status === "PENDING" && (
        <Button
          variant="destructive"
          onClick={() => updateInvitationStatus(invite.id, "CANCELLED")}
        >
          <Trash />
          Cancel
        </Button>
      )}
    </div>
  );
}
