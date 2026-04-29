export type Listing = {
  id: string;
  address: string;
  area: string;
  price: string;
  image: string;
  href: string;
  isNew?: boolean;
};

export const listings: Listing[] = [
  {
    id: "1",
    address: "5110 Mckee Street, Burnaby",
    area: "South Slope",
    price: "$2,130,000",
    image: "https://iss-cdn.myrealpage.com/g8GHXnIQfXwTndFIvZdv2yYQprGXZ6JNq5382gGlYyU/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzYvMi8xLzEwODExNzEyNi8wNjM2OWIzZWQ0YmQ1MTcxNDQwYWRmNTFiNWQ0MDdkNS5qcGVn",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3094717-5110-mckee-street-burnaby-v5j-2t4.108117126",
  },
  {
    id: "2",
    address: "26 - 6088 Beresford Street, Burnaby",
    area: "Metrotown",
    price: "$1,155,000",
    image: "https://iss-cdn.myrealpage.com/Tcw6tcIIz8FY8gq-rUY3z78ASWyWhRegAEVIdpt2rpU/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzYvNC81LzEwODAzODU0Ni8zMjA1ZjU4M2NlM2VmYTMxZjIyYzI4NmYyOGVkMjQ0MS5qcGVn",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3091066-26-6088-beresford-street-burnaby-v5j-0g2.108038546",
  },
  {
    id: "3",
    address: "206 - 7123 11th Avenue, Burnaby",
    area: "Edmonds BE",
    price: "$749,000",
    image: "https://iss-cdn.myrealpage.com/3l_eTS65qcw4Dw26Uxe3g9r_DGaxTJZgh1sBEa9IR64/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzIvNy8wLzEwNzU5OTA3Mi9mODMwZGE4Njc3NmJlMzhiMGNlYjA3YjMwZTY0ZjZkYi5qcGVn",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3077393-206-7123-11th-avenue-burnaby-v3n-0j6.107599072",
  },
  {
    id: "4",
    address: "134 - 9718 161A Street, Surrey",
    area: "Fleetwood Tynehead",
    price: "$889,000",
    image: "https://iss-cdn.myrealpage.com/YoXKdGgMXoUV3xiSjUsbo3Zr-QA9AeUlsD1RnI6tSpc/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzQvMy83LzEwNzMzOTczNC82NmQ5ZDIzMThlMTUwNmMzZTg4MGNkYzdlZDM0ODE2My5qcGVn",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3068061-134-9718-161a-street-surrey-v4n-6s7.107339734",
  },
  {
    id: "5",
    address: "1007 - 3489 Ascot Place, Vancouver",
    area: "Collingwood VE",
    price: "$439,000",
    image: "https://iss-cdn.myrealpage.com/PsGyHGAbFjBbw5F5xBKk8ifKjMP6dzSDNdYMabQpPdY/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzkvNi8wLzEwNzIzNjA2OS8wYWJmNDhhYzM0ZjEyMjA2ZmIyMDY4M2FhNGVlMDA3ZS5qcGVn",
    href: "https://tiffanytseng.com/mylistings.html/listing.r3063844-1007-3489-ascot-place-vancouver-v5r-6b6.107236069",
  },
  {
    id: "6",
    address: "204 - 5629 Birney Avenue, Vancouver",
    area: "University VW",
    price: "$1,030,000",
    image: "https://iss-cdn.myrealpage.com/OWlutMUBQcDJQ6gMOjOaGmDtcYB1PRhRbNKyA7THurw/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzAvMi8zLzEwODU5MDMyMC8zZmUwYWMxZjEzM2RjMDVmNDg3YWUyODEyMzhhNjM0Ni5qcGVn",
    href: "https://tiffanytseng.com/recip.html/listing.r3115957-204-5629-birney-avenue-vancouver-v6s-0l5.108590320",
    isNew: true,
  },
  {
    id: "7",
    address: "189 - 4738 Hemlock Way, Tsawwassen",
    area: "Tsawwassen North",
    price: "$999,000",
    image: "https://iss-cdn.myrealpage.com/a8PaFRTSctgaYtJgyjrPKmKXwMh6tYrTUm6hBh_rqM0/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzEvMi84LzEwODU5MDgyMS9kOTdjZWU1MDQyM2EzYTVlMDhkNGFkZDM3ZGQ5MWRiOC5qcGVn",
    href: "https://tiffanytseng.com/recip.html/listing.r3116029-189-4738-hemlock-way-tsawwassen-v4m-0e3.108590821",
    isNew: true,
  },
  {
    id: "8",
    address: "544 Garfield Street, New Westminster",
    area: "The Heights NW",
    price: "$1,395,000",
    image: "https://iss-cdn.myrealpage.com/Cy1T7tB2js-qqIqz5FViL5PhznEkDm65RpSq-4_HeTQ/rs:auto:800:0:0/g:sm/aHR0cDovL3MzLmFtYXpvbmF3cy5jb20vbXJwLWxpc3RpbmdzLzMvMy84LzEwODU5MTgzMy9iNjZiMDI4OTEwNDY2ZDdiMmIzOTdkZTVhM2M4YmFhMy5qcGVn",
    href: "https://tiffanytseng.com/recip.html/listing.r3116101-544-garfield-street-new-westminster-v3l-4a7.108591833",
    isNew: true,
  },
];
