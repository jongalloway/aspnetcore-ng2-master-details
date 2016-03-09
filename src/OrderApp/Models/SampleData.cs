using Microsoft.Data.Entity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Collections.Generic;

namespace OrderApp.Models
{
    public static class SampleData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<OrdersContext>();
            context.Database.Migrate();

            var random = new Random();

            if (!context.Products.Any())
            {
                var products = new Product[]
                {
                    new Product() { Name = "Hammer", Price = random.Next(0, 100) },
                    new Product() { Name = "Drill", Price = random.Next(0, 100) },
                    new Product() { Name = "Ladder", Price = random.Next(0, 100) },
                    new Product() { Name = "Nail", Price = random.Next(0, 100) },
                    new Product() { Name = "Saw", Price = random.Next(0, 100) },
                    new Product() { Name = "Scissor", Price = random.Next(0, 100) },
                    new Product() { Name = "Brush", Price = random.Next(0, 100) },
                    new Product() { Name = "Wrench", Price = random.Next(0, 100) }
                };

                context.Products.AddRange(products);

                var address = new string[] {
                    "1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US",
                    "3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA",
                    "3235 High Forest, Glen Campbell, MS, 39035-6845, US",
                    "2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US",
                    "2722 Hazy Turnabout, Burnt Cabins, NY, 14120-5642, US",
                    "6686 Lazy Ledge, Two Rock, CA, 92639-3020, US",
                    "2000 Dewy Limits, Wacahoota, NF, A4L-2V9, CA",
                    "7710 Noble Pond Avenue, Bolivia, RI, 02931-1842, US",
                    "3452 Sunny Vale, Pyro, ON, M8V-4Z0, CA",
                    "4402 Dusty Cove, Many Farms, UT, 84853-8223, US",
                    "5198 Silent Parade, Round Bottom, MD, 21542-9798, US",
                    "8550 Shady Moor, Kitty Fork, CO, 80941-6207, US",
                    "2131 Old Dell, Merry Midnight, AK, 99906-8842, US",
                    "7390 Harvest Crest, Mosquito Crossing, RI, 02957-6116, US",
                    "874 Little Point, Hot Coffee, BC, V3U-2P6, CA",
                    "8834 Stony Pioneer Heights, Newlove, OR, 97419-8670, US",
                    "9829 Grand Beach, Flint, UT, 84965-9900, US",
                    "3799 Cozy Blossom Ramp, Ptarmigan, MS, 38715-0313, US",
                    "3254 Silver Island Loop, Maunaloa, DE, 19869-3169, US",
                    "1081 Middle Wood, Taylors Gut Landing, OR, 97266-2873, US",
                    "1137 Umber Trail, Shacktown, NW, X3U-5Y8, CA",
                    "9914 Hidden Bank, Wyoming, MO, 64635-9665, US",
                    "7080 Misty Nectar Townline, Coward, AB, T9U-3N4, CA",
                    "1184 Wishing Grounds, Vibank, NW, X7D-0V9, CA",
                    "126 Easy Pointe, Grandview Beach, KY, 40928-9539, US",
                    "6683 Colonial Street, Swan River, BC, V1A-9I8, CA",
                    "960 Gentle Oak Lane, Shakopee, ND, 58618-6277, US",
                    "6918 Cotton Pine Corner, Kenaston, IA, 52165-3975, US",
                    "2368 Burning Woods, Ernfold, NY, 11879-9186, US",
                    "5646 Quiet Shadow Chase, Tiger Tail, IA, 52283-5537, US",
                    "5466 Foggy Mountain Dale, Sweet Home, MT, 59738-0251, US",
                    "5313 Clear Willow Route, Amazon, BC, V0S-2S6, CA",
                    "7000 Pleasant Autoroute, Spaceport City, UT, 84749-2448, US",
                    "8359 Quaking Anchor Road, Gross, BC, V9O-0H5, CA",
                    "5143 Amber Deer Hollow, New Deal, ND, 58446-0853, US",
                    "6230 Jagged Bear Key, Young, AR, 72337-3811, US",
                    "7207 Heather Vista, Devon, WY, 82520-1771, US",
                    "9416 Red Rise Place, Spraytown, OK, 73809-4766, US",
                    "3770 Golden Horse Diversion, Yelland, IL, 60471-1487, US",
                    "4819 Honey Treasure Park, Alaska, NB, E1U-3I0, CA",
                    "6187 Round Front, Land O Lakes, AK, 99873-6403, US",
                    "9218 Crystal Highway, Pickelville, MT, 59847-9299, US",
                    "6737 Bright Quay, Lazy Mountain, KY, 42390-4772, US",
                    "237 Merry Campus, Twentysix, SC, 29330-4909, US",
                    "446 Fallen Gate Rise, Petrolia, SC, 29959-9527, US",
                    "2347 Indian Boulevard, Frisbee, VA, 23797-6458, US",
                    "365 Emerald Grove Line, Level, NC, 28381-1514, US",
                    "1207 Iron Extension, Klickitat, SC, 29197-8571, US",
                    "6770 Cinder Glen, Caronport, OH, 45053-5002, US",
                    "7619 Tawny Carrefour, Senlac, NV, 89529-9876, US"
                };

                var countries = new string[] {
                    "Ireland", "Spain", "United Kingdom", "France", "Germany", "Sweden", "Norway",
                    "Italy", "Greece", "Iceland", "Portugal", "Malta", "Brazil",
                    "Argentina", "Colombia", "Peru", "Venezuela", "Uruguay"

                };

                var continent = new string[] {
                    "Europe", "Europe", "Europe", "Europe", "Europe", "Europe", "Europe",
                    "Europe", "Europe", "Europe", "Europe", "Europe", "South America",
                    "South America", "South America", "South America", "South America", "South America"
                };

                var language = new string[] {
                    "English", "Spanish", "English", "French", "(other)", "(other)", "(other)",
                    "(other)", "(other)", "(other)", "Portuguese", "(other)", "Portuguese",
                    "Spanish", "Spanish", "Spanish", "Spanish", "Spanish"
                };

                var firstNames = new string[] {
                    "Sophie", "Isabelle", "Emily", "Olivia", "Lily", "Chloe", "Isabella",
                    "Amelia", "Jessica", "Sophia", "Ava", "Charlotte", "Mia", "Lucy", "Grace", "Ruby",
                    "Ella", "Evie", "Freya", "Isla", "Poppy", "Daisy", "Layla"
                };

                var lastNames = new string[] {
                    "Beckham", "Black", "Braxton", "Brennan", "Brock", "Bryson", "Cadwell",
                    "Cage", "Carson", "Chandler", "Cohen", "Cole", "Corbin", "Dallas", "Dalton", "Dane",
                    "Donovan", "Easton", "Fisher", "Fletcher", "Grady", "Greyson", "Griffin", "Gunner",
                    "Hayden", "Hudson", "Hunter", "Jacoby", "Jagger", "Jaxon", "Jett", "Kade", "Kane",
                    "Keating", "Keegan", "Kingston", "Kobe"
                };

                var orders = new List<Order>();

                for (int i = 0; i < 1000; i++)
                {
                    var orderDetails = new List<OrderDetails>();

                    for (int j = 0; j < products.Length; j++)
                    {
                        if (random.Next(1, 10) > 5)
                        {
                            orderDetails.Add(new OrderDetails
                            {
                                Quantity = random.Next(1, 100),
                                Product = products[j],
                                Comments = string.Empty
                            });
                        }
                    }

                    orders.Add(new Order
                    {
                        Continent = continent[i % continent.Length],
                        Country = countries[i % countries.Length],
                        Language = language[i % language.Length],
                        Name = firstNames[i % firstNames.Length] + " " + lastNames[i % lastNames.Length],
                        Address = address[i % address.Length],
                        Date = DateTime.Now.AddDays(-1 * random.Next(1000)),
                        Phone = CreateRandomPhoneNumber(random),
                        OrderDetails = orderDetails
                    });
                }

                context.Orders.AddRange(orders);

                context.SaveChanges();
            }
        }

        private static string CreateRandomPhoneNumber(Random random)
        {
            var result = "+";
            for (var i = 0; i < 12; i++)
            {
                result += random.Next(0, 10);
                if (i == 2 || i == 5 || i == 8)
                {
                    result += " ";
                }
            }

            return result;
        }
    }
}
