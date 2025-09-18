import { atom } from "recoil";
export const $baseURL= atom({
 key:"$baseURL",
 default:"http://localhost:1337/",   
});
export const $cart = atom({
  key:"$cart",
  default:[],
});