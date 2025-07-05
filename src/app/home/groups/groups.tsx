'use client';
import { Group, NewGroup } from "@/types/types";
import GroupComponent from "./group";
import { useToast } from "@/components/toast/useToast";
import useFetchClient from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";
import { Plus } from "lucide-react";
import NewGroupModal from "./newGroupModal";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type GroupProps = {
    groups: Group[]
}

export default function Groups({groups}: GroupProps){
    const [showModal, setShowModal] = useState(false);
      const toast = useToast();
      const fetchClient = useFetchClient();
      const router = useRouter();
      const handleAddGroup = async (data: NewGroup) => {
          const response = await fetchClient(`${BASE_URL}/groups/`, {
            method: "POST",
            body: JSON.stringify(data),
          });
          if (response?.ok) {
            toast("group created successfully");
            setTimeout(() => {
              setShowModal(false);
            }, 2000)
            router.refresh();
          }
        };
    return <>
    <Button variant="primary" className="flex gap-2 items-center"
    onClick={() => setShowModal(true)}
    ><Plus size={16}/>New Group</Button>
        <ul>
          {groups?.map((group: Group) => (
            <GroupComponent {...group} key={group.id}/>
          ))}
        </ul>
        <NewGroupModal 
         isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddGroup}
        />
    </>
}