import { useRouter } from "next/navigation";

export const useRouting = () => {
  const router = useRouter();
  const pushToPage = (page: string) => {
    router.push(page);
  };

  return { pushToPage };
};

export default useRouting;
