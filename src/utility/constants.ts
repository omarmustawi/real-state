export interface Advertisement {
  id: number;
  address: string;
  adviser: number;
  city: string;
  date: Date;
  description: string;
  images: string;
  is_alive: boolean;
  num_room: number;
  phone: string;
  price: number;
  space: number;
  type_deal: boolean;
  type_property: number;
  favorite_users: number[];
}

export const typePropertyClasses = ["شقة", "محل تجاري", "فيلا"];
export function getTypeDealText(advertisment: Advertisement): string {
  return advertisment?.type_deal ? "للبيع" : "للأجار";
}
