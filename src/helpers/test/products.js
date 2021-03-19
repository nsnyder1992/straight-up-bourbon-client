//test images
import TruckerHat_Black from "../../components/images/TruckerHat_Black-min.JPG";
import TruckerHat_LightGrey from "../../components/images/TruckerHat_LightGrey-min.JPG";
import TruckerHat_DarkGrey from "../../components/images/TruckerHat_DarkGrey-min.JPG";
import TruckerHat_Navy from "../../components/images/TruckerHat_Navy-min.JPG";
import StraightUpGlass from "../../components/images/StraightUpGlass-min.JPG";

export const PRODUCTS = [
  {
    id: 1,
    name: "Trucker Hat - Black",
    type: "hat",
    color: "black",
    sizes: ["small", "medium", "large"],
    stock: {
      total: 35,
      bySize: {
        small: 10,
        medium: 20,
        large: 5,
      },
    },
    description: {
      main: "Black Trucker Hat with logo",
      points: ["100% cool", "No bull"],
    },
    cost: 25.0,
    img: TruckerHat_Black,
  },
  {
    id: 2,
    name: "Trucker Hat - Light Grey",
    type: "hat",
    color: "light-grey",
    sizes: ["small", "medium", "large"],
    stock: {
      total: 35,
      bySize: {
        small: 10,
        medium: 20,
        large: 5,
      },
    },
    description: {
      main: "Light Grey Trucker Hat with logo",
      points: ["100% cool", "No bull"],
    },
    cost: 25.0,
    img: TruckerHat_LightGrey,
  },
  {
    id: 3,
    name: "Trucker Hat - Dark Grey",
    type: "hat",
    color: "dark-grey",
    sizes: ["small", "medium", "large"],
    stock: {
      total: 35,
      bySize: {
        small: 10,
        medium: 20,
        large: 5,
      },
    },
    description: {
      main: "Dark Grey Trucker Hat with logo",
      points: ["100% cool", "No bull"],
    },
    cost: 25.0,
    img: TruckerHat_DarkGrey,
  },
  {
    id: 4,
    name: "Trucker Hat - Navy",
    type: "hat",
    color: "navy",
    sizes: ["small", "medium", "large"],
    stock: {
      total: 35,
      bySize: {
        small: 10,
        medium: 20,
        large: 5,
      },
    },
    description: {
      main: "Navy Trucker Hat with logo",
      points: ["100% cool", "No bull"],
    },
    cost: 25.0,
    img: TruckerHat_Navy,
  },
  {
    id: 5,
    name: "Rocks Glass - Frosted Logo",
    type: "glassware",
    color: "Frosted Logo",
    sizes: [],
    stock: {
      total: 5,
      bySize: {},
    },
    description: {
      main: "Rocks Glass with frosted logo",
      points: ["100% cool", "No bull"],
    },
    cost: 15.0,
    img: StraightUpGlass,
  },
];
