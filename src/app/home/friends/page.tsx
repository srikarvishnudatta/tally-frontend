import Button from "@/components/button";
import { InvitationResponse, InvitationStatusType } from "@/types/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Check, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import InviteStatusCard from "./invitationCard";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type InviteResponse = {
  sentInvitations: InvitationResponse[];
  receivedInvitations: InvitationResponse[];
};

async function fetchInvites(): Promise<InviteResponse> {
  const response = await fetchWithAuth(`${BASE_URL}/invites/`, {
    cache: "no-store",
  });
  return await response.json();
}
async function updateInvite(data: InvitationStatusType) {
  return await fetchWithAuth(`${BASE_URL}/invites/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

async function Page() {
  const invites = await fetchInvites();
  async function updateInvitationStatus(id: number, status: string) {
    const response = await updateInvite({ id, status });
    if (response.ok) {
      revalidatePath("/home/friends");
    }
  }
  return (
    <section className="max-w-4xl mx-auto mt-4">
      <div className="">
        <h1 className="text-3xl font-bold">Invitations</h1>
        <p className="text-sm text-gray-200">
          You can view all your invitations.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Invites Received</h2>
        {invites?.receivedInvitations.length === 0 && <p>No new invitations</p>}
        {invites?.receivedInvitations.map((invite) => (
          <div
            key={invite.id}
            className="border border-gray-600 rounded-md px-4 py-2 w-fit"
          >
            <p>
              {invite.email} wants you to join: {invite.groupName}
            </p>
            <div className="flex gap-2 py-2 items-center">
              <Button
                className="bg-red-500 hover:bg-red-400"
                onClick={() => updateInvitationStatus(invite.id, "DECLINED")}
              >
                <X />
                Decline
              </Button>
              <Button
                onClick={() => updateInvitationStatus(invite.id, "ACCEPTED")}
              >
                <Check />
                Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Invites Sent</h2>
        {invites?.sentInvitations.map((invite) => (
          <InviteStatusCard
            key={invite.id}
            invite={invite}
            updateInvitationStatus={updateInvitationStatus}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
