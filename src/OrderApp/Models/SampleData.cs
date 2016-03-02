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
                    "1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763",
                    "3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215",
                    "3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186",
                    "2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634",
                    "2722 Hazy Turnabout, Burnt Cabins, NY, 14120-5642, US, (917) 604-6597",
                    "6686 Lazy Ledge, Two Rock, CA, 92639-3020, US, (619) 901-9911",
                    "2000 Dewy Limits, Wacahoota, NF, A4L-2V9, CA, (709) 065-3959",
                    "7710 Noble Pond Avenue, Bolivia, RI, 02931-1842, US, (401) 865-2160",
                    "3452 Sunny Vale, Pyro, ON, M8V-4Z0, CA, (519) 072-8609",
                    "4402 Dusty Cove, Many Farms, UT, 84853-8223, US, (435) 518-0673",
                    "5198 Silent Parade, Round Bottom, MD, 21542-9798, US, (301) 060-7245",
                    "8550 Shady Moor, Kitty Fork, CO, 80941-6207, US, (303) 502-3767",
                    "2131 Old Dell, Merry Midnight, AK, 99906-8842, US, (907) 369-2206",
                    "7390 Harvest Crest, Mosquito Crossing, RI, 02957-6116, US, (401) 463-6348",
                    "874 Little Point, Hot Coffee, BC, V3U-2P6, CA, (250) 706-9207",
                    "8834 Stony Pioneer Heights, Newlove, OR, 97419-8670, US, (541) 408-2213",
                    "9829 Grand Beach, Flint, UT, 84965-9900, US, (435) 700-5161",
                    "3799 Cozy Blossom Ramp, Ptarmigan, MS, 38715-0313, US, (769) 740-1526",
                    "3254 Silver Island Loop, Maunaloa, DE, 19869-3169, US, (302) 667-7671",
                    "1081 Middle Wood, Taylors Gut Landing, OR, 97266-2873, US, (541) 357-6310",
                    "1137 Umber Trail, Shacktown, NW, X3U-5Y8, CA, (867) 702-6883",
                    "9914 Hidden Bank, Wyoming, MO, 64635-9665, US, (636) 280-4192",
                    "7080 Misty Nectar Townline, Coward, AB, T9U-3N4, CA, (403) 623-2838",
                    "1184 Wishing Grounds, Vibank, NW, X7D-0V9, CA, (867) 531-2730",
                    "126 Easy Pointe, Grandview Beach, KY, 40928-9539, US, (502) 548-0956",
                    "6683 Colonial Street, Swan River, BC, V1A-9I8, CA, (778) 014-4257",
                    "960 Gentle Oak Lane, Shakopee, ND, 58618-6277, US, (701) 327-1219",
                    "6918 Cotton Pine Corner, Kenaston, IA, 52165-3975, US, (515) 906-7427",
                    "2368 Burning Woods, Ernfold, NY, 11879-9186, US, (646) 819-0355",
                    "5646 Quiet Shadow Chase, Tiger Tail, IA, 52283-5537, US, (712) 375-9225",
                    "5466 Foggy Mountain Dale, Sweet Home, MT, 59738-0251, US, (406) 881-1706",
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

                for (int i = 0; i < 100; i++)
                {
                    var orderDetails = new List<OrderDetails>();

                    for (int j = 0; j < products.Length; j++)
                    {
                        if (random.Next(1,10) > 5)
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
                        Date = new DateTime(),
                        Phone = "111 111 1111",
                        OrderDetails = orderDetails
                    });
                }

                context.Orders.AddRange(orders);

                context.SaveChanges();
            }
        }
    }
}
