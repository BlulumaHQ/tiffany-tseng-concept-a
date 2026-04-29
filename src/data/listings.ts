import listing1 from "@/assets/listings/listing-1.jpg";
import listing2 from "@/assets/listings/listing-2.jpg";
import listing3 from "@/assets/listings/listing-3.jpg";
import listing4 from "@/assets/listings/listing-4.jpg";
import listing5 from "@/assets/listings/listing-5.jpg";
import listing6 from "@/assets/listings/listing-6.jpg";
import listing7 from "@/assets/listings/listing-7.jpg";
import listing8 from "@/assets/listings/listing-8.jpg";
import listing9 from "@/assets/listings/listing-9.jpg";

export type Listing = {
  id: string;
  address: string;
  area: string;
  price: string;
  image: string;
  sourceUrl: string;
  href: string;
  isNew?: boolean;
};

export const listings: Listing[] = [
  {
    id: "1",
    address: "5110 Mckee Street, Burnaby",
    area: "South Slope",
    price: "$2,130,000",
    image: listing1,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/6/2/1/108117126/06369b3ed4bd5171440adf51b5d407d5.jpeg",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3094717-5110-mckee-street-burnaby-v5j-2t4.108117126",
  },
  {
    id: "2",
    address: "26 - 6088 Beresford Street, Burnaby",
    area: "Metrotown",
    price: "$1,155,000",
    image: listing2,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/6/4/5/108038546/3205f583ce3efa31f22c286f28ed2441.jpeg",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3091066-26-6088-beresford-street-burnaby-v5j-0g2.108038546",
  },
  {
    id: "3",
    address: "206 - 7123 11th Avenue, Burnaby",
    area: "Edmonds BE",
    price: "$749,000",
    image: listing3,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/2/7/0/107599072/f830da86776be38b0ceb07b30e64f6db.jpeg",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3077393-206-7123-11th-avenue-burnaby-v3n-0j6.107599072",
  },
  {
    id: "4",
    address: "134 - 9718 161A Street, Surrey",
    area: "Fleetwood Tynehead",
    price: "$889,000",
    image: listing4,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/4/3/7/107339734/66d9d2318e1506c3e880cdc7ed348163.jpeg",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3068061-134-9718-161a-street-surrey-v4n-6s7.107339734",
  },
  {
    id: "5",
    address: "1007 - 3489 Ascot Place, Vancouver",
    area: "Collingwood VE",
    price: "$439,000",
    image: listing5,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/9/6/0/107236069/0abf48ac34f12206fb20683aa4ee007e.jpeg",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3063844-1007-3489-ascot-place-vancouver-v5r-6b6.107236069",
  },
  {
    id: "6",
    address: "204 - 5629 Birney Avenue, Vancouver",
    area: "University VW",
    price: "$1,030,000",
    image: listing6,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/0/2/3/108590320/3fe0ac1f133dc05f487ae281238a6346.jpeg",
    href: "https://tiffanytseng.com/recip.html/listing.r3115957-204-5629-birney-avenue-vancouver-v6s-0l5.108590320",
    isNew: true,
  },
  {
    id: "7",
    address: "189 - 4738 Hemlock Way, Tsawwassen",
    area: "Tsawwassen North",
    price: "$999,000",
    image: listing7,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/1/2/8/108590821/d97cee50423a3a5e08d4add37dd91db8.jpeg",
    href: "https://tiffanytseng.com/recip.html/listing.r3116029-189-4738-hemlock-way-tsawwassen-v4m-0e3.108590821",
    isNew: true,
  },
  {
    id: "8",
    address: "544 Garfield Street, New Westminster",
    area: "The Heights NW",
    price: "$1,395,000",
    image: listing8,
    sourceUrl: "http://s3.amazonaws.com/mrp-listings/3/3/8/108591833/b66b028910466d7b2b397de5a3c8baa3.jpeg",
    href: "https://tiffanytseng.com/recip.html/listing.r3116101-544-garfield-street-new-westminster-v3l-4a7.108591833",
    isNew: true,
  },
  {
    id: "9",
    address: "15 - 5771 Irmin Street, Burnaby",
    area: "Metrotown",
    price: "$999,000",
    image: listing9,
    sourceUrl: "https://tiffanytseng.com/wps/rest/63404/l/108591866/image/first",
    href: "https://tiffanytseng.com/recip.html/listing.r3116055-15-5771-irmin-street-burnaby-v5j-0c5.108591866",
    isNew: true,
  },
];
