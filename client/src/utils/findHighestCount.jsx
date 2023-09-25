import { useSelector } from "react-redux";

export function FindCategoryWithHighestCount() {
  const user = useSelector((state) => state.user.user);

  let highestCategory = null;
  let highestCount = -1;
  for (const preference of user?.preferences) {
    if (preference.count > highestCount) {
      highestCategory = preference.category;
      highestCount = preference.count;
    }
  }

  return highestCategory;
}
