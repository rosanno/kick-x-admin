import { prisma } from "@/lib/prisma";
import { Profile } from "./_components/profile";
import { PersonalInformation } from "./_components/personal-information";

const ProfilePage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const profile = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <>
      <Profile userId={params.userId} user={profile} />
      <PersonalInformation
        userId={params.userId}
        firstName={profile?.firstName}
        lastName={profile?.lastName}
        email={profile?.email}
        phone={profile?.phoneNumber}
        address={profile?.address}
        role={profile?.role}
      />
    </>
  );
};

export default ProfilePage;
