import { UserButton } from "@clerk/nextjs";
const UserButtonComponent = () => {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier:
            "text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors",
        },
      }}
    />
  );
};

export default UserButtonComponent;
